import fetchFromApi from "../../../utils/fetchFromApi";

export default function ActivityDetails({ activity }) {
  const { title, _id: id } = activity;
  return (
    <>
      <h3>{title}</h3>
      <h3>{id}</h3>
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const activity = await fetchFromApi(`${process.env.URL}/activities/${id}`);

  return {
    props: {
      activity
    }
  };
}
