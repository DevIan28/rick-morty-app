import { useEffect } from "react";

function Row({ label, children }) {
  return (
    <div className="row">
      <span className="row-label">{label}</span>
      <div className="row-value">{children || <em>—</em>}</div>
    </div>
  );
}

export default function CharacterModal({ open, onClose, character }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !character) return null;

  const statusClass =
    character.status?.toLowerCase() === "alive"
      ? "alive"
      : character.status?.toLowerCase() === "dead"
      ? "dead"
      : "unknown";

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${character.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">×</button>

        <div className="modal-header">
          <div className="modal-avatar-wrap" aria-hidden="true">
            <div className="modal-ring"></div>
            <img src={character.image} alt="" className="modal-avatar" />
          </div>
          <div>
            <h2 className="modal-title">{character.name}</h2>
            <p className="modal-sub">
              <strong>{character.species}</strong> &nbsp;•&nbsp; {character.gender}
            </p>
            <div className="pills" style={{ marginTop: 10 }}>
              <span className="pill"><span className={`dot ${statusClass}`} />{character.status}</span>
              {character.type ? <span className="pill">{character.type}</span> : null}
            </div>
          </div>
        </div>

        <div className="modal-body">
          <Row label="ID">{character.id}</Row>
          <Row label="Origin">
            {character.origin?.name}
            {character.origin?.url ? (
              <> — <a href={character.origin.url} target="_blank" rel="noreferrer">API link</a></>
            ) : null}
          </Row>
          <Row label="Last Location">
            {character.location?.name}
            {character.location?.url ? (
              <> — <a href={character.location.url} target="_blank" rel="noreferrer">API link</a></>
            ) : null}
          </Row>
          <Row label="Image">
            <a href={character.image} target="_blank" rel="noreferrer">Abrir imagen</a>
          </Row>
          <Row label="Episodes">
            <div className="episodes">
              {character.episode?.map((ep) => (
                <a key={ep} href={ep} target="_blank" rel="noreferrer" className="episode-link">
                  EP {ep.split("/").pop()}
                </a>
              ))}
            </div>
          </Row>
          <Row label="Self API URL">
            <a href={character.url} target="_blank" rel="noreferrer">{character.url}</a>
          </Row>
          <Row label="Creado">{new Date(character.created).toLocaleString()}</Row>
        </div>
      </div>
    </div>
  );
}
