import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import compareDates from "../../utils/compareDates";
import ActivityMiniature from "../../components/ActivityMiniature";

export default function Booking({ activities, cart }) {
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  useEffect(() => {
    setActivitiesToDisplay(activities.filter(({ day }) => compareDates(day)));
  }, []);
  return (
    <Layout cart={cart}>
      <h2>Activitats</h2>
      {activitiesToDisplay?.map(({
        _id: id, title, image, shortDescription, basePrice, day, hour
      }) => (
        <ActivityMiniature
          id={id}
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
