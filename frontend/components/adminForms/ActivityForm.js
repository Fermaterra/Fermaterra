import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import styles from "../../styles/admin/activityForm.module.css";

export default function NewActivityForm({
  handleAddForm, activitiesList, setActivitiesList, id
}) {
  const [activity, setActivity] = useState({
    title: "",
    day: "",
    hour: "",
    duration: "",
    image: "",
    stock: "",
    description: "",
    shortDescription: "",
    basePrice: "",
    taxes: "",
    location: "",
    contact: "",
    instructor: "",
    notes: "",
    timesVisited: "",
    books: "",
    status: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        const { data } = await axios.get(`${process.env.URL}/activities/${id}`);
        await setActivity(data);
      };
      fetchActivity();
    }
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.URL}/activities/${id}`, activity);
        router.push(`/admin/activities/${id}`);
      } else {
        const { status, data } = await axios.post(`${process.env.URL}/activities`, activity);
        if (status === 201) setActivitiesList([...activitiesList, data]);
      }

      await handleAddForm();
    } catch ({ response: { data: { message } } }) {
      setError(message);
    }
  };
  const uploadImage = (image) => {
    const imageRef = ref(storage, `images/${image.title}-${image.day}-${image.hour}`);
    uploadBytes(imageRef, image,).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setActivity({ ...activity, image: url });
      });
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title">
        title
        <input
          id="title"
          value={activity.title}
          onChange={(evt) => { setActivity({ ...activity, title: evt.target.value }); }}
        />
      </label>
      <label htmlFor="day">
        day
        <input
          type="date"
          id="day"
          value={activity.day}
          onChange={(evt) => { setActivity({ ...activity, day: evt.target.value }); }}
        />
      </label>
      <label htmlFor="hour">
        hour
        <input
          id="hour"
          value={activity.hour}
          onChange={(evt) => { setActivity({ ...activity, hour: evt.target.value }); }}
        />
      </label>
      <label htmlFor="duration">
        duration
        <input
          id="duration"
          value={activity.duration}
          onChange={(evt) => { setActivity({ ...activity, duration: evt.target.value }); }}
        />
      </label>
      <label htmlFor="image">
        image
        <input
          id="image"
          type="file"
          onChange={(evt) => { uploadImage(evt.target.files[0]); }}
        />
      </label>
      <label htmlFor="stock">
        stock
        <input
          id="stock"
          value={activity.stock}
          onChange={(evt) => { setActivity({ ...activity, stock: evt.target.value }); }}
        />
      </label>
      <label htmlFor="description">
        description
        <input
          id="description"
          value={activity.description}
          onChange={(evt) => { setActivity({ ...activity, description: evt.target.value }); }}
        />
      </label>
      <label htmlFor="shortDescription">
        shortDescription
        <input
          id="shortDescription"
          value={activity.shortDescription}
          onChange={(evt) => { setActivity({ ...activity, shortDescription: evt.target.value }); }}
        />
      </label>
      <label htmlFor="basePrice">
        basePrice
        <input
          id="basePrice"
          value={activity.basePrice}
          onChange={(evt) => { setActivity({ ...activity, basePrice: evt.target.value }); }}
        />
      </label>
      <label htmlFor="taxes">
        taxes
        <input
          id="taxes"
          value={activity.taxes}
          onChange={(evt) => { setActivity({ ...activity, taxes: evt.target.value }); }}
        />
      </label>
      <label htmlFor="location">
        location
        <input
          id="location"
          value={activity.location}
          onChange={(evt) => { setActivity({ ...activity, location: evt.target.value }); }}
        />
      </label>
      <label htmlFor="contact">
        contact
        <input
          id="contact"
          value={activity.contact}
          onChange={(evt) => { setActivity({ ...activity, contact: evt.target.value }); }}
        />
      </label>
      <label htmlFor="instructor">
        instructor
        <input
          id="instructor"
          value={activity.instructor}
          onChange={(evt) => { setActivity({ ...activity, instructor: evt.target.value }); }}
        />
      </label>
      <label htmlFor="notes">
        notes
        <input
          id="notes"
          value={activity.notes}
          onChange={(evt) => { setActivity({ ...activity, notes: evt.target.value }); }}
        />
      </label>
      <label htmlFor="timesVisited">
        timesVisited
        <input
          id="timesVisited"
          value={activity.timesVisited}
          onChange={(evt) => { setActivity({ ...activity, timesVisited: evt.target.value }); }}
        />
      </label>
      <label htmlFor="books">
        books
        <input
          id="books"
          value={activity.books}
          onChange={(evt) => { setActivity({ ...activity, books: evt.target.value }); }}
        />
      </label>
      <label htmlFor="status">
        status
        <input
          id="status"
          value={activity.status}
          onChange={(evt) => { setActivity({ ...activity, status: evt.target.value }); }}
        />
      </label>
      <input type="submit" value={id ? "Edit activity" : "Add activity"} />
      <input type="button" value="Exit" onClick={() => handleAddForm()} />
      {error ? <p>{error}</p> : null}
    </form>
  );
}
