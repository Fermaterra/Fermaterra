import { useContext } from "react";
import { AppContext } from "../app/Provider";
import styles from "../styles/cart.module.scss";

export default function ClientInfo({
  setConfirmAge, setConfirmPoliticies, confirmAge, confirmPoliticies
}) {
  const { clientContext } = useContext(AppContext);
  const [client, setClient] = clientContext;
  return (
    <section className={styles.client}>
      <h2>Dades de contacte</h2>
      <form>
        <label htmlFor="name">
          NOM
          <input id="name" onChange={(evt) => setClient({ ...client, name: evt.target.value })} />
        </label>
        <label htmlFor="surname">
          COGNOMS
          <input id="surname" onChange={(evt) => setClient({ ...client, surname: evt.target.value })} />
        </label>
        <label htmlFor="email">
          MAIL
          <input id="email" type="email" onChange={(evt) => setClient({ ...client, mail: evt.target.value })} />
        </label>
        <label htmlFor="confirm_email">
          CONFIR. MAIL
          <input id="confirm_email" type="email" onChange={(evt) => setClient({ ...client, confirmedMail: evt.target.value })} />
        </label>
        <label htmlFor="phone">
          TELF
          <input id="phone" type="tel" onChange={(evt) => setClient({ ...client, phone: evt.target.value })} />
        </label>
        <label htmlFor="country">
          PAÍS
          <input id="country" onChange={(evt) => setClient({ ...client, country: evt.target.value })} />
        </label>
      </form>
      <div className={styles.confirmations}>
        <label htmlFor="confirm_age">
          <input
            id="confirm_age"
            type="checkbox"
            onChange={() => setConfirmAge(!confirmAge)}
          />
          Confirmo que tots els participants
          són majors de 18 anys o majors de 14 acompanyats d&apos;un tutor legal.
        </label>
        <label htmlFor="confirm_politicies">
          <input
            id="confirm_politicies"
            type="checkbox"
            onChange={() => setConfirmPoliticies(!confirmPoliticies)}
          />
          Confirmo que he llegit i accepto les
          {" "}
          <a href="/" target="blank">condicions de participació a l&apos;activitat</a>
          {" "}
          i la
          {" "}
          <a href="/booking" target="blank">política de protecció de dades</a>
          .
        </label>
      </div>

    </section>
  );
}
