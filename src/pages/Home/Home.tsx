import { useEffect, useState } from "react";
import { FindUsSection } from "../../components/FindUsSection/FindUsSection";
import { HeroSlider } from "../../components/HeroSlider/HeroSlider";
import { KeyFeatures } from "../../components/KeyFeatures/KeyFeatures";
import { Loading } from "../../components/Loading/Loading";
import "../../styles/common.css";
import "./Home.css";

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    const slides = [
        {
            src: "/calenduala_image.png",
            alt: "Calendula botanicals",
        },
        {
            src: "/sacha_inchi_image.png",
            alt: "Sacha inchi seeds",
        },
    ];

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => window.clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <section className="hero">
                <div className="hero-content">
                    <h1>Effective natural, safe</h1>
                    <HeroSlider slides={slides} />
                    <p className="hero-copy">
                        Ama is a skincare studio sourcing botanicals grown in Lancaster, England and the Colombian Amazon. Our oils are rich in natural retinol, vitamins A & E, omegas, essential fatty acids, flavonoids and carotenoids. Slow-made for healthy skin, lips, hair and daily ritual.
                    </p>
                    <p className="hero-copy">
                        Each oil is created in small batches using only high-quality flowers and seeds. Vegan, unrefined, free from synthetic additives, community-based and fully traceable. Our products are so natural they can be eaten, and are laboratory-tested for safety and efficacy.
                    </p>
                </div>
            </section>

            <KeyFeatures />

            <section className="section tagline">
                <div className="section-header">
                    <h2>No overpowering scents. Just natural. Just real.</h2>
                    <p>
                        Our oils absorb quickly, delivering deep hydration and nourishment to skin, hair and nails. The result is visibly healthier and more resilient beauty. Rooted in nature, backed by science.
                    </p>
                </div>
            </section>

        </>
    );
};
