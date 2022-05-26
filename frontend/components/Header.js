import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import es from "../languages/es/header";
import cat from "../languages/cat/header";
import en from "../languages/en/header";
import Cart from "./CartMiniature";

import styles from "../styles/header.module.scss";

export default function Header() {
  const { asPath, locale, locales } = useRouter();

  const [language, setLanguage] = useState(en);
  useEffect(() => {
    switch (locale) {
      case "es":
        setLanguage(es);
        break;
      case "en":
        setLanguage(en);

        break;
      case "ca":
        setLanguage(cat);

        break;

      default:
        break;
    }
  }, [locale]);

  const lang = (loc) => {
    let languageName;
    switch (loc) {
      case "es":
        languageName = "Castellano";
        break;
      case "ca":
        languageName = "Català";
        break;
      case "en":
        languageName = "English";
        break;

      default:
        break;
    }
    return languageName;
  };

  if (typeof window !== "undefined") {
    const scrollTrigger = window.screen.height / 10;
    const header = document.querySelector("header");
    window.onscroll = function scrolling() {
      if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        header.classList.add(styles.header_scroll);
      } else {
        header.classList.remove(styles.header_scroll);
      }
    };
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src="/img/logo.svg" layout="fill" />
        </div>
      </Link>
      <nav className={styles.nav}>
        <Link href="/booking">{language.booking}</Link>
        <Link href="/blog">{language.blog}</Link>
        <Link href="/faq">{language.faqs}</Link>
        <div className={styles.dropdown}>
          <input type="button" className={styles.dropdown_button} value={lang(locale)} />
          <div className={styles.dropdown_content}>
            {locales.map((loc) => <Link href={asPath} locale={loc} key={loc}>{lang(loc)}</Link>)}
          </div>
        </div>
        <Cart />
      </nav>

    </header>
  );
}
