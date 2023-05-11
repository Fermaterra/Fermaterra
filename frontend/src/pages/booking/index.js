import { useMemo } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import ActivityMiniature from "../../components/ActivityMiniature";
import En from "../../constants/locales/en/booking";
import Es from "../../constants/locales/es/booking";
import Ca from "../../constants/locales/ca/booking";
import styles from "../../styles/activities.module.scss";

export default function Booking({ activities }) {
  const { locale } = useRouter();
  const language = useMemo(() => {
    switch (locale) {
      case "es":
        return Es;

      case "en":
        return En;

      case "ca":
        return Ca;

      default:
        return En;
    }
  }, [locale]);
  return (
    <Layout title="Activitats">
      <main className={styles.main}>
        <div className={styles.activities_list}>

          {activities.length
            ? activities.map(
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
            )
            : <span>{language.noResults}</span>}
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
  const filteredActivities = activities.filter((activity) => compareDates(activity.day));
  return {
    props: {
      activities: filteredActivities,
    },
  };
}
