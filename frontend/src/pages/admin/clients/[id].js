import Link from "next/link";
import { useRouter } from "next/router";
import AdminNav from "../../../components/AdminNav";
import fetchFromApi from "../../../utils/fetchFromApi";

export default function ClientDetails({ client }) {
  const { back } = useRouter();
  const {
    treatment,
    name,
    birthday,
    email,
    phone,
    country,
    createdAt,
    purchases,
    lastPurchase,
    shoppingCart,
    address,
    language,
    notes
  } = client;
  return (
    <AdminNav>
      <h2>{name}</h2>
      <section>
        <h3>Datos personales</h3>
        <p>
          {`Tratamiento: `}
          <span>{treatment}</span>
        </p>
        <p>
          {`Fecha de nacimiento: `}
          <span>{birthday}</span>
        </p>
        <p>
          {`Idioma de preferencia: `}
          <span>{language}</span>
        </p>
        <p>
          {`Email: `}
          <span>{email}</span>
        </p>
        <p>
          {`Teléfono: `}
          <span>{phone}</span>
        </p>
        <p>
          {`Dirección: `}
          <span>{`${address?.dir}, ${address?.zipCode}`}</span>
        </p>
        <p>
          {`País: `}
          <span>{country}</span>
        </p>
        <p>
          {`Cliente desde: `}
          <span>
            {" "}
            {createdAt}
          </span>
        </p>
      </section>
      <section>
        <h3>Pedidos</h3>
        <div>
          {purchases.map(({ _id: purchaseId }) => <Link href={`/admin/purchases/${purchaseId}`}>{purchaseId}</Link>)}
        </div>
        <p>
          {`Último pedido: `}
          <span>{lastPurchase}</span>
        </p>
      </section>
      <section>
        <h3>Carrito</h3>
        <p>{shoppingCart}</p>
      </section>
      <section>
        <h3>Notas</h3>
        {notes.map((note) => <p>{note}</p>)}
      </section>
      <input
        type="button"
        value="Volver"
        onClick={back}
      />
    </AdminNav>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const client = await fetchFromApi(`${process.env.URL}/clients/${id}`);

  return {
    props: {
      client
    }
  };
}
