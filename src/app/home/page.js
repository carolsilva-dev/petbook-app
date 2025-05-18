"use client";

import Header from "../cabeçalho/page";
import styles from "../styles/home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <aside className={styles.sidebarLeft}>
          <p>🐾 Menu</p>
          <Link href="/Perfil" className={styles.link}>Meu Perfil</Link>
          <Link href="/amigos" className={styles.link}>Amigos</Link>
        </aside>

        <main className={styles.feed}>
          <h1 className={styles.title}>Bem-vindo(a) ao Petbook 🐶💜</h1>
          <p className={styles.subtitle}>Compartilhe momentos com seus pets!</p>

          <div className={styles.postBox}>
            <textarea placeholder="No que seu pet está pensando?" className={styles.textarea} />
            <button className={styles.button}>Publicar</button>
          </div>

          <div className={styles.posts}>
            <p><strong>Lucky:</strong> Brinquei muito hoje no parque! 🐕</p>
          </div>
        </main>

        <aside className={styles.sidebarRight}>
          <p>🔔 Notificações</p>
          <p>Você tem 2 novos amigos</p>
          <Link href="/" className={styles.link}>Sair</Link>
        </aside>
      </div>
    </>
  );
}
