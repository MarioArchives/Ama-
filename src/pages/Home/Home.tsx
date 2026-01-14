import { useEffect, useState } from "react";
import { FindUsSection } from "../../components/FindUsSection/FindUsSection";
import { Loading } from "../../components/Loading/Loading";
import "../../styles/common.css";
import "./Home.css";

export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);

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
                    <p className="eyebrow">Small-batch cosmetics from the Amazon to Britain</p>
                    <h1>Pure botanicals, made to be worn and tasted.</h1>
                    <p className="hero-copy">
                        Ama is an artisanal cosmetics studio sourcing Amazon-grown botanicals
                        and crafting them in Britain. Every formula is vegan, organic, and so
                        natural it can be eaten. Slow-made for skin, lips, and daily ritual.
                    </p>
                </div>
                <div className="hero-card">
                    <div className="hero-card-inner">
                        <p className="hero-card-title">Ama Essentials</p>
                        <p className="hero-card-copy">
                            Three edible-grade blends, finished in smoked glass.
                        </p>
                        <div className="hero-card-meta">
                            <span>From £42</span>
                            <span>Seasonal batches</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section find-us">
                <div className="section-header">
                    <p className="eyebrow">Find us</p>
                    <h2>Meet Ama in studios and slow-living shops.</h2>
                </div>
                <FindUsSection />
            </section>
        </>
    );
};
