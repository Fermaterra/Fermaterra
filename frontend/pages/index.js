import Layout from "../components/Layout";
import ActivityMiniature from "../components/ActivityMiniature";
import Proxy from "../utils/activitiesProxy";

import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <Layout title="Home">
      <div className={styles.image}>
        <p>La terra, la respiració,</p>
        <p>els sentits</p>
      </div>
      <section className={styles.section}>
        <h2>TERRAFERMA</h2>
        <p>
          A veces hay cosas que por sencillas las damos por sentado,
          como si no tuvieran importancia, cuando realmente son la esencia
          de todo lo que nos da vida.
        </p>
        <p>
          La tierra que pisamos nos resulta muy a menudo irrelevante, evidente;
          pero cuánto significaria encontrarla para aquella persona
          que va a la deriva en medio del mar.
        </p>
      </section>
      <p className={styles.text}>
        Terraferma nace de esa idea de querer ser conscientes y conectar con las
        pequeñas cosas que son la base de la vida y a veces olvidamos.
        La tierra, la respiración, los sentidos.
      </p>
      <div className={styles.image} />
      <p className={styles.text}>
        Planifica una experiència autèntica
        amb els nostres serveis
      </p>
      <div className={styles.activities_list}>
        {Proxy.map((activity) => <ActivityMiniature activity={activity} key={activity.id} />)}
      </div>
      <div className={styles.image} />
      <section className={styles.contact}>
        <div className={styles.contact__image} />
        <div>

          <h4>Contacte</h4>
          <p>Instagram | Facebook</p>
          <p>hola@terraferma.com</p>
          <p>+34 000 000 000</p>
        </div>
      </section>
    </Layout>
  );
}
