import { useEffect, useState } from "react";
import "./ImageSlider.css";

type Slide = {
    src: string;
    alt: string;
    caption?: string;
};

type ImageSliderProps = {
    slides: Slide[];
    intervalMs?: number;
};

export const ImageSlider = ({ slides, intervalMs = 4500 }: ImageSliderProps) => {
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
        <div className="image-slider" aria-label="Featured botanicals">
            <div className="image-slider-track">
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        className={`image-slide${index === activeSlide ? " is-active" : ""}`}
                    >
                        <img src={slide.src} alt={slide.alt} />
                        {slide.caption && (
                            <span className="image-slide-caption">{slide.caption}</span>
                        )}
                    </div>
                ))}
            </div>
            {slides.length > 1 && (
                <div className="image-slider-dots" role="tablist">
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
