import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "../components/Layout";
import es from "../languages/es";
import ca from "../languages/ca";
import en from "../languages/en";

import styles from "../styles/index.module.scss";
import PillarCard from "../components/PillarCard";
import Carousel from "react-material-ui-carousel"

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
        setLanguage(ca);

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
        <h1>FERMATERRA</h1>
        <p>{language.firstParagraph}</p>
      </section>
      <p className={styles.text}>{language.secondParagraph}</p>
      <div className={styles.image} />
      <p className={styles.text}>
        Planifica una experiència autèntica
        amb els nostres serveis
      </p>
      <section className={styles.activities_list_mobile}>
    <Carousel
    navButtonsAlwaysVisible={true}
    indicators={false}
    NextIcon={<Image src="/img/right_arrow.svg" width={30} height={30}/>}
    PrevIcon={<Image src="/img/left_arrow.svg" width={30} height={30}/>}
    navButtonsProps={{style:{backgroundColor: "transparent", borderRadius: 0}}}
    >
    <PillarCard
          title={language.Frigidarium.title}
          text={[
            language.Frigidarium.firstParagraph,
            language.Frigidarium.secondParagraph,
            language.Frigidarium.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Ffrigidfarium.webp?alt=media&token=b2e870d3-092a-4437-8b5d-82bb242a75f2"
        />
        <PillarCard
          title={language.Yoga.title}
          text={[
            language.Yoga.firstParagraph,
            language.Yoga.secondParagraph,
            language.Yoga.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Fyoga.jpeg?alt=media&token=f8fc33c6-42d1-4f23-b6c9-0c774522f7c5"
        />
        <PillarCard
          title={language.Pranayama.title}
          text={[
            language.Pranayama.firstParagraph,
            language.Pranayama.secondParagraph,
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Fpranayama.jpeg?alt=media&token=bc8827db-3a8a-4c75-9844-6e21e357b16f"
        />
</Carousel>
      </section>
      <section className={styles.activities_list}>
        <PillarCard
          title={language.Frigidarium.title}
          text={[
            language.Frigidarium.firstParagraph,
            language.Frigidarium.secondParagraph,
            language.Frigidarium.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Ffrigidfarium.webp?alt=media&token=b2e870d3-092a-4437-8b5d-82bb242a75f2"
        />
        <PillarCard
          title={language.Yoga.title}
          text={[
            language.Yoga.firstParagraph,
            language.Yoga.secondParagraph,
            language.Yoga.thirdParagraph
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Fyoga.jpeg?alt=media&token=f8fc33c6-42d1-4f23-b6c9-0c774522f7c5"
        />
        <PillarCard
          title={language.Pranayama.title}
          text={[
            language.Pranayama.firstParagraph,
            language.Pranayama.secondParagraph,
          ]}
          image="https://firebasestorage.googleapis.com/v0/b/fermaterra-1fd31.appspot.com/o/web%2Fpranayama.jpeg?alt=media&token=bc8827db-3a8a-4c75-9844-6e21e357b16f"
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
