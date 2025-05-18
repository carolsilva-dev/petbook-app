"use client";

import { useEffect, useState } from "react";
import styles from "../styles/perfil.module.css";
import Header from "../cabeçalho/page";
import { useRouter } from "next/navigation";
import CadastroPet from "../cadastroPet/page";
import api from "../service/api";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [pets, setPets] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("dados");
  const [petEditando, setPetEditando] = useState(null);
  const [formPet, setFormPet] = useState({ nome: "", idade: "", genero: "" });
  const router = useRouter();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuarioLogado");
    if (usuarioSalvo) {
      const usuarioObj = JSON.parse(usuarioSalvo);
      setUsuario(usuarioObj);
      carregarPets(usuarioObj.id);
    } else {
      router.push("/");
    }
  }, []);

  const carregarPets = async (usuarioId) => {
    try {
      const response = await api.get(`pets/usuario/${usuarioId}`);
      setPets(response.data);
    } catch (error) {
      console.error("Erro ao buscar pets:", error.response?.data || error.message);
    }
  };

  const excluirPet = async (petId) => {
    if (!confirm("Deseja realmente excluir este pet?")) return;

    try {
      await api.delete(`/pets/${petId}`);
      alert("Pet excluído com sucesso!");
      setPets((prevPets) => prevPets.filter((pet) => pet.id !== petId));
    } catch (error) {
      console.error("Erro ao excluir pet:", error);
      alert("Erro ao excluir pet.");
    }
  };

  const iniciarEdicao = (pet) => {
    setPetEditando(pet);
    setFormPet({
      nome: pet.nome,
      idade: pet.idade,
      genero: pet.genero,
    });
  };

  const atualizarPet = async () => {
    try {
      await api.put(`/pets/${petEditando.id}`, formPet);
      alert("Pet atualizado com sucesso!");
      setPetEditando(null);
      carregarPets(usuario.id);
    } catch (error) {
      console.error("Erro ao atualizar pet:", error.response?.data || error.message);
      alert("Erro ao atualizar pet.");
    }
  };

  const cancelarEdicao = () => {
    setPetEditando(null);
    setFormPet({ nome: "", idade: "", genero: "" });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.tabs}>
          <button
            className={abaAtiva === "dados" ? styles.active : ""}
            onClick={() => setAbaAtiva("dados")}
          >
            Dados Cadastrais
          </button>
          <button
            className={abaAtiva === "pets" ? styles.active : ""}
            onClick={() => setAbaAtiva("pets")}
          >
            Meus Pets
          </button>
        </div>

        <div className={styles.content}>
          {abaAtiva === "dados" && (
            <div>
              <h2>Dados do Usuário</h2>
              <p><strong>Nome:</strong> {usuario?.nome}</p>
              <p><strong>Email:</strong> {usuario?.email}</p>
            </div>
          )}

          {abaAtiva === "pets" && (
            <div>
              <h2>Meus Pets</h2>
              <CadastroPet onPetCadastrado={() => carregarPets(usuario.id)} />

              <ul className={styles.petList}>
                {pets.map((pet) => (
                  <li key={pet.id} className={styles.petItem}>
                    <span><strong>Nome:</strong> {pet.nome}</span> |
                    <span><strong>Idade:</strong> {pet.idade}</span> |
                    <span><strong>Gênero:</strong> {pet.genero}</span>
                    <div>
                      <button onClick={() => iniciarEdicao(pet)} className={styles.editButton}>Editar</button>
                      <button onClick={() => excluirPet(pet.id)} className={styles.deleteButton}>Excluir</button>
                    </div>
                  </li>
                ))}
              </ul>

              {petEditando && (
                <div className={styles.editForm}>
                  <h3>Editando Pet: {petEditando.nome}</h3>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={formPet.nome}
                    onChange={(e) => setFormPet({ ...formPet, nome: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Idade"
                    value={formPet.idade}
                    onChange={(e) => setFormPet({ ...formPet, idade: e.target.value })}
                  />
                  <select
                    value={formPet.genero}
                    onChange={(e) => setFormPet({ ...formPet, genero: e.target.value })}
                  >
                    <option value="">Selecione o gênero</option>
                    <option value="MACHO">Macho</option>
                    <option value="FEMEA">Fêmea</option>
                  </select>
                  <div className={styles.editActions}>
                    <button onClick={atualizarPet}>Salvar</button>
                    <button onClick={cancelarEdicao}>Cancelar</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
