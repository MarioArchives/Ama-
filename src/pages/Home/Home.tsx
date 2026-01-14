import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading/Loading";
import "../../styles/common.css";
import "./Home.css";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Boutique oils crafted in small, slow batches</p>
          <h1>Dark green depth. Black glass elegance.</h1>
          <p className="hero-copy">
            Slik curates ritual-ready botanical oils, distilled with intention and
            a reverence for the night garden. Layer, massage, or mist. Every drop
            is designed to feel like velvet.
          </p>
        </div>
        <div className="hero-card">
          <div className="hero-card-inner">
            <p className="hero-card-title">Signature Set</p>
            <p className="hero-card-copy">
              Three blends, sealed in black glass, finished with deep green wax.
            </p>
            <div className="hero-card-meta">
              <span>From $68</span>
              <span>Limited run</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section find-us">
        <div className="section-header">
          <p className="eyebrow">Find us</p>
          <h2>See where Slik oils live around the city.</h2>
        </div>
        <div className="find-us-grid">
          <div className="find-us-map" role="img" aria-label="Map of Slik stockists">
            <div className="map-rings" aria-hidden="true" />
            <div className="map-pin pin-one" aria-hidden="true" />
            <div className="map-pin pin-two" aria-hidden="true" />
            <div className="map-pin pin-three" aria-hidden="true" />
          </div>
          <div className="find-us-list">
            <div className="find-us-card">
              <p className="find-us-name">Nocturne Apothecary</p>
              <p className="find-us-meta">SoHo • 132 Mercer Street</p>
            </div>
            <div className="find-us-card">
              <p className="find-us-name">Atelier Row</p>
              <p className="find-us-meta">West Village • 58 Grove Street</p>
            </div>
            <div className="find-us-card">
              <p className="find-us-name">Maison Ritual</p>
              <p className="find-us-meta">TriBeCa • 19 Franklin Street</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
