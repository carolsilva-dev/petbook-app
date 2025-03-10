import Image from "next/image";
import Link from "next/link";
import styles from "./styles/login.module.css";

export default function Login() {
  return (
    <div className={styles.container}>
      <Image src="/images/petbook.png" alt="Logo" width={150} height={150} className={styles.logo} />

      <div className={styles.loginBox}>
        <h1 className={styles.title}>Entrar no Petbook</h1>
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Senha" className={styles.input} />
        <button className={styles.button}>Entrar</button>
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

