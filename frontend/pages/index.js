import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import es from "../languages/es";
import cat from "../languages/cat";
import en from "../languages/en";

import styles from "../styles/index.module.scss";
import PillarCard from "../components/PillarCard";

export default function Home() {
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
    <Layout title="Home">
      <div className={styles.image}>
        <p>{language.banner}</p>
      </div>
      <section className={styles.section}>
        <h2>TERRAFERMA</h2>
        <p>{language.firstParagraph}</p>
      </section>
      <p className={styles.text}>{language.secondParagraph}</p>
      <div className={styles.image} />
      <p className={styles.text}>
        Planifica una experiència autèntica
        amb els nostres serveis
      </p>
      <section>
        <PillarCard
          title={language.Frigidarium.title}
          text={[
            language.Frigidarium.firstParagraph,
            language.Frigidarium.secondParagraph,
            language.Frigidarium.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/terraferma-665e5.appspot.com/o/images%2FSesi%C3%B3n%20de%20relajaci%C3%B3n-2022-05-20-13?alt=media&token=78bfe1bc-d063-47b5-89ca-658d5e49fc03"
        />
        <PillarCard
          title={language.Yoga.title}
          text={[
            language.Yoga.firstParagraph,
            language.Yoga.secondParagraph,
            language.Yoga.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/terraferma-665e5.appspot.com/o/images%2FSesi%C3%B3n%20de%20relajaci%C3%B3n-2022-05-20-13?alt=media&token=78bfe1bc-d063-47b5-89ca-658d5e49fc03"
        />
        <PillarCard
          title={language.Pranayama.title}
          text={[
            language.Pranayama.firstParagraph,
            language.Pranayama.secondParagraph,
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/terraferma-665e5.appspot.com/o/images%2FSesi%C3%B3n%20de%20relajaci%C3%B3n-2022-05-20-13?alt=media&token=78bfe1bc-d063-47b5-89ca-658d5e49fc03"
        />
      </section>
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
