"use client";

import styles from "../styles/cadastroPets.module.css";
import { useState, useEffect } from "react";
import api from "../service/api";

export default function CadastroPet({onPetCadastrado}) {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [genero, setGenero] = useState("MACHO");
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (usuario?.id) {
      setUsuarioId(usuario.id);
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioId) {
      alert("Usuário não encontrado. Faça login novamente.");
      return;
    }

    try {
      const pet = {
        nome,
        apelido,
        raca,
        idade: parseInt(idade),
        genero,
        donoId: usuarioId,
      };

      console.log("Enviando pet:", pet);
      await api.post("/pets", pet);
      alert("Pet cadastrado com sucesso!");

      if (onPetCadastrado) onPetCadastrado();
      
      setNome("");
      setApelido("");
      setRaca("");
      setIdade("");
      setGenero("MACHO");
    } catch (error) {
      console.error("Erro ao cadastrar pet:", error);
      alert("Erro ao cadastrar pet.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h3>Cadastre um novo Pet</h3>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Apelido"
        value={apelido}
        onChange={(e) => setApelido(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Raça"
        value={raca}
        onChange={(e) => setRaca(e.target.value)}
        className={styles.inputField}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        required
        className={styles.inputField}
      />
      <select
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        className={styles.selectField}
      >
        <option value="MACHO">Macho</option>
        <option value="FEMEA">Fêmea</option>
      </select>
      <button type="submit" className={styles.submitButton}>Cadastrar Pet</button>
    </form>
  );
}
