"use client";

import Image from "next/image";
import styles from "../styles/header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Bell, User } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(!menuAberto);
  };

  const fecharMenu = () => {
    setMenuAberto(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/home" onClick={fecharMenu}>
          <Image src="/images/petbook.png" alt="Petbook" width={50} height={50} />
        </Link>
      </div>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Buscar no Petbook..." className={styles.searchInput} />
      </div>

      <div className={styles.center}>
        <nav className={styles.nav}>
          {pathname !== "/home" && (
            <Link href="/home" className={styles.link}>
              Home
            </Link>
          )}
          <Link href="/amigos" className={styles.link}>
            Amigos
          </Link>
          <Link href="/perfil" className={styles.link}>
            Perfil
          </Link>
        </nav>
      </div>

      <div className={styles.right}>
        <Bell className={styles.icon} />
        <Link href="/perfil">
          <User className={styles.icon} />
        </Link>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          ☰
        </div>

        {menuAberto && (
          <div className={styles.mobileMenu}>
            {pathname !== "/home" && (
              <Link href="/home" className={styles.link} onClick={fecharMenu}>
                Home
              </Link>
            )}
            <Link href="/amigos" className={styles.link} onClick={fecharMenu}>
              Amigos
            </Link>
            <Link href="/perfil" className={styles.link} onClick={fecharMenu}>
              Perfil
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
