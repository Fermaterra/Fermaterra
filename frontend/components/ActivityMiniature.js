import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import formateDate from "../utils/formateDate";
import styles from "../styles/activities.module.scss";

export default function ActivityMiniature({
  id, title, image, shortDescription, basePrice, day, hour
}) {
  const { locale } = useRouter();
  return (
    <article className={styles.miniature}>
      <Image src={image} height={450} width={400} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`${basePrice.toFixed(2)}€`}</p>
      </div>
      <p className={styles.activity_description}>{shortDescription}</p>
      <Link href={`booking/${id}`}> Reserva</Link>
      <p>{`${formateDate(day, locale)} - ${hour}h`}</p>
    </article>
  );
}
