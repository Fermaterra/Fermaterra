import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import fetchFromApi from "../../utils/fetchFromApi";
import formateDate from "../../utils/formateDate";
import styles from "../../styles/booking.module.css";

export default function BookingDetails({ activity }) {
  const [dataDisplayed, setDataDisplayed] = useState("includes");
  const [amount, setAmount] = useState(1);
  const { locale } = useRouter();
  const {
    image, title, day, hour, basePrice, location, description, stock
  } = activity;
  const handleAmount = (action) => {
    if (action === "increase" && amount < stock) setAmount(amount + 1);
    if (action === "decrease" && amount > 1) setAmount(amount - 1);
  };
  return (
    <Layout>
      <main className={styles.booking}>

        <Image src={image} width={600} height={800} alt={title} />
        <div>
          <section>
            <h3>{title}</h3>
            <p>{basePrice}</p>
            <p>{`${formateDate(day, locale)} - ${hour}h`}</p>
            <p>{description}</p>
            {}
          </section>
          <div>
            <input
              type="button"
              value="inclou"
              onClick={() => setDataDisplayed("includes")}
            />
            <input
              type="button"
              value="ubicació"
              onClick={() => setDataDisplayed("location")}
            />
          </div>
          <div>
            {dataDisplayed === "includes" ? <p>IActivitats incloses</p> : <p>{location}</p>}
          </div>
          <p>Quantitat</p>
          <div>
            <input
              type="button"
              value="+"
              onClick={() => handleAmount("increase")}
            />
            <p>{amount}</p>
            <input
              type="button"
              value="-"
              onClick={() => handleAmount("decrease")}
            />
          </div>
        </div>
      </main>

    </Layout>
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
