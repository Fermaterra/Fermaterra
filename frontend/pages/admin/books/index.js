import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.css";

function createLink(value) {
  return (
    <Link href={`/admin/books/${value}`} key={`${value}-linkChild`}>
      {value}
    </Link>
  );
}

export default function Books({ purchases }) {
  const { locale } = useRouter();
  const [addForm, setAddForm] = useState(false);
  const [books, setBooks] = useState(purchases);
  const [booksToDisplay, setBooksToDisplay] = useState(purchases);
  const handleAddForm = () => setAddForm(!addForm);
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
      name: "date",
      options: {
        customBodyRender: (value) => formateDate(value, locale),
      },
    },
    /*    {
      label: "Cliente",
      name: "date",
      options: {
        filter: true,
        sort: false,
      },
    }, */
    {
      label: "Precio base",
      name: "basePrice",
    },
    {
      label: "Precio final",
      name: "finalPrice",
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
    setBooksToDisplay(books);
  }, [books]);

  const filterBooks = (query) => {
    const filteredBooks = books.filter(
      (book) => Object.values(book).toString().toUpperCase().includes(query.toUpperCase())
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
        <input id="search" onChange={(evt) => filterBooks(evt.target.value)} />
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
            status,
          }) => (
            <Fragment key={`${id}-fragment`}>
              <li key={`${id}-book_link`}>
                <Link href={`/admin/books/${id}`} key={`${id}-book`}>
                  {id}
                </Link>
              </li>
              <li key={`${id}-day`}>{formateDate(createdAt)}</li>
              <li key={`${id}-client_link`}>
                {clientId ? (
                  <Link
                    href={`/admin/clients/${clientId}`}
                    key={`${clientId}-client`}
                  >
                    {clientName}
                  </Link>
                ) : (
                  "Sin cliente"
                )}
              </li>
              <li key={`${id}-basePrice`}>{basePrice}</li>
              <li key={`${id}-finalPrice`}>{finalPrice}</li>
              <li key={`${id}-status`}>{status}</li>
            </Fragment>
          )
        )}
      </ul>
      <MUIDataTable
        title=""
        data={booksToDisplay}
        columns={columns}
        options={options}
        keyField="_id"
      />
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
