export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="brand">
        {/* Icono estilo Rick & Morty (portal + alien) */}
        <svg
          className="logo-icon"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="g" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#3bf686" />
              <stop offset="60%" stopColor="#00ffd5" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle cx="32" cy="32" r="18" fill="url(#g)" />
          <circle cx="32" cy="28" r="8" fill="#0b1a24" stroke="#a1ff0a" strokeWidth="2" />
          <circle cx="28" cy="26.5" r="1.8" fill="#a1ff0a" />
          <circle cx="36" cy="26.5" r="1.8" fill="#a1ff0a" />
          <path d="M27 31 q5 4 10 0" fill="none" stroke="#a1ff0a" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <h1 className="logo" aria-label="Rick and Morty Characters Explorer">
          Rick <span className="emph">&</span> Morty <span className="emph">Explorer</span>
        </h1>
        {/* Quitado el texto “Portal UI” */}
      </div>
    </header>
  );
}
