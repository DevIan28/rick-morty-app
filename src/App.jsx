import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import "./styles.css";

const FIRST_URL = "https://rickandmortyapi.com/api/character?page=1";

function App() {
  const [characters, setCharacters] = useState([]);
  const [nextUrl, setNextUrl] = useState(FIRST_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchPage(url) {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(url);
      if (!res.ok) throw new Error("No se pudo obtener personajes");
      const data = await res.json();
      setCharacters((prev) => [...prev, ...data.results]);
      setNextUrl(data.info?.next ?? null);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage(FIRST_URL);
  }, []);

  return (
    <main className="container">
      <Header />

      <div className="controls">
        <button
          className="btn ghost"
          onClick={() => {
            setCharacters([]);
            setNextUrl(FIRST_URL);
            fetchPage(FIRST_URL);
          }}
          disabled={loading}
        >
          Reiniciar
        </button>
      </div>

      {error && <p className="error">⚠️ {error}</p>}
      {!error && characters.length === 0 && loading && (
        <p className="loading">Cargando personajes…</p>
      )}

      <section className="grid">
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

      <div className="footer-actions">
        {nextUrl ? (
          <button className="btn" onClick={() => fetchPage(nextUrl)} disabled={loading}>
            {loading ? "Cargando…" : "Cargar más"}
          </button>
        ) : (
          characters.length > 0 && <p className="empty">No hay más personajes 🎉</p>
        )}
      </div>
    </main>
  );
}

export default App;
