import { useRouter } from "next/router";
import { useMemo } from "react";
import Layout from "../components/Layout";
import ca from "../constants/locales/ca/blog";
import es from "../constants/locales/es/blog";
import en from "../constants/locales/en/blog";
import styles from "../styles/blog.module.scss";

export default function Blog() {
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
    <Layout title="Blog">
      <main className={styles.main}>
        <h1>{language.title}</h1>
      </main>
    </Layout>
  );
}
