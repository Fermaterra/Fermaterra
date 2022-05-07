import fetchFromApi from "../../../utils/fetchFromApi";

export default function bookDetails({ book }) {
  const { createdAt, _id: id } = book;
  return (
    <>
      <h3>{createdAt}</h3>
      <h3>{id}</h3>
    </>
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
