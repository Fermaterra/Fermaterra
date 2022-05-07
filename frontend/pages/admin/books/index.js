import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import AdminLayout from "../../../components/AdminLayout";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.css";

export default function Books({ purchases }) {
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
        <h2>Reservas</h2>
      </div>
      {addForm ? <BookForm /> : null}
      <ul className={`${styles.rows} ${styles.books}`}>
        <li key="bookNumber">Número reserva</li>
        <li key="purchaseDate">Fecha de pedido</li>
        <li key="client">Cliente</li>
        <li key="precio">Precio base:</li>
        <li key="finalPrice">Precio con descuento</li>
        <li key="status">Status</li>

        {purchases?.map(
          ({
            _id: id,
            client,
            createdAt,
            basePrice,
            finalPrice,
            status
          }) => (
            <Fragment key={`${id}-fragment`}>
              <li key={`${id}-book_link`}>
                <Link href={`/admin/books/${id}`} key={`${id}-book`}>
                  {id}
                </Link>
              </li>
              <li key={`${id}-day`}>{formateDate(createdAt)}</li>
              <li key={`${id}-client_link`}>
                {client
                  ? (
                    <Link href={`/admin/clients/${client}`} key={`${client}-client`}>
                      {client}
                    </Link>
                  )
                  : "Sin cliente"}
              </li>
              <li key={`${id}-basePrice`}>{basePrice}</li>
              <li key={`${id}-finalPrice`}>{finalPrice}</li>
              <li key={`${id}-status`}>{status}</li>
            </Fragment>
          )
        )}
      </ul>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const { purchases } = await fetchFromApi(`${process.env.URL}/purchases`);

  return {
    props: {
      purchases,
    },
  };
}
