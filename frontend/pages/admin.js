import fetchFromApi from "../utils/fetchFromApi";

export default function Admin({ activities }) {
  return (
    <>
      <h1>Admin</h1>
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
    </>
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
