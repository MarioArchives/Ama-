import "./Loading.css";

export const Loading = () => {
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
            M60 120
            Q60 100 80 100
            H120
            Q140 100 140 120
            V240
            Q140 260 120 260
            H80
            Q60 260 60 240
            Z
          "
        />
        <path className="loading-outline" d="M75 100 V85 H125 V100" />
        <path className="loading-outline" d="M75 90 H125" />
        <g id="dropper" className="loading-dropper">
          <path
            className="loading-outline"
            d="
              M85 40
              Q100 20 115 40
              Q115 65 100 70
              Q85 65 85 40
              Z
            "
          />
          <path className="loading-outline" d="M80 70 H120 V90 H80 Z" />
          <path className="loading-outline" d="M100 90 V160" />
          <path
            className="loading-outline"
            d="
              M94 168
              Q100 174 106 168
              Q100 162 94 168
              Z
            "
          />
        </g>
      </svg>
      <span className="loading-text">Loading the collection</span>
    </div>
  )
};
