import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CharacterCard from "./components/CharacterCard.jsx";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://rickandmortyapi.com/api/character/?page=1");
        if (!res.ok) throw new Error("No se pudo obtener la lista de personajes");
        const data = await res.json();
        // EXACTAMENTE 5
        setCharacters(data.results.slice(0, 5));
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 32px" }}>
      <Header />

      {loading && <p>Cargando personajes…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {!loading && !error && (
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              image={c.image}
              name={c.name}
              species={c.species}
              status={c.status}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
