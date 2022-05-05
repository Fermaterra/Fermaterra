import Link from "next/link";
import fetchFromApi from "../../../utils/fetchFromApi";
import AdminLayout from "../../../components/AdminLayout";

import styles from "../../../styles/admin/activities.module.css";

export default function Activities({ activities }) {
  return (
    <AdminLayout>
      <div className={styles.title}>
        <input type="button" value="+" />
        <h2>Activities</h2>

      </div>
      <div className={styles.rows}>
        <p>Número actividad</p>
        <p>Día</p>
        <p>Hora</p>
        <p>Sitio</p>
        <p>Título actividad</p>
        <p>Profesor</p>
        <p>Notas</p>
        <p>Plazas totales</p>
        <p>Reservas</p>
        <p>Estado</p>
        {activities.map(({
          _id: id,
          title,
          day,
          hour,
          location,
          instructor,
          notes,
          initialStock,
          books,
          status
        }) => (
          < >
            <Link href={`/admin/activities/${id}`} key={id}>{id}</Link>
            <p key={`${id}-day`}>{day}</p>
            <p key={`${id}-hour`}>{hour}</p>
            <p key={`${id}-location`}>{location}</p>
            <p key={`${id}-title`}>{title}</p>
            <p key={`${id}-instructor`}>{instructor}</p>
            <p key={`${id}-notes`}>{notes}</p>
            <p key={`${id}-initialStock`}>{initialStock}</p>
            <p key={`${id}-books`}>{books}</p>
            <p key={`${id}-status`}>{status}</p>
          </>
        ))}
      </div>
    </AdminLayout>
  );
}

export async function getStaticProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);

  return {
    props: {
      activities
    }
  };
}
