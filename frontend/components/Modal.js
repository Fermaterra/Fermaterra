import styles from "../styles/modal.module.scss";

export default function Modal({ message }) {
  return (
    <p className={styles.message}>{message}</p>
  );
}
