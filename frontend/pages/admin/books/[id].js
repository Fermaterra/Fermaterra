import { useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import BookForm from "../../../components/adminForms/BookForm";
import fetchFromApi from "../../../utils/fetchFromApi";

export default function bookDetails({ book }) {
  const [editionMode, setEditionMode] = useState(false);

  const { createdAt, _id: id } = book;
  const handleEdition = () => {
    setEditionMode(!editionMode);
  };
  return (
    <AdminLayout>
      <div>
        <input
          type="button"
          value={editionMode ? "X" : "Edit"}
          onClick={() => { handleEdition(); }}
        />
        <h3>{id}</h3>
        <input
          type="button"
          value="Delete activity"
        />
      </div>
      {editionMode
        ? <BookForm />
        : (
          <ul>
            <h3>{createdAt}</h3>
            <h3>{id}</h3>

          </ul>
        )}
    </AdminLayout>
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
