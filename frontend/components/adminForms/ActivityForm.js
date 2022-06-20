import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import styles from "../../styles/admin/form.module.scss";

export default function NewActivityForm({
  handleAddForm,
  activitiesList,
  setActivitiesList,
  id,
}) {
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [activity, setActivity] = useState({
    en: {
      title: "",
      description: "",
      shortDescription: "",
      includes: [],
    },
    es: {
      title: "",
      description: "",
      shortDescription: "",
      includes: [],
    },
    ca: {
      title: "",
      description: "",
      shortDescription: "",
      includes: [],
    },
    day: "",
    hour: "",
    duration: "",
    stock: "",
    basePrice: "",
    priceId: "",
    taxes: "",
    location: {
      name: "",
      lat: 0,
      lng: 0,
    },
    contact: "",
    instructor: "",
    notes: "",
    timesVisited: 0,
    books: 0,
    status: "",
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
    const imageRef = ref(
      storage,
      `images/${activity.title}-${activity.day}-${activity.hour}`
    );
    uploadBytes(imageRef, image).then(() => {
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
        const { status, data } = await axios.post(
          `${process.env.URL}/activities`,
          activity
        );
        if (status === 201) setActivitiesList([...activitiesList, data]);
      }

      await handleAddForm();
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setError(message);
    }
  };
  useEffect(() => {
    if (imageUploaded) {
      sendDataToDDBB();
    }
  }, [imageUploaded]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (image) uploadImage();
    if (!image) sendDataToDDBB();
  };
  const splitIncludes = (includes, lang) => {
    const includesArray = includes.split(",");
    switch (lang) {
      case "en":
        setActivity({
          ...activity,
          en: { ...activity.en, includes: includesArray },
        });
        break;
      case "ca":
        setActivity({
          ...activity,
          ca: { ...activity.ca, includes: includesArray },
        });
        break;
      case "es":
        setActivity({
          ...activity,
          es: { ...activity.es, includes: includesArray },
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(evt) => handleSubmit(evt)}>
        <label htmlFor="titleESP">
          title esp
          <br />
          <input
            required
            type="text"
            id="titleESP"
            value={activity.es.title}
            onChange={(evt) => {
              setActivity({
                ...activity,
                es: { ...activity.es, title: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="titleCAT">
          title cat
          <br />
          <input
            type="text"
            required
            id="titleCAT"
            value={activity.ca.title}
            onChange={(evt) => {
              setActivity({
                ...activity,
                ca: { ...activity.ca, title: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="titleENG">
          title eng
          <br />
          <input
            required
            type="text"
            id="titleENG"
            value={activity.en.title}
            onChange={(evt) => {
              setActivity({
                ...activity,
                en: { ...activity.en, title: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="day">
          day
          <br />
          <input
            required
            type="date"
            id="day"
            value={activity.day}
            onChange={(evt) => {
              setActivity({ ...activity, day: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="hour">
          hour
          <br />
          <input
            id="hour"
            required
            type="text"
            value={activity.hour}
            onChange={(evt) => {
              setActivity({ ...activity, hour: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="duration">
          duration
          <br />
          <input
            required
            id="duration"
            type="text"
            value={activity.duration}
            onChange={(evt) => {
              setActivity({ ...activity, duration: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="image">
          image
          <br />
          <input
            required
            id="image"
            type="file"
            onChange={(evt) => {
              setImage(evt.target.files[0]);
            }}
          />
        </label>
        <label htmlFor="stock">
          stock
          <br />
          <input
            id="stock"
            required
            type="number"
            value={activity.stock}
            onChange={(evt) => {
              setActivity({ ...activity, stock: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="descriptionESP">
          descriptionESP
          <br />
          <input
            type="text"
            id="descriptionESP"
            required
            value={activity.es.description}
            onChange={(evt) => {
              setActivity({
                ...activity,
                es: { ...activity.es, description: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="descriptionCAT">
          description cat
          <br />
          <input
            type="text"
            required
            id="descriptionCAT"
            value={activity.ca.description}
            onChange={(evt) => {
              setActivity({
                ...activity,
                ca: { ...activity.ca, description: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="descriptionENG">
          description eng
          <br />
          <input
            type="text"
            required
            id="descriptionENG"
            value={activity.en.description}
            onChange={(evt) => {
              setActivity({
                ...activity,
                en: { ...activity.en, description: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="shortDescriptionESP">
          shortDescription spa
          <br />
          <input
            id="shortDescriptionESP"
            required
            value={activity.es.shortDescription}
            onChange={(evt) => {
              setActivity({
                ...activity,
                es: { ...activity.es, shortDescription: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="shortDescriptionCAT">
          shortDescription cat
          <br />
          <input
            id="shortDescriptionCAT"
            required
            value={activity.ca.shortDescription}
            onChange={(evt) => {
              setActivity({
                ...activity,
                ca: { ...activity.ca, shortDescription: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="shortDescriptionENG">
          shortDescription eng
          <br />
          <input
            id="shortDescriptionENG"
            required
            value={activity.en.shortDescription}
            onChange={(evt) => {
              setActivity({
                ...activity,
                en: { ...activity.en, shortDescription: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="includesESP">
          includes ESP
          <br />
          <input
            type="text"
            required
            id="includesESP"
            value={activity.es.includes.toString()}
            onChange={(evt) => {
              splitIncludes(evt.target.value, "es");
            }}
          />
        </label>
        <label htmlFor="includesCAT">
          includes cat
          <br />
          <input
            required
            type="text"
            id="includesCAT"
            value={activity.ca.includes.toString()}
            onChange={(evt) => {
              splitIncludes(evt.target.value, "ca");
            }}
          />
        </label>
        <label htmlFor="includesENG">
          includes eng
          <br />
          <input
            required
            type="text"
            id="includesENG"
            value={activity.en.includes.toString()}
            onChange={(evt) => {
              splitIncludes(evt.target.value, "en");
            }}
          />
        </label>
        <label htmlFor="basePrice">
          basePrice
          <br />
          <input
            id="basePrice"
            required
            type="number"
            value={activity.basePrice}
            onChange={(evt) => {
              setActivity({ ...activity, basePrice: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="priceId">
          price Id
          <br />
          <input
            id="priceId"
            required
            type="text"
            value={activity.priceId}
            onChange={(evt) => {
              setActivity({ ...activity, priceId: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="taxes">
          taxes
          <br />
          <input
            id="taxes"
            type="number"
            value={activity.taxes}
            onChange={(evt) => {
              setActivity({ ...activity, taxes: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="locationName">
          location name
          <br />
          <input
            id="locationName"
            type="text"
            required
            value={activity.location.name}
            onChange={(evt) => {
              setActivity({
                ...activity,
                location: { ...activity.location, name: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="locationLAT">
          location lat
          <br />
          <input
            id="locationLAT"
            type="number"
            required
            value={activity.location.lat}
            onChange={(evt) => {
              setActivity({
                ...activity,
                location: { ...activity.location, lat: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="locationLNG">
          location long
          <br />
          <input
            id="locationLNG"
            type="number"
            required
            value={activity.location.lng}
            onChange={(evt) => {
              setActivity({
                ...activity,
                location: { ...activity.location, lng: evt.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="contact">
          contact
          <br />
          <input
            id="contact"
            type="text"
            required
            value={activity.contact}
            onChange={(evt) => {
              setActivity({ ...activity, contact: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="instructor">
          instructor
          <br />
          <input
            id="instructor"
            type="text"
            required
            value={activity.instructor}
            onChange={(evt) => {
              setActivity({ ...activity, instructor: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="notes">
          notes
          <br />
          <input
            id="notes"
            type="text"
            value={activity.notes}
            onChange={(evt) => {
              setActivity({ ...activity, notes: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="status">
          status
          <br />
          <input
            id="status"
            type="text"
            value={activity.status}
            onChange={(evt) => {
              setActivity({ ...activity, status: evt.target.value });
            }}
          />
        </label>
        <div className={styles.buttons}>
          <input type="submit" value={id ? "Edit activity" : "Add activity"} />
          <input type="button" value="Exit" onClick={() => handleAddForm()} />
        </div>
        {error ? <p>{error}</p> : null}
      </form>
    </div>
  );
}
