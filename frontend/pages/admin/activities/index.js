import fetchFromApi from "../../../utils/fetchFromApi";
import AdminLayout from "../../../components/AdminLayout";

export default function Activities({ activities }) {
  return (
    <AdminLayout>
      <h2>Activities</h2>
      <table>
        <th>Número actividad</th>
        <th>Día</th>
        <th>Hora</th>
        <th>Sitio</th>
        <th>Título actividad</th>
        <th>Profesor</th>
        <th>Notas</th>
        <th>Plazas totales</th>
        <th>Reservas</th>
        <th>Estado</th>
        {activities.map(({
          _id: id,
          title,
          day,
          hour,
          location,
          instructor,
          notes,
          initialStock,
          books,
          status

        }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{day}</td>
            <td>{hour}</td>
            <td>{location}</td>
            <td>{title}</td>
            <td>{instructor}</td>
            <td>{notes}</td>
            <td>{initialStock}</td>
            <td>{books}</td>
            <td>{status}</td>
          </tr>
        ))}
      </table>
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
