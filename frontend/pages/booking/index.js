import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import compareDates from "../../utils/compareDates";
import ActivityMiniature from "../../components/ActivityMiniature";
import styles from "../../styles/activities.module.scss";

export default function Booking({ activities }) {
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  useEffect(() => {
    setActivitiesToDisplay(activities.filter(({ day }) => compareDates(day)));
  }, []);
  return (
    <Layout title="Activitats">
      <main className={styles.main}>
        <div className={styles.activities_list}>
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
        </div>
      </main>
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
