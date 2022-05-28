import { useState, useEffect } from "react";
import Link from "next/link";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import ActivityForm from "../../../components/adminForms/ActivityForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.scss";

function createLink(value) {
  return (
    <Link href={`/admin/activities/${value}`} key={`${value}-linkChild`}>
      {value}
    </Link>
  );
}

export default function Activities({ activities }) {
  console.log(process.env.url)
  const { locale } = useRouter();
  const [addForm, setAddForm] = useState(false);
  const [activitiesList, setActivitiesList] = useState(activities);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState(activities);
  const columns = [
    {
      label: "id",
      name: "_id",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => createLink(value),
      },
    },
    {
      label: "Dia",
      name: "day",
      options: {
        customBodyRender: (value) => formateDate(value, locale),
      },
    },
    {
      label: "Hora",
      name: "hour",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Sitio",
      name: "location",
      options: {
        customBodyRender: (value) => value.name,
      },
    },
    {
      label: "Titulo",
      name: "title",
    },
    {
      label: "Profesor",
      name: "instructor",
    },
    {
      label: "Notas",
      name: "notes",
    },
    {
      label: "Plazas totales",
      name: "stock",
    },
    {
      label: "Reservas",
      name: "books",
    },
    {
      label: "Estado",
      name: "status",
    },
  ];
  const options = {
    filterType: "dropdown",
  };

  useEffect(() => {
    setActivitiesToDisplay(activitiesList);
  }, [activitiesList]);

  const handleAddForm = () => setAddForm(!addForm);

  return (
    <AdminNav>
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
      {addForm ? (
        <ActivityForm
          handleAddForm={handleAddForm}
          activitiesList={activitiesList}
          setActivitiesList={setActivitiesList}
        />
      ) : null}
      <MUIDataTable
        title=""
        data={activitiesToDisplay}
        columns={columns}
        options={options}
        keyField="_id"
      />
    </AdminNav>
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
