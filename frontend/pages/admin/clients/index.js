import { Fragment } from "react";
import Link from "next/link";
import MUIDataTable from "mui-datatables";
import fetchFromApi from "../../../utils/fetchFromApi";
import AdminNav from "../../../components/AdminNav";
import styles from "../../../styles/admin/views.module.css";

function createLink(value) {
  return (
    <Link href={`/admin/clients/${value}`} key={`${value}-linkChild`}>
      {value}
    </Link>
  );
}

export default function Books({ clients }) {
  const columns = [
    {
      label: "Id",
      name: "_id",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => createLink(value),
      },
    },

    {
      label: "Fecha de pedido",
      name: "name",
    },
  ];
  const options = {
    filterType: "dropdown",
  };
  return (
    <AdminNav>
      <h2>Clients</h2>
      <ul className={`${styles.rows} ${styles.clients}`}>
        <li>Id</li>
        <li>Nombre</li>
        {clients.map(({ _id: id, name }) => (
          <Fragment key={id}>
            <li key={`${id}-link`}>
              <Link href={`/admin/clients/${id}`}>{id}</Link>
            </li>
            <li key={`${id}-name`}>{name}</li>
          </Fragment>
        ))}
      </ul>
      <MUIDataTable
        title=""
        data={clients}
        columns={columns}
        options={options}
        keyField="_id"
      />
    </AdminNav>
  );
}

export async function getServerSideProps() {
  const { clients } = await fetchFromApi(`${process.env.URL}/clients`);

  return {
    props: {
      clients,
    },
  };
}
