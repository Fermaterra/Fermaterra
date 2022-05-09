import { Fragment } from "react";
import Link from "next/link";
import fetchFromApi from "../../../utils/fetchFromApi";
import AdminLayout from "../../../components/AdminLayout";
import styles from "../../../styles/admin/views.module.css";

export default function Books({ clients }) {
  return (
    <AdminLayout>
      <h2>Clients</h2>
      <ul className={`${styles.rows} ${styles.clients}`}>
        <li>Id</li>
        <li>Nombre</li>
        {clients.map(({ _id: id, name }) => (
          <Fragment key={id}>
            <li key={`${id}-link`}><Link href={`/admin/clients/${id}`}>{id}</Link></li>
            <li key={`${id}-name`}>{name}</li>
          </Fragment>
        ))}
      </ul>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const { clients } = await fetchFromApi(`${process.env.URL}/clients`);

  return {
    props: {
      clients
    }
  };
}
