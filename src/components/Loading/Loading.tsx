import "./Loading.css";

export const Loading = () => {
  return (
    <div className="loading" role="status" aria-live="polite">
      <svg
        className="loading-mark"
        viewBox="0 -40 200 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g id="dropper" className="loading-dropper">
          <path
            d="
              M100 16
              C78 16 66 34 66 50
              C66 66 78 84 100 84
              C122 84 134 66 134 50
              C134 34 122 16 100 16Z
            "
            fill="currentColor"
          />
          <rect x="66" y="84" width="68" height="20" rx="8" fill="currentColor" />
          <rect x="90" y="104" width="20" height="22" rx="10" fill="currentColor" />
          <rect x="97" y="126" width="6" height="90" rx="3" fill="currentColor" />
        </g>
        <path
          d="
            M48 126
            C48 112 60 104 76 104
            H124
            C140 104 152 112 152 126
            V208
            C152 230 130 244 100 244
            C70 244 48 230 48 208
            Z
          "
          fill="currentColor"
        />
        <rect className="loading-label" x="56" y="156" width="88" height="54" rx="12" />
        <rect x="70" y="170" width="60" height="4" rx="2" fill="currentColor" opacity="0.35" />
        <rect x="70" y="180" width="48" height="4" rx="2" fill="currentColor" opacity="0.25" />
        <rect x="70" y="190" width="54" height="4" rx="2" fill="currentColor" opacity="0.2" />
      </svg>
      <span className="loading-text">Loading the collection</span>
    </div>
  )
};
