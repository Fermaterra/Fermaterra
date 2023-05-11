import { useState } from "react";
import Link from "next/link";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";
import styles from "../../../styles/admin/views.module.scss";

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
  const [booksToDisplay, setBooksToDisplay] = useState(purchases);
  const handleAddForm = () => setAddForm(!addForm);
  const getClientData = (value) => {
    if (value) {
      const { name, _id: id } = value;
      return <Link href={`clients/${id}`}>{name}</Link>;
    }
    return <p>Sin cliente</p>;
  };
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
    {
      label: "Cliente",
      name: "client",
      options: {
        customBodyRender: (value) => getClientData(value)
      },
    },
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

      {addForm ? (
        <BookForm
          books={booksToDisplay}
          setBooks={setBooksToDisplay}
          handleAddForm={handleAddForm}
        />
      ) : null}

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
