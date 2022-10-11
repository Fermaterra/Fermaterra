import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import ca from "../languages/ca/faq";
import es from "../languages/es/faq";
import en from "../languages/en/faq";

import styles from "../styles/faq.module.scss";

export default function FAQ() {
  const { locale } = useRouter();
  const [language, setLanguage] = useState(en);
  const [title, setTitle] = useState("FAQS");

  useEffect(() => {
    switch (locale) {
      case "ca":
        setLanguage(ca);
        setTitle("Preguntes Freqüents");
        break;
      case "es":
        setLanguage(es);
        setTitle("Preguntas Frecuentes");
        break;
      case "en":
        setLanguage(en);
        setTitle("FAQS");
        break;

      default:
        break;
    }
  }, [locale]);
  return (
    <Layout title="FAQS">
      <main className={styles.main}>
        <h1>{title}</h1>
        <section>
          {Object.values(language).map(
            ([question, answer]) => (
              <div key={`question-${Math.random()}`}>
                <h2>{question}</h2>
                <p>{answer}</p>
              </div>
            )
          )}
        </section>
      </main>
    </Layout>
  );
}
