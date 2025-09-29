function CharacterCard({ image, name, species, status }) {
  const dotClass =
    status?.toLowerCase() === "alive"
      ? "alive"
      : status?.toLowerCase() === "dead"
      ? "dead"
      : "unknown";

  return (
    <article className="card">
      <img className="card-img" src={image} alt={name} loading="lazy" />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="meta">{species}</p>

        <div className="pills">
          <span className="pill">
            <span className={`dot ${dotClass}`} />
            {status}
          </span>
          <span className="pill">{species}</span>
        </div>
      </div>
    </article>
  );
}

export default CharacterCard;
