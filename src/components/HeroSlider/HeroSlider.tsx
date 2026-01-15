import { useEffect, useState } from "react";
import "./HeroSlider.css";

type Slide = {
    src: string;
    alt: string;
};

type HeroSliderProps = {
    slides: Slide[];
    intervalMs?: number;
};

export const HeroSlider = ({ slides, intervalMs = 4500 }: HeroSliderProps) => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (slides.length < 2) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, intervalMs);

        return () => window.clearInterval(interval);
    }, [intervalMs, slides.length]);

    return (
        <div className="hero-slider" aria-label="Featured botanicals">
            <div className="hero-slider-track">
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`hero-slide${index === activeSlide ? " is-active" : ""}`}
                    >
                        <img src={slide.src} alt={slide.alt} />
                    </div>
                ))}
            </div>
            {slides.length > 1 && (
                <div className="hero-slider-dots" role="tablist">
                    {slides.map((slide, index) => (
                        <button
                            key={`${slide.src}-dot`}
                            type="button"
                            className={index === activeSlide ? "is-active" : undefined}
                            onClick={() => setActiveSlide(index)}
                            aria-label={`Show ${slide.alt}`}
                            aria-pressed={index === activeSlide}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
