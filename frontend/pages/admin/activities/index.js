import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../../components/AdminLayout";
import NewActivityForm from "../../../components/adminForms/NewActivityForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/activities.module.css";

export default function Activities({ activities }) {
  const [addForm, setAddForm] = useState(false);
  useEffect(() => {

  }, [addForm]);

  const handleAddForm = () => setAddForm(!addForm);
  return (
    <AdminLayout>
      <div className={styles.title}>
        <input
          type="button"
          value={!addForm ? "+" : "X"}
          onClick={() => { handleAddForm(); }}
        />
        <h2>Activities</h2>
      </div>
      {addForm
        ? <NewActivityForm handleAddForm={handleAddForm} />
        : null}
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
            <p key={`${id}-day`}>{formateDate(day)}</p>
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

export async function getServerSideProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);

  return {
    props: {
      activities
    }
  };
}
