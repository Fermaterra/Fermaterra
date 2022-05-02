export default function ActivityMiniature({ activity }) {
  const { name, text } = activity;
  return (
    <article>
      <div />
      <h3>{name}</h3>
      <p>{text}</p>
    </article>
  );
}
