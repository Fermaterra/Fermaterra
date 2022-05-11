import Layout from "../components/Layout";
import fetchFromApi from "../utils/fetchFromApi";
import ActivityMiniature from "../components/ActivityMiniature";

export default function Booking({ activities }) {
  return (
    <Layout>
      <h2>Activitats</h2>
      {activities?.map(({
        _id: id, title, image, shortDescription, basePrice, day, hour
      }) => (
        <ActivityMiniature
          title={title}
          image={image}
          shortDescription={shortDescription}
          basePrice={basePrice}
          day={day}
          hour={hour}
          key={id}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);
  return {
    props: {
      activities,
    },
  };
}
