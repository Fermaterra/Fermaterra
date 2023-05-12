import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import es from "../constants/locales/es/header";
import ca from "../constants/locales/ca/header";
import en from "../constants/locales/en/header";
import whiteLogo from "../public/img/logo.svg";
import blackLogo from "../public/img/logo_black.svg";
import Cart from "./CartMiniature";
import whiteMenuLogo from "../public/img/menu-icon.svg";
import blackMenuLogo from "../public/img/menu-icon-black.svg";
import styles from "../styles/header.module.scss";

export default function Header() {
  const {
    asPath, locale, locales, pathname
  } = useRouter();
  const [headerClass, setHeaderClass] = useState(styles.home_header);
  const [cartLogo, setcartLogo] = useState("white");
  const [logo, setLogo] = useState(whiteLogo);
  const [menuLogo, setMenuLogo] = useState(whiteMenuLogo);
  useEffect(() => {
    if (pathname === "/") {
      setHeaderClass(styles.home_header);
      setcartLogo("white");
      setLogo(whiteLogo);
      setMenuLogo(whiteMenuLogo);
    }
    if (pathname !== "/") {
      setHeaderClass(styles.views_header);
      setcartLogo("black");
      setLogo(blackLogo);
      setMenuLogo(blackMenuLogo);
    }
  }, [pathname]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (pathname === "/") {
      const scrollTrigger = window.screen.height / 3;
      const handleScroll = () => {
        if (window.scrollY >= scrollTrigger || window.pageYOffset >= scrollTrigger) {
          setHeaderClass(styles.views_header);
          setcartLogo("black");
          setLogo(blackLogo);
          setMenuLogo(blackMenuLogo);
        } else {
          setHeaderClass(styles.home_header);
          setcartLogo("white");
          setLogo(whiteLogo);
          setMenuLogo(whiteMenuLogo);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [pathname]);

  const language = useMemo(() => {
    switch (locale) {
      case "es":
        return es;

      case "en":
        return en;

      case "ca":
        return ca;

      default:
        return en;
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
  const languageOptions = useMemo(() => locales.map((loc) => (
    { localeOption: loc, name: lang(loc) }
  )), [locales]);

  return (
    <header className={headerClass}>
      <div className={`${styles.burger_menu}`}>
        <div className={styles.wrapper}>
          <Image src={menuLogo} layout="fill" />
        </div>
        <div className={styles.dropdown_content}>
          <Link href="/booking" replace>{language.booking}</Link>
          <Link href="/blog">{language.blog}</Link>
          <Link href="/faq">{language.faqs}</Link>
        </div>
      </div>
      <Link href="/">
        <div className={styles.logo}>
          <Image src={logo} layout="fill" />
        </div>
      </Link>
      <nav className={styles.nav}>
        <Link className={styles.nav_link} href="/booking" prefetch>{language.booking}</Link>
        <Link className={styles.nav_link} href="/blog">{language.blog}</Link>
        <Link className={styles.nav_link} href="/faq">{language.faqs}</Link>
        <div className={styles.dropdown}>
          <input type="button" className={styles.dropdown_button} value={lang(locale)} />
          <div className={styles.dropdown_content}>
            {languageOptions.map(({ localeOption, name }) => (
              <Link key={localeOption} href={asPath} locale={locale}>
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <Cart color={cartLogo} />

    </header>
  );
}
