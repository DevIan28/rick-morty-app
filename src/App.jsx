import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import CharacterCard from "./components/CharacterCard.jsx";
import CharacterModal from "./components/CharacterModal.jsx";
import SearchBar from "./components/SearchBar.jsx";
import "./styles.css";

const API = "https://rickandmortyapi.com/api/character";

function buildUrl({ page = 1, name = "", status = "all" } = {}) {
  const params = new URLSearchParams();
  params.set("page", page);
  if (name) params.set("name", name);
  if (status && status !== "all") params.set("status", status);
  return `${API}?${params.toString()}`;
}

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState({ name: "", status: "all" });

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchCharacters = useCallback(async ({ reset = false } = {}) => {
    try {
      setLoading(true);
      setError("");
      const targetPage = reset ? 1 : page;
      const url = buildUrl({ page: targetPage, ...query });
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) {
          setCharacters([]);
          setNext(null);
          setPage(1);
          throw new Error("No se encontraron resultados para esta búsqueda.");
        }
        throw new Error("No se pudo obtener personajes");
      }
      const data = await res.json();
      setCharacters((prev) => (reset ? data.results : [...prev, ...data.results]));
      setNext(data.info?.next ?? null);
      setPage(targetPage + 1);
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  }, [page, query]);

  // Carga inicial
  useEffect(() => {
    fetchCharacters({ reset: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch({ name, status }) {
    setQuery({ name: name.trim(), status });
    setPage(1);
    fetchCharacters({ reset: true });
  }

  return (
    <>
      {/* Fondo animado */}
      <div className="bg-scene" aria-hidden="true">
        <div className="portal"></div>
        <div className="stars"></div>
        <div className="stars2"></div>
      </div>

      <main className="container">
        <Header />

        <SearchBar
          defaultQuery={query.name}
          defaultStatus={query.status}
          onSearch={handleSearch}
        />

        {error && <p className="error">⚠️ {error}</p>}
        {!error && characters.length === 0 && loading && (
          <p className="loading">Cargando personajes…</p>
        )}

        <section className="grid" aria-live="polite">
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              image={c.image}
              name={c.name}
              species={c.species}
              status={c.status}
              onOpen={() => {
                setSelected(c);
                setOpen(true);
              }}
            />
          ))}
        </section>

        <div className="footer-actions">
          {next ? (
            <button className="btn" onClick={() => fetchCharacters()} disabled={loading}>
              {loading ? "Cargando…" : "Cargar más"}
            </button>
          ) : (
            characters.length > 0 && <p className="empty">No hay más personajes 🎉</p>
          )}
        </div>

        <CharacterModal
          open={open}
          onClose={() => setOpen(false)}
          character={selected}
        />
      </main>
    </>
  );
}
