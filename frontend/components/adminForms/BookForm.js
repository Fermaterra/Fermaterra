import { useState } from "react";
import axios from "axios";

export default function BookForm({ handleAddForm }) {
  const [book, setBook] = useState({
    client: null,
    activities: [],
    basePrice: 0,
    taxes: 21,
    discountApplied: { name: "", percentage: 0 },
    finalPrice: 0,
    status: "pending",
    paymentMethod: "",
    notes: ""
  });
  const [discount, setDiscount] = useState({ name: "", percentage: 0 });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await setBook({
      ...book, discountApplied: discount
    });
    await axios.post(`http://localhost:4001/purchases`, book);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <label htmlFor="client">
        Cliente
        <input
          id="client"
          onChange={(evt) => { setBook({ ...book, client: evt.target.value }); }}
        />
      </label>
      <label htmlFor="activities">
        Actividades
        <input
          id="activities"
          onChange={(evt) => { setBook({ ...book, activities: evt.target.value }); }}
        />
      </label>
      <label htmlFor="basePrice">
        Precio base
        <input
          type="number"
          id="basePrice"
          onChange={(evt) => { setBook({ ...book, basePrice: evt.target.value }); }}
        />
      </label>
      <label htmlFor="taxes">
        Impuestos
        <input
          type="number"
          id="taxes"
          onChange={(evt) => { setBook({ ...book, taxes: evt.target.value }); }}
        />
      </label>
      <label htmlFor="discountAppliedName">
        Descuento aplicado (nombre)
        <input
          id="discountAppliedName"
          onChange={(evt) => {
            setDiscount({ ...discount, name: evt.target.value });
          }}
        />
      </label>
      <label htmlFor="discountAppliedPercentage">
        Descuento aplicado (%)
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
        <input
          type="number"
          id="finalPrice"
          onChange={(evt) => { setBook({ ...book, finalPrice: evt.target.value }); }}
        />
      </label>
      <label htmlFor="status">
        Estado
        <input
          id="status"
          onChange={(evt) => { setBook({ ...book, status: evt.target.value }); }}
        />
      </label>
      <label htmlFor="paymentMethod">
        Método de pago
        <input
          id="paymentMethod"
          onChange={(evt) => { setBook({ ...book, paymentMethod: evt.target.value }); }}
        />
      </label>
      <label htmlFor="notes">
        Notas
        <input
          id="notes"
          onChange={(evt) => { setBook({ ...book, notes: evt.target.value }); }}
        />
      </label>

      <input type="submit" value="Add booking" />
      <input type="button" value="Exit" onClick={() => handleAddForm()} />
    </form>
  );
}
