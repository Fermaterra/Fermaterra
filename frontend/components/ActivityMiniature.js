import styles from "../styles/activityMiniature.module.css";

export default function ActivityMiniature({ activity }) {
  const { name, text } = activity;
  return (
    <article className={styles.miniature}>
      <div className={styles.image} />
      <h3>{name}</h3>
      <p>{text}</p>
    </article>
  );
}
