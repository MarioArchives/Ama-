function Loading() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <svg
        className="loading-mark"
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          className="loading-outline"
          d="
            M62 120
            Q62 104 80 104
            H120
            Q138 104 138 120
            V236
            Q138 252 120 252
            H80
            Q62 252 62 236
            Z
          "
        />
        <path className="loading-outline" d="M78 104 V88 H122 V104" />
        <path className="loading-outline" d="M78 92 H122" />
        <g id="dropper" className="loading-dropper">
          <path
            className="loading-outline"
            d="
              M88 42
              Q100 26 112 42
              V58
              Q112 66 100 70
              Q88 66 88 58
              Z
            "
          />
          <path className="loading-outline" d="M82 70 H118 V88 H82 Z" />
          <rect className="loading-outline" x="94" y="88" width="12" height="78" rx="6" />
          <path className="loading-outline" d="M92 172 Q100 178 108 172" />
        </g>
      </svg>
      <span className="loading-text">Loading the collection</span>
    </div>
  )
}

export default Loading
