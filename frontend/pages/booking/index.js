import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import compareDates from "../../utils/compareDates";
import styles from "../../styles/activities.module.scss";

const Pagination = dynamic(() => import("@mui/material/Pagination"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const ActivityMiniature = dynamic(() => import("../../components/ActivityMiniature"));

export default function Booking({ activities }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredActivities = useMemo(() => activities
    .filter(({ day }) => compareDates(day)), [activities]);

  const totalItems = useMemo(() => Math
    .ceil(filteredActivities.length / itemsPerPage), [filteredActivities]);

  const activitiesToDisplay = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredActivities.slice(start, end);
  }, [filteredActivities, currentPage]);

  function handlePaginationChange(event, value) {
    setCurrentPage(value);
  }

  return (
    <Layout title="Activitats">
      <main className={styles.main}>
        <div className={styles.activities_list}>
          {activitiesToDisplay.map(
            ({
              _id: id, image, en, es, ca, basePrice, day, hour
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
              count={totalItems}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handlePaginationChange}
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
