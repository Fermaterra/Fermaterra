import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import formateDate from "../utils/formateDate";
import styles from "../styles/activities.module.scss";

export default function ActivityMiniature({
  id,
  languageModules,
  image,
  basePrice,
  day,
  hour,
}) {
  const [en, es, ca] = languageModules;
  const { locale } = useRouter();
  const [language, setLanguage] = useState(en);

  useEffect(() => {
    switch (locale) {
      case "en":
        setLanguage(en);
        break;
      case "es":
        setLanguage(es);
        break;
      case "ca":
        setLanguage(ca);
        break;

      default:
        break;
    }
  }, [locale]);
  return (
    <article className={styles.miniature}>
      <Image src={image} height={450} width={400} alt={language.title} objectFit="cover" />
      <div>
        <h3>{language.title}</h3>
        <p>{`${basePrice?.toFixed(2)}€`}</p>
      </div>
      <p className={styles.activity_description}>{language.shortDescription}</p>
      <Link href={`booking/${id}`}> Reserva</Link>
      <p>{`${formateDate(day, locale)} - ${hour}h`}</p>
    </article>
  );
}
