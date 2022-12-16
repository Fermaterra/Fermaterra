import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ca from "../languages/ca/blog";
import es from "../languages/es/blog";
import en from "../languages/en/blog";
import styles from "../styles/blog.module.scss";

export default function Blog() {
  const [language, setLanguage] = useState(ca);
  const { locale } = useRouter();
  useEffect(() => {
    switch (locale) {
      case "ca":
        setLanguage(ca);
        break;
      case "es":
        setLanguage(es);
        break;
      case "en":
        setLanguage(en);
        break;

      default:
        break;
    }
  }, [locale]);
  return (
    <Layout title="Blog">
      <main className={styles.main}>
        <h1>{language.title}</h1>
      </main>
    </Layout>
  );
}
