"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../app/service/api";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

   try {
     const response = await api.post("/usuarios/login", {
      email,
      senha,
    });
    
    const userResponse = await api.get(`/usuarios/email/${email}`, {
      headers: {
        Authorization: `Bearer ${response.data.token}`
      }
    });
    
    // Salvar os dados completos no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify(userResponse.data));
    router.push("/home");
  } catch (error) {
    console.error("Erro no login:", error);
    setMensagem("Usuário ou senha incorretos. Tente novamente.");
    }
  };


  return (
    <div className={styles.container}>
      <Image src="/images/petbook.png" alt="Logo" width={150} height={150} className={styles.logo} />

      <div className={styles.loginBox}>
        <h1 className={styles.title}>Entrar no Petbook</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className={styles.input}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>Entrar</button>
        </form>

        {mensagem && <p className={styles.error}>{mensagem}</p>}

        <p>
          Não tem uma conta?{" "}
          <Link href="/cadastro" className={styles.link}>
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
