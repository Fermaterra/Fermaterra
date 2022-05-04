import fetchFromApi from "../../../utils/fetchFromApi";
import AdminLayout from "../../../components/AdminLayout";

export default function Activities({ activities }) {
  return (
    <AdminLayout>
      <h1>Activities</h1>
      {activities.map(({
        _id, title, description, instructor
      }) => (
        <div key={_id}>
          <p>
            title:
            {" "}
            {title}
          </p>
          <p>
            description:
            {" "}
            {description}
          </p>
          <p>
            instructor:
            {" "}
            {instructor}
          </p>
        </div>
      ))}
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  const activities = await fetchFromApi(`${process.env.URL}/activities`);

  return {
    props: {
      activities
    }
  };
}
