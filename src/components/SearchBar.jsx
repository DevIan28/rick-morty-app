import { useState, useEffect } from "react";

export default function SearchBar({ defaultQuery = "", defaultStatus = "all", onSearch }) {
  const [name, setName] = useState(defaultQuery);
  const [status, setStatus] = useState(defaultStatus);

  // Enter global para buscar
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Enter") onSearch?.({ name, status });
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [name, status, onSearch]);

  return (
    <div className="toolbar" role="search">
      <div className="search" aria-label="Buscar personajes">
        <svg className="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.3-4.3m1.6-5.3a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <input
          placeholder="Buscar por nombre… ej. Rick, Morty, Summer"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Nombre del personaje"
        />
      </div>

      <div className="segment" role="tablist" aria-label="Filtro de estado">
        {[
          { key: "all", label: "All" },
          { key: "alive", label: "Alive 🟢" },
          { key: "dead", label: "Dead 🔴" },
          { key: "unknown", label: "Unknown ⚪" },
        ].map((opt) => (
          <button
            key={opt.key}
            role="tab"
            aria-selected={status === opt.key}
            className={status === opt.key ? "active" : ""}
            onClick={() => setStatus(opt.key)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <button className="btn" onClick={() => onSearch?.({ name, status })}>
        Buscar
      </button>
      <button
        className="btn ghost"
        onClick={() => {
          setName("");
          setStatus("all");
          onSearch?.({ name: "", status: "all" });
        }}
      >
        Limpiar
      </button>
    </div>
  );
}
