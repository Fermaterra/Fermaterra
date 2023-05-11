import { useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic"; // 1. use dynamic imports
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import En from "../../constants/locales/en/booking";
import Es from "../../constants/locales/es/booking";
import Ca from "../../constants/locales/ca/booking";
import styles from "../../styles/activities.module.scss";

const ActivityMiniature = dynamic( // 1. use dynamic imports
  () => import("../../components/ActivityMiniature"),
  { ssr: false }
);

export default function Booking({ activities }) {
  const { locale } = useRouter();
  const language = useMemo(() => {
    switch (locale) {
      case "es":
        return Es;

      case "ca":
        return Ca;

      default:
        return En;
    }
  }, [locale]);

  if (!activities.length) { // 4. handle empty activities
    return (
      <Layout title="Activitats">
        <main className={styles.main}>
          <div className={styles.activities_list}>
            <span>{language.noResults}</span>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Activitats">
      <main className={styles.main}>
        <div className={styles.activities_list}>
          {activities.map(
            ({
              _id: id, image, en, es, ca, basePrice, day, hour
            }) => (
              <ActivityMiniature
                key={id}
                id={id}
                languageModules={[en, es, ca]}
                image={image}
                basePrice={basePrice}
                day={day}
                hour={hour}
              />
            )
          )}
        </div>
        <div className={styles.paginationButtons} />
      </main>
    </Layout>
  );
}

function compareDates(day) {
  const now = new Date();
  const activityDate = new Date(day);
  return activityDate > now;
}

export async function getServerSideProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);
  const filteredActivities = activities.filter(compareDates);
  return {
    props: {
      activities: filteredActivities,
    },
  };
}
