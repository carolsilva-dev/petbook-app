"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import api from "../service/api"
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/cadastro.module.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/usuarios", { nome, email, senha }); 
      setMensagem("Cadastro realizado com sucesso!");
      
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      setMensagem("Erro ao cadastrar. Tente novamente!");
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Image src="/images/petbook.png" alt="Logo" width={185} height={185} className={styles.logo} />

      <div className={styles.cadastroBox}>
        <h1 className={styles.title}>Criar Conta</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className={styles.input} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={styles.input} />
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <p>
          Já tem uma conta?{" "}
          <Link href="/" className={styles.link}>Entrar</Link>
        </p>
      </div>
    </div>
  );
}

