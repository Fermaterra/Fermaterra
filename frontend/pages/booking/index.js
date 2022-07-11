import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import compareDates from "../../utils/compareDates";
import ActivityMiniature from "../../components/ActivityMiniature";
import styles from "../../styles/activities.module.scss";

export default function Booking({ activities }) {
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const activitiesFiltered = activities.filter(({ day }) => compareDates(day));
    const activitesDivided = [];
    for (let i = 0; i < activitiesFiltered.length; i += 6) {
      const slice = activitiesFiltered.slice(i, i + 6);
      activitesDivided.push(slice);
    }
    setTotalCount(activitesDivided.length);
    setActivitiesToDisplay(activitesDivided);
  }, []);

  function handlePaginationChange(event, value) {
    setCurrentPage(value);
  }
  return (
    <Layout title="Activitats">
      <main className={styles.main}>
        <div className={styles.activities_list}>
          {activitiesToDisplay[currentPage - 1]?.map(
            ({
              _id: id,
              image,
              en,
              es,
              ca,
              basePrice,
              day,
              hour,
            }) => (
              <ActivityMiniature
                id={id}
                languageModules={[en, es, ca]}
                image={image}
                basePrice={basePrice}
                day={day}
                hour={hour}
                key={id}
              />
            )
          )}
        </div>
        <div className={styles.paginationButtons}>
          <Stack spacing={2}>
            <Pagination
              count={totalCount}
              onChange={(event, value) => handlePaginationChange(event, value)}
              page={currentPage}
              size="large"
            />
          </Stack>
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
