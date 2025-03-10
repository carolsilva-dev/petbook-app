import Image from "next/image";
import Link from "next/link";
import styles from "..//styles/cadastro.module.css";

export default function Cadastro() {
  return (
    <div className={styles.container}>
      <Image src="/images/petbook.png" alt="Logo" width={185} height={185} className={styles.logo} />

      <div className={styles.cadastroBox}>
        <h1 className={styles.title}>Criar Conta</h1>
        <input type="text" placeholder="Nome" className={styles.input} />
        <input type="email" placeholder="Email" className={styles.input} />
        <input type="password" placeholder="Senha" className={styles.input} />
        <button className={styles.button}>Cadastrar</button>

        <p>
          Já tem uma conta?{" "}
          <Link href="/" className={styles.link}>
             Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
