import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import styles from "../../styles/admin/activityForm.module.scss";

export default function NewActivityForm({
  handleAddForm, activitiesList, setActivitiesList, id
}) {
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [activity, setActivity] = useState({
    en: {
      title: "",
      description: "",
      shortDescription: ""
    },
    es: {
      title: "",
      description: "",
      shortDescription: ""
    },
    ca: {
      title: "",
      description: "",
      shortDescription: ""
    },
    day: "",
    hour: "",
    duration: "",
    stock: "",
    basePrice: "",
    taxes: "",
    location: {
      name: "",
      lat: 0,
      lng: 0
    },
    contact: "",
    instructor: "",
    notes: "",
    timesVisited: 0,
    books: 0,
    status: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchActivity = async () => {
        const { data } = await axios.get(`${process.env.URL}/activities/${id}`);
        await setActivity(data);
        await setImage(activity.image);
      };
      fetchActivity();
    }
  }, []);

  const uploadImage = () => {
    const imageRef = ref(storage, `images/${activity.title}-${activity.day}-${activity.hour}`);
    uploadBytes(imageRef, image,).then(() => {
      getDownloadURL(imageRef).then((url) => {
        setActivity({ ...activity, image: url });
        setImageUploaded(true);
      });
    });
  };

  const sendDataToDDBB = async () => {
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
  useEffect(() => {
    if (imageUploaded) { sendDataToDDBB(); }
  }, [imageUploaded]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (image) uploadImage();
    if (!image) sendDataToDDBB();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(evt) => handleSubmit(evt)}
    >
      <label htmlFor="titleESP">
        title spa
        <input
          type="text"
          id="titleESP"
          value={activity.es.title}
          onChange={(evt) => {
            setActivity(
              { ...activity, es: { ...activity.es, title: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="titleCAT">
        title cat
        <input
          type="text"
          id="titleCAT"
          value={activity.ca.title}
          onChange={(evt) => {
            setActivity(
              { ...activity, ca: { ...activity.ca, title: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="titleENG">
        title eng
        <input
          type="text"
          id="titleENG"
          value={activity.en.title}
          onChange={(evt) => {
            setActivity(
              { ...activity, en: { ...activity.en, title: evt.target.value } }
            );
          }}
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
          onChange={(evt) => { setImage(evt.target.files[0]); }}
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
      <label htmlFor="descriptionESP">
        description spa
        <input
          type="text"
          id="descriptionESP"
          value={activity.es.description}
          onChange={(evt) => {
            setActivity(
              { ...activity, es: { ...activity.es, description: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="descriptionCAT">
        description cat
        <input
          type="text"
          id="descriptionCAT"
          value={activity.ca.description}
          onChange={(evt) => {
            setActivity(
              { ...activity, ca: { ...activity.ca, description: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="descriptionENG">
        description eng
        <input
          type="text"
          id="descriptionENG"
          value={activity.en.description}
          onChange={(evt) => {
            setActivity(
              { ...activity, en: { ...activity.en, description: evt.target.value } }

            );
          }}
        />
      </label>
      <label htmlFor="shortDescriptionESP">
        shortDescription esp
        <input
          id="shortDescriptionESP"
          value={activity.es.shortDescription}
          onChange={(evt) => {
            setActivity(
              { ...activity, es: { ...activity.es, shortDescription: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="shortDescriptionCAT">
        shortDescription cat
        <input
          id="shortDescriptionCAT"
          value={activity.ca.shortDescription}
          onChange={(evt) => {
            setActivity(
              { ...activity, ca: { ...activity.ca, shortDescription: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="shortDescriptionENG">
        shortDescription eng
        <input
          id="shortDescriptionENG"
          value={activity.en.shortDescription}
          onChange={(evt) => {
            setActivity(
              { ...activity, en: { ...activity.en, shortDescription: evt.target.value } }
            );
          }}
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
      <label htmlFor="locationName">
        location name
        <input
          id="locationName"
          value={activity.location.name}
          onChange={(evt) => {
            setActivity(
              { ...activity, location: { ...activity.location, name: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="locationLAT">
        location lat
        <input
          id="locationLAT"
          value={activity.location.lat}
          onChange={(evt) => {
            setActivity(
              { ...activity, location: { ...activity.location, lat: evt.target.value } }
            );
          }}
        />
      </label>
      <label htmlFor="locationLNG">
        location long
        <input
          id="locationLNG"
          value={activity.location.lng}
          onChange={(evt) => {
            setActivity(
              { ...activity, location: { ...activity.location, lng: evt.target.value } }

            );
          }}
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
