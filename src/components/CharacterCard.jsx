/* Tarjeta de personaje: imagen, nombre, especie y estado */
function CharacterCard({ image, name, species, status }) {
  return (
    <article
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        background: "#fff",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: 200,
          objectFit: "cover",
          borderRadius: 8,
          marginBottom: 8,
        }}
      />
      <h3 style={{ margin: "4px 0 6px" }}>{name}</h3>
      <p style={{ margin: 0, color: "#374151" }}>
        <strong>Species:</strong> {species}
      </p>
      <p style={{ margin: 0, color: "#374151" }}>
        <strong>Status:</strong> {status}
      </p>
    </article>
  );
}

export default CharacterCard;
