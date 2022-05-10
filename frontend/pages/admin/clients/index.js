import { Fragment } from "react";
import Link from "next/link";
import fetchFromApi from "../../../utils/fetchFromApi";
import AdminNav from "../../../components/AdminNav";
import styles from "../../../styles/admin/views.module.css";

export default function Books({ clients }) {
  return (
    <AdminNav>
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
    </AdminNav>
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
