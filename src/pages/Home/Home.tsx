import { useEffect, useState } from "react";
import { ImageSlider } from "../../components/ImageSlider/ImageSlider";
import { KeyFeatures } from "../../components/KeyFeatures/KeyFeatures";
import { Loading } from "../../components/Loading/Loading";
import "../../styles/common.css";
import "./Home.css";

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

    const slides = [
        {
            src: "/calendula.png",
            alt: "Calendula botanicals",
            caption: "No overpowering scents."
        },
        {
            src: "/Sacha inchi.png",
            alt: "Sacha inchi seeds",
            caption: "Just natural."
        },
        {
            src: "/cacay.png",
            alt: "Cacay oil",
            caption: "Just real."
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
            <section className="intro">
                <div className="intro-content">
                    <h1>Effective, natural, and safe</h1>
                    <ImageSlider slides={slides} />
                    <p className="intro-copy">
                        Ama is a skincare studio sourcing botanicals grown in Lancaster, England and the Colombian Amazon. Our oils are rich in natural retinol, vitamins A & E, omegas, essential fatty acids, flavonoids and carotenoids. Slow-made for healthy skin, lips, hair and daily ritual.
                    </p>
                    <p className="intro-copy">
                        Each oil is created in small batches using only high-quality flowers and seeds. Vegan, unrefined, free from synthetic additives, community-based and fully traceable. Our products are so natural they can be eaten, and are laboratory-tested for safety and efficacy.
                    </p>
                    <p className="intro-copy">
                        Our oils absorb quickly, delivering deep hydration and nourishment to skin, hair and nails. The result is visibly healthier and more resilient beauty. Rooted in nature, backed by science.
                    </p>

                </div>
            </section>

            <KeyFeatures />


        </>
    );
};
