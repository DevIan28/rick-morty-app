import { useEffect } from "react";

function Row({ label, children }) {
  return (
    <div className="row">
      <span className="row-label">{label}</span>
      <div className="row-value">{children || <em>No data</em>}</div>
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
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>

        <div className="modal-header">
          <img src={character.image} alt={character.name} className="modal-avatar" />
          <div>
            <h2 className="modal-title">{character.name}</h2>
            <div className="pills">
              <span className="pill">
                <span className={`dot ${statusClass}`} />
                {character.status}
              </span>
              <span className="pill">{character.species}</span>
              {character.type ? <span className="pill">{character.type}</span> : null}
              <span className="pill">{character.gender}</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <Row label="ID">{character.id}</Row>
          <Row label="Species">{character.species}</Row>
          <Row label="Status">{character.status}</Row>
          <Row label="Type">{character.type || "—"}</Row>
          <Row label="Gender">{character.gender}</Row>
          <Row label="Origin">
            {character.origin?.name}
            {character.origin?.url ? (
              <>
                {" "}
                — <a href={character.origin.url} target="_blank" rel="noreferrer">API link</a>
              </>
            ) : null}
          </Row>
          <Row label="Last Location">
            {character.location?.name}
            {character.location?.url ? (
              <>
                {" "}
                — <a href={character.location.url} target="_blank" rel="noreferrer">API link</a>
              </>
            ) : null}
          </Row>
          <Row label="Image">
            <a href={character.image} target="_blank" rel="noreferrer">
              Open image
            </a>
          </Row>
          <Row label="Episode count">{character.episode?.length}</Row>
          <Row label="Episodes (URLs)">
            <div className="episodes">
              {character.episode?.map((ep) => (
                <a key={ep} href={ep} target="_blank" rel="noreferrer" className="episode-link">
                  {ep.split("/").pop()}
                </a>
              ))}
            </div>
          </Row>
          <Row label="Self API URL">
            <a href={character.url} target="_blank" rel="noreferrer">
              {character.url}
            </a>
          </Row>
          <Row label="Created">{new Date(character.created).toLocaleString()}</Row>
        </div>
      </div>
    </div>
  );
}
