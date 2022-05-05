import { useState, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../../components/AdminLayout";
import NewActivityForm from "../../../components/adminForms/NewActivityForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/activities.module.css";

export default function Activities({ activities }) {
  const [addForm, setAddForm] = useState(false);
  useEffect(() => {}, [addForm]);

  const handleAddForm = () => setAddForm(!addForm);
  return (
    <AdminLayout>
      <div className={styles.title}>
        <input
          type="button"
          value={!addForm ? "+" : "X"}
          onClick={() => {
            handleAddForm();
          }}
        />
        <h2>Activities</h2>
      </div>
      {addForm ? <NewActivityForm handleAddForm={handleAddForm} /> : null}
      <ul className={styles.rows}>
        <li>Número actividad</li>
        <li>Día</li>
        <li>Hora</li>
        <li>Sitio</li>
        <li>Título actividad</li>
        <li>Profesor</li>
        <li>Notas</li>
        <li>Plazas`` totales</li>
        <li>Reservas</li>
        <li>Estado</li>
        {activities.map(
          ({
            _id: id,
            title,
            day,
            hour,
            location,
            instructor,
            notes,
            initialStock,
            books,
            status,
          }) => (
            <>
              <li>
                <Link href={`/admin/activities/${id}`} key={id}>
                  {id}
                </Link>
              </li>
              <li key={`${id}-day`}>{formateDate(day)}</li>
              <li key={`${id}-hour`}>{hour}</li>
              <li key={`${id}-location`}>{location}</li>
              <li key={`${id}-title`}>{title}</li>
              <li key={`${id}-instructor`}>{instructor}</li>
              <li key={`${id}-notes`}>{notes}</li>
              <li key={`${id}-initialStock`}>{initialStock}</li>
              <li key={`${id}-books`}>{books}</li>
              <li key={`${id}-status`}>{status}</li>
            </>
          )
        )}
      </ul>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);

  return {
    props: {
      activities,
    },
  };
}
