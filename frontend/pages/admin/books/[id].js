import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";

import styles from "../../../styles/admin/detailsView.module.scss";

export default function bookDetails({ book }) {
  const [editionMode, setEditionMode] = useState(false);

  const {
    createdAt,
    _id: id,
    client: { _id: clientId, name: clientName },
    activities,
    basePrice,
    discountApplied,
    finalPrice,
    status,
    paymentMethod,
    notes,
    updatedAt
  } = book;

  const router = useRouter();
  const handleDeleting = async () => {
    await axios.delete(`${process.env.URL}/purchases/${id}`);
    router.push(`/admin/books`);
  };
  const handleEdition = () => {
    setEditionMode(!editionMode);
  };

  return (
    <AdminNav>
      <section className={styles.container}>
        <div className={styles.heading}>
          <input
            type="button"
            value={editionMode ? "X" : "Edit"}
            onClick={handleEdition}
          />
          <h3>{id}</h3>
          <input
            type="button"
            value="Delete activity"
            onClick={handleDeleting}
          />
        </div>
        {editionMode
          ? <BookForm />
          : (
            <ul className={styles.activity}>
              <li>
                {`Fecha de creación: `}
                {formateDate(createdAt)}
              </li>
              {clientId
                ? (
                  <li>
                    {`Cliente: `}
                    <Link href={`/admin/clients/${clientId}`}>{clientName}</Link>
                  </li>
                )
                : <li>Sin cliente</li>}

              {activities.length > 0
                ? (
                  <ul>
                    {`Actividades: `}
                    {activities.map(({ _id: activityId, title: activityTitle }) => <li key={activityId}><Link href={`/admin/activities/${activityId}`}>{activityTitle}</Link></li>)}
                  </ul>
                )
                : <li>Sin actividades</li>}

              <li>
                {`Precio base: `}
                {basePrice}
              </li>
              <li>
                {`Descuento aplicado: `}
                {discountApplied ? discountApplied.name : "Ningún descuento"}
              </li>
              <li>
                {`Porcentaje descontado: `}
                {discountApplied ? discountApplied.percentage : "0%"}
              </li>
              <li>
                {`Precio final: `}
                {finalPrice}
              </li>
              <li>
                {`Estado: `}
                {status}
              </li>
              <li>
                {`Método de pago: `}
                {paymentMethod}
              </li>
              <li>
                {`Notas: `}
                {notes}
              </li>
              <li>
                {`Última actualización: `}
                {formateDate(updatedAt)}
              </li>
            </ul>
          )}
        <input
          className={styles.back_button}
          type="button"
          onClick={() => router.back()}
          value="Volver"
        />

      </section>
    </AdminNav>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const book = await fetchFromApi(`${process.env.URL}/purchases/${id}`);

  return {
    props: {
      book
    }
  };
}
