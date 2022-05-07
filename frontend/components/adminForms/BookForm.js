import { useState } from "react";
import axios from "axios";

export default function NewActivityForm({ handleAddForm }) {
  const [book, setBook] = useState({

  });

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await setBook({

    });
    await axios.post(`http://localhost:4001/purchases`, book);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >

      <input type="submit" value="Add booking" />
      <input type="button" value="Exit" onClick={() => handleAddForm()} />
    </form>
  );
}
