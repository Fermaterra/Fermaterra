import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import AdminLayout from "../../../components/AdminLayout";
import ActivityForm from "../../../components/adminForms/ActivityForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.css";

export default function Activities({ activities }) {
  const [addForm, setAddForm] = useState(false);
  const [activitiesList, setActivitiesList] = useState(activities);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState(activities);
  useEffect(() => {}, [addForm]);

  const handleAddForm = () => setAddForm(!addForm);
  const filterActivities = (query) => {
    const filteredActivities = activitiesList.filter(
      (activity) => activity.title.toUpperCase().includes(query.toUpperCase())
    );
    setActivitiesToDisplay(filteredActivities);
  };

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
      <label htmlFor="search">
        Buscar:
        <input
          id="search"
          placeholder="Buscar actividad"
          onChange={(evt) => filterActivities(evt.target.value)}
        />
      </label>
      {addForm
        ? (
          <ActivityForm
            handleAddForm={handleAddForm}
            activitiesList={activitiesList}
            setActivitiesList={setActivitiesList}
          />
        )
        : null}
      <ul className={`${styles.rows} ${styles.activities}`}>
        <li key="activityNumber">Número actividad</li>
        <li key="day">Día</li>
        <li key="hour">Hora</li>
        <li key="site">Sitio</li>
        <li key="activityTitle">Título actividad</li>
        <li key="professor">Profesor</li>
        <li key="description">Notas</li>
        <li key="totalStock">Plazas totales</li>
        <li key="books">Reservas</li>
        <li key="status">Estado</li>
        {activitiesToDisplay.map(
          ({
            _id: id,
            title,
            day,
            hour,
            location,
            instructor,
            notes,
            stock,
            books,
            status,
          }) => (
            <Fragment key={`${id}-fragment`}>
              <li key={`${id}-link`}>
                <Link href={`/admin/activities/${id}`} key={`${id}-linkChild`}>
                  {id}
                </Link>
              </li>
              <li key={`${id}-day`}>{formateDate(day)}</li>
              <li key={`${id}-hour`}>{hour}</li>
              <li key={`${id}-location`}>{location}</li>
              <li key={`${id}-title`}>{title}</li>
              <li key={`${id}-instructor`}>{instructor}</li>
              <li key={`${id}-notes`}>{notes}</li>
              <li key={`${id}-initialStock`}>{stock + books}</li>
              <li key={`${id}-books`}>{books}</li>
              <li key={`${id}-status`}>{status}</li>
            </Fragment>
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
