import { useState, useEffect } from "react";

export default function SearchBar({ defaultQuery = "", defaultStatus = "all", onSearch }) {
  const [name, setName] = useState(defaultQuery);
  const [status, setStatus] = useState(defaultStatus);

  // Submit con Enter
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Enter") {
        onSearch?.({ name, status });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [name, status, onSearch]);

  return (
    <div className="searchbar">
      <input
        className="input"
        placeholder="Buscar por nombre… (p. ej., Rick)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        className="select"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="all">All status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
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
