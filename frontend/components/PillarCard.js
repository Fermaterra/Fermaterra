import Image from "next/image";

export default function PillarCard({ title, text, image }) {
  return (
    <article>
      {image ? <Image src={image} width={280} height={350} alt={title} /> : null}
      <h2>{title}</h2>
      {text?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </article>
  );
}
