export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="brand">
        <h1 className="logo" aria-label="Rick and Morty Characters Explorer">
          Rick <span className="emph">&</span> Morty <span className="emph">Explorer</span>
        </h1>
        <span className="tag">Portal UI</span>
      </div>
    </header>
  );
}
