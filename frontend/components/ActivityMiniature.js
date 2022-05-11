import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import formateDate from "../utils/formateDate";
import styles from "../styles/activityMiniature.module.css";

export default function ActivityMiniature({
  title, image, shortDescription, basePrice, day, hour
}) {
  const { locale } = useRouter();
  return (
    <article classtitle={styles.miniature}>
      <Image src={image} height={450} width={400} alt={title} />
      <h3>{title}</h3>
      <p>{basePrice}</p>
      <p>{shortDescription}</p>
      <Link href="/">
        <p>
          Reserva
          {" "}
          <span>{`${formateDate(day, locale).toUpperCase()} - ${hour}h`}</span>
        </p>
      </Link>
    </article>
  );
}
