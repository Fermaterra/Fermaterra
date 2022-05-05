import { useState } from "react";
import axios from "axios";

export default function NewActivityForm({ handleAddForm }) {
  const [title, setTitle] = useState("");
  const [day, setDay] = useState(Date.now());
  const [hour, setHour] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [taxes, setTaxes] = useState(21);
  const [location, setLocation] = useState({ name: "", coordinates: "" });
  const [contact, setContact] = useState("");
  const [instructor, setInstructor] = useState("");
  const [notes, setNotes] = useState("");
  const [timesVisited, setTimesVisited] = useState(0);
  const [books, setBooks] = useState(0);
  const [status, setStatus] = useState("available");
  const [activity, setActivity] = useState({});

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await setActivity({
      title,
      day,
      hour,
      duration,
      image,
      stock,
      description,
      shortDescription,
      basePrice,
      taxes,
      location: { name: location.name, coordinates: location.coordinates },
      contact,
      instructor,
      notes,
      timesVisited,
      books,
      status
    });
    await axios.post(`http://localhost:4001/activities`, activity);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">
        title
        <input
          id="title"
          value={title}
          onChange={(evt) => setTitle(evt.target.value)}
        />
      </label>
      <label htmlFor="day">
        day
        <input
          type="date"
          id="day"
          value={day}
          onChange={(evt) => setDay(evt.target.value)}
        />
      </label>
      <label htmlFor="hour">
        hour
        <input
          id="hour"
          value={hour}
          onChange={(evt) => setHour(evt.target.value)}
        />
      </label>
      <label htmlFor="duration">
        duration
        <input
          id="duration"
          value={duration}
          onChange={(evt) => setDuration(evt.target.value)}
        />
      </label>
      <label htmlFor="image">
        image
        <input
          id="image"
          value={image}
          onChange={(evt) => setImage(evt.target.value)}
        />
      </label>
      <label htmlFor="stock">
        stock
        <input
          id="stock"
          value={stock}
          onChange={(evt) => setStock(evt.target.value)}
        />
      </label>
      <label htmlFor="description">
        description
        <input
          id="description"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </label>
      <label htmlFor="shortDescription">
        shortDescription
        <input
          id="shortDescription"
          value={shortDescription}
          onChange={(evt) => setShortDescription(evt.target.value)}
        />
      </label>
      <label htmlFor="basePrice">
        basePrice
        <input
          id="basePrice"
          value={basePrice}
          onChange={(evt) => setBasePrice(evt.target.value)}
        />
      </label>
      <label htmlFor="taxes">
        taxes
        <input
          id="taxes"
          value={taxes}
          onChange={(evt) => setTaxes(evt.target.value)}
        />
      </label>
      <label htmlFor="location">
        location
        <input
          id="location"
          value={location.name}
          onChange={(evt) => setLocation({ name: evt.target.value, coordinates: evt.target.value })}
        />
      </label>
      <label htmlFor="contact">
        contact
        <input
          id="contact"
          value={contact}
          onChange={(evt) => setContact(evt.target.value)}
        />
      </label>
      <label htmlFor="instructor">
        instructor
        <input
          id="instructor"
          value={instructor}
          onChange={(evt) => setInstructor(evt.target.value)}
        />
      </label>
      <label htmlFor="notes">
        notes
        <input
          id="notes"
          value={notes}
          onChange={(evt) => setNotes(evt.target.value)}
        />
      </label>
      <label htmlFor="timesVisited">
        timesVisited
        <input
          id="timesVisited"
          value={timesVisited}
          onChange={(evt) => setTimesVisited(evt.target.value)}
        />
      </label>
      <label htmlFor="books">
        books
        <input
          id="books"
          value={books}
          onChange={(evt) => setBooks(evt.target.value)}
        />
      </label>
      <label htmlFor="status">
        status
        <input
          id="status"
          value={status}
          onChange={(evt) => setStatus(evt.target.value)}
        />
      </label>
      <input type="submit" value="Add activity" />
      <input type="button" value="Exit" onClick={() => handleAddForm()} />
    </form>
  );
}
