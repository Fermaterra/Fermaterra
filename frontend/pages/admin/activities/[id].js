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

export async function getStaticPaths() {
  const entries = await fetchFromApi(`${process.env.API_URL}/activities`);
  const paths = entries.map(({ _id: id }) => ({
    params: { id }
  }));

  return {
    paths,
    fallback: false

  };
}

export async function getStaticProps({ params: { id } }) {
  const activity = await fetchFromApi(`${process.env.URL}/activities/${id}`);

  return {
    props: {
      activity: activity[0]
    }
  };
}
