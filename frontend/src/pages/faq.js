import { useMemo } from "react";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import ca from "../constants/locales/ca/faq";
import es from "../constants/locales/es/faq";
import en from "../constants/locales/en/faq";

import styles from "../styles/faq.module.scss";

export default function FAQ() {
  const { locale } = useRouter();
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
  return (
    <Layout title="FAQS">
      <main className={styles.main}>
        <h1>{language.title}</h1>
        <section>
          {Object.values(language).slice(1).map(
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
