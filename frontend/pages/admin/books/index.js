import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import AdminNav from "../../../components/AdminNav";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.css";

export default function Books({ purchases }) {
  const [addForm, setAddForm] = useState(false);
  const [books, setBooks] = useState(purchases);
  const [booksToDisplay, setBooksToDisplay] = useState(purchases);
  useEffect(() => { setBooksToDisplay(books); }, [books]);
  const handleAddForm = () => setAddForm(!addForm);

  const filterBooks = (query) => {
    const filteredBooks = books.filter(
      (book) => (Object.values(book).toString().toUpperCase().includes(query.toUpperCase()))
    );
    setBooksToDisplay(filteredBooks);
  };
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
        <h2>Reservas</h2>
      </div>
      <label htmlFor="search">
        Buscar:
        {" "}
        <input
          id="search"
          onChange={(evt) => filterBooks(evt.target.value)}
        />
      </label>
      {addForm ? (
        <BookForm
          books={books}
          setBooks={setBooks}
          handleAddForm={handleAddForm}
        />
      ) : null}
      <ul className={`${styles.rows} ${styles.books}`}>
        <li key="bookNumber">Número reserva</li>
        <li key="purchaseDate">Fecha de pedido</li>
        <li key="client">Cliente</li>
        <li key="precio">Precio base:</li>
        <li key="finalPrice">Precio con descuento</li>
        <li key="status">Status</li>

        {booksToDisplay?.map(
          ({
            _id: id,
            client: { _id: clientId, name: clientName },
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
                {clientId
                  ? (
                    <Link href={`/admin/clients/${clientId}`} key={`${clientId}-client`}>
                      {clientName}
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
    </AdminNav>
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
