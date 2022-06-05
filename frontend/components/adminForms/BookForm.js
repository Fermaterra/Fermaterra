import { useState } from "react";
import axios from "axios";
import styles from "../../styles/admin/form.module.scss";

export default function BookForm({ books, setBooks, handleAddForm }) {
  const [book, setBook] = useState({
    client: null,
    activities: [],
    basePrice: 0,
    taxes: 21,
    discountApplied: { name: "", percentage: 0 },
    finalPrice: 0,
    status: "pending",
    paymentMethod: "",
    notes: "",
  });
  const [discount, setDiscount] = useState({ name: "", percentage: 0 });
  const [error, setError] = useState("");
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await setBook({
      ...book,
      discountApplied: discount,
    });
    try {
      const { status, data } = await axios.post(
        `http://localhost:4001/purchases`,
        book
      );
      if (status === 201) setBooks([...books, data]);
    } catch ({
      response: {
        data: { message },
      },
    }) {
      setError(message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {error ? <p>{error}</p> : null}
        <label htmlFor="client">
          Cliente
          <br />
          <input
            id="client"
            required
            type="text"
            onChange={(evt) => {
              setBook({ ...book, client: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="activities">
          Actividades
          <br />
          <input
            id="activities"
            type="text"
            required
            onChange={(evt) => {
              setBook({ ...book, activities: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="basePrice">
          Precio base
          <br />
          <input
            type="number"
            id="basePrice"
            onChange={(evt) => {
              setBook({ ...book, basePrice: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="taxes">
          Impuestos
          <br />
          <input
            type="number"
            id="taxes"
            onChange={(evt) => {
              setBook({ ...book, taxes: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="discountAppliedName">
          Descuento aplicado (nombre)
          <br />
          <input
            id="discountAppliedName"
            type="text"
            onChange={(evt) => {
              setDiscount({ ...discount, name: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="discountAppliedPercentage">
          Descuento aplicado (%)
          <br />
          <input
            type="number"
            id="discountAppliedPercentage"
            onChange={(evt) => {
              setDiscount({ ...discount, percentage: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="finalPrice">
          Precio final
          <br />
          <input
            type="number"
            id="finalPrice"
            required
            onChange={(evt) => {
              setBook({ ...book, finalPrice: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="status">
          Estado
          <br />
          <input
            id="status"
            required
            onChange={(evt) => {
              setBook({ ...book, status: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="paymentMethod">
          Método de pago
          <br />
          <input
            id="paymentMethod"
            input="text"
            onChange={(evt) => {
              setBook({ ...book, paymentMethod: evt.target.value });
            }}
          />
        </label>
        <label htmlFor="notes">
          Notas
          <br />
          <input
            id="notes"
            type="text"
            onChange={(evt) => {
              setBook({ ...book, notes: evt.target.value });
            }}
          />
        </label>
        <div className={styles.buttons}>
          <input type="submit" value="Add booking" />
          <input type="button" value="Exit" onClick={() => handleAddForm()} />
        </div>
      </form>
    </div>
  );
}
