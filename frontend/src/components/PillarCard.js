import React from "react";
import styles from "../styles/pillarcard.module.scss";

export default function PillarCard({ title, text, image }) {
  const Image = React.lazy(() => import("next/image"));

  return (
    <article className={styles.card}>
      {image ? (
        <div className={styles.wrapper} width={450} height={550}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <Image src={image} alt={title} layout="fill" objectFit="cover" />
          </React.Suspense>
        </div>
      ) : null}
      <h2>{title}</h2>
      {text?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
