import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ActivityForm from "../../../components/adminForms/ActivityForm";
import AdminNav from "../../../components/AdminNav";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";

import styles from "../../../styles/admin/detailsView.module.css";

export default function ActivityDetails({ activity }) {
  const [editionMode, setEditionMode] = useState(false);
  const {
    title, _id: id, day, hour, duration, image, stock, description, shortDescription,
    basePrice, taxes, location, contact, instructor, notes, timesVisited, books, status
  } = activity;

  const router = useRouter();
  const handleEdition = () => {
    setEditionMode(!editionMode);
  };

  const handleDeleting = async () => {
    await axios.delete(`${process.env.URL}/activities/${id}`);
    router.push(`/admin/activities`);
  };

  return (
    <AdminNav>

      <section className={styles.container}>
        <div className={styles.heading}>
          <input
            type="button"
            value={editionMode ? "X" : "Edit"}
            onClick={() => { handleEdition(); }}
          />
          <h3>{title}</h3>
          <input
            type="button"
            value="Delete activity"
            onClick={() => { handleDeleting(); }}

          />
        </div>
        {editionMode
          ? (
            <ActivityForm
              handleAddForm={setEditionMode}
              id={id}
            />
          )
          : (
            <ul className={styles.activity}>
              <li>{`Día: ${formateDate(day)}`}</li>
              <li>{`Hora: ${hour}`}</li>
              <li>{`Duración: ${duration}`}</li>
              <li>{`Imagen: ${image}`}</li>
              <li>{`Plazas: ${stock}`}</li>
              <li>{`Descripción: ${description}`}</li>
              <li>{`Descripción breve: ${shortDescription}`}</li>
              <li>{`Precio: ${basePrice}`}</li>
              <li>{`Impuestos: ${taxes}`}</li>
              <li>{`Localización: ${location}`}</li>
              <li>{`Contacto: ${contact}`}</li>
              <li>{`Instructor: ${instructor}`}</li>
              <li>{`Notas: ${notes}`}</li>
              <li>{`Veces visitada: ${timesVisited}`}</li>
              <li>{`Reservas: ${books}`}</li>
              <li>{`Estado: ${status}`}</li>
            </ul>
          )}
      </section>
    </AdminNav>

  );
}

export async function getServerSideProps({ query: { id } }) {
  const activity = await fetchFromApi(`${process.env.URL}/activities/${id}`);

  return {
    props: {
      activity
    }
  };
}
