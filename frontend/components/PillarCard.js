import Image from "next/image";
import styles from "../styles/pillarcard.module.scss";

export default function PillarCard({ title, text, image }) {
  return (
    <article className={styles.card}>
      {image
        ? (
          <div className={styles.wrapper} width={450} height={550}>
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </div>
        ) : null}
      <h2>{title}</h2>
      {text?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </article>
  );
}
