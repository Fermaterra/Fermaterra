import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import es from "../languages/es/header";
import ca from "../languages/ca/header";
import en from "../languages/en/header";
import whiteLogo from "../public/img/logo.svg";
import blackLogo from "../public/img/logo_black.svg";
import Cart from "./CartMiniature";

import styles from "../styles/header.module.scss";

export default function Header() {
  const {
    asPath, locale, locales, pathname
  } = useRouter();
  const [headerClass, setHeaderClass] = useState(styles.home_header);
  const [cartLogo, setcartLogo] = useState("white");
  const [logo, setLogo] = useState(whiteLogo);
  useEffect(() => {
    if (pathname === "/") {
      setHeaderClass(styles.home_header);
      setcartLogo("white");
      setLogo(whiteLogo);
    }
    if (pathname !== "/") {
      setHeaderClass(styles.views_header);
      setcartLogo("black");
      setLogo(blackLogo);
    }
  }, [pathname]);

  if (typeof window !== "undefined") {
    const scrollTrigger = window.screen.height / 3;
    const header = document.querySelector("header");
    window.onscroll = function scrolling() {
      if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
        header.classList.add(styles.views_header);
        setcartLogo("black");
        setLogo(blackLogo);
      } else {
        header.classList.remove(styles.views_header);
        setcartLogo("white");
        setLogo(whiteLogo);
      }
    };
  }

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
        setLanguage(ca);

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

  return (
    <header className={headerClass}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src={logo} layout="fill" />
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
        <Cart color={cartLogo} />
      </nav>

    </header>
  );
}
