import { useState } from "react";
import ActivityForm from "../../../components/adminForms/ActivityForm";
import fetchFromApi from "../../../utils/fetchFromApi";
import formateDate from "../../../utils/formateDate";

export default function ActivityDetails({ activity }) {
  const [editionMode, setEditionMode] = useState(false);
  const {
    title, _id: id, day, hour, duration, image, stock, description, shortDescription,
    basePrice, taxes, location, contact, instructor, notes, timesVisited, books, status
  } = activity;

  const handleEdition = () => {
    setEditionMode(!editionMode);
  };

  return (
    <main>
      <div>
        <input
          type="button"
          value={editionMode ? "X" : "Edit"}
          onClick={() => { handleEdition(); }}
        />
        <h3>{title}</h3>
        <input
          type="button"
          value="Delete activity"
        />
      </div>
      {editionMode
        ? (
          <ActivityForm
            handleAddForm={setEditionMode}
            id={id}
          />
        )
        : (
          <ul>
            <li>{formateDate(day)}</li>
            <li>{hour}</li>
            <li>{duration}</li>
            <li>{image}</li>
            <li>{stock}</li>
            <li>{description}</li>
            <li>{shortDescription}</li>
            <li>{basePrice}</li>
            <li>{taxes}</li>
            <li>{location}</li>
            <li>{contact}</li>
            <li>{instructor}</li>
            <li>{notes}</li>
            <li>{timesVisited}</li>
            <li>{books}</li>
            <li>{status}</li>
          </ul>
        )}
    </main>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const activity = await fetchFromApi(`${process.env.URL}/activities/${id}`);

  return {
    props: {
      activity
    }
  };
}
