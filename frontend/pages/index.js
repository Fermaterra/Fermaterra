import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import es from "../languages/es";
import cat from "../languages/cat";
import en from "../languages/en";

import styles from "../styles/index.module.css";

export default function Home({ cart }) {
  const [language, setLanguage] = useState(en);
  const { locale } = useRouter();
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
  return (
    <Layout cart={cart} title="Home">
      <div className={styles.image}>
        <p>{language.banner}</p>
      </div>
      <section className={styles.section}>
        <h2>TERRAFERMA</h2>
        <p>
          A veces hay cosas que por sencillas las damos por sentado,
          como si no tuvieran importancia, cuando realmente son la esencia
          de todo lo que nos da vida.
        </p>
        <p>
          La tierra que pisamos nos resulta muy a menudo irrelevante, evidente;
          pero cuánto significaria encontrarla para aquella persona
          que va a la deriva en medio del mar.
        </p>
      </section>
      <p className={styles.text}>
        Terraferma nace de esa idea de querer ser conscientes y conectar con las
        pequeñas cosas que son la base de la vida y a veces olvidamos.
        La tierra, la respiración, los sentidos.
      </p>
      <div className={styles.image} />
      <p className={styles.text}>
        Planifica una experiència autèntica
        amb els nostres serveis
      </p>

      <div className={styles.image} />
      <section className={styles.contact}>
        <div className={styles.contact__image} />
        <div>

          <h4>Contacte</h4>
          <p>Instagram | Facebook</p>
          <p>hola@terraferma.com</p>
          <p>+34 000 000 000</p>
        </div>
      </section>
    </Layout>
  );
}
