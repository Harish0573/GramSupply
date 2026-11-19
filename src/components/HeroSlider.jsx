import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./HeroSlider.css";

const slides = [
  {
    image: "/categories/lighting.jpg",
    title: "Light up every lane",
    text: "Solar street lights and LED fittings for villages and campuses",
    button: "Shop lighting",
    to: "/products?category=Street%20%26%20Outdoor%20Lighting",
  },
  {
    image: "/categories/cctv.jpg",
    title: "Keep public places safe",
    text: "CCTV cameras and security systems for schools and offices",
    button: "Shop CCTV",
    to: "/products?category=CCTV%20%26%20Security",
  },
  {
    image: "/categories/water.jpg",
    title: "Clean water for everyone",
    text: "RO plants, water purifiers and storage tanks",
    button: "Shop water systems",
    to: "/products?category=Water%20Systems",
  },
  {
    image: "/categories/cleaning.jpg",
    title: "A cleaner village starts here",
    text: "Dustbins, trolleys and sanitation supplies",
    button: "Shop cleaning",
    to: "/products?category=Cleaning%20%26%20Sanitation",
  },
  {
    image: "/categories/furniture.jpg",
    title: "Furnish schools and offices",
    text: "Chairs, tables and cupboards built to last",
    button: "Shop furniture",
    to: "/products?category=Furniture",
  },
  {
    image: "/categories/computers.jpg",
    title: "Buying in bulk?",
    text: "Send us a list and get prices for large orders",
    button: "Send an enquiry",
    to: "/enquiry",
  },
];

const DELAY = 4500;

function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [perView, setPerView] = useState(() =>
    window.innerWidth < 760 ? 1 : 2,
  );

  // two banners side by side on desktop, one on phones
  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth < 760 ? 1 : 2);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const total = slides.length;
  // the first banners are repeated at the end so the slider can keep moving
  // forward forever without jumping back to the start
  const track = [...slides, ...slides.slice(0, perView)];

  const next = useCallback(() => {
    setAnimate(true);
    setIndex((i) => i + 1);
  }, []);

  // move one banner at a time, unless the visitor asked for less motion
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const timer = setInterval(next, DELAY);
    return () => clearInterval(timer);
  }, [next]);

  const prev = () => {
    if (index <= 0) {
      // jump (unseen) to the repeated first banner, then slide back one
      setAnimate(false);
      setIndex(total);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          setIndex(total - 1);
        }),
      );
    } else {
      setAnimate(true);
      setIndex((i) => i - 1);
    }
  };

  // once the copy of the first banner is on screen, quietly reset to the real one
  const onTransitionEnd = () => {
    if (index >= total) {
      setAnimate(false);
      setIndex(0);
    }
  };

  // turn the animation back on after the silent reset has been painted
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimate(true)),
    );
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const activeDot = index % total;

  return (
    <section
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Featured departments"
    >
      <div className="hero-viewport">
        <div
          className="hero-track"
          style={{
            "--i": index,
            transition: animate ? undefined : "none",
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {track.map((slide, n) => (
            <article
              className="hero-slide"
              key={`${slide.title}-${n}`}
              aria-roledescription="slide"
              aria-hidden={n >= total}
              aria-label={`${(n % total) + 1} of ${total}`}
            >
              <img
                src={slide.image}
                alt=""
                loading={n < 2 ? "eager" : "lazy"}
              />
              <div className="hero-shade" />
              <div className="hero-text">
                <h2>{slide.title}</h2>
                <p>{slide.text}</p>
                <Link to={slide.to} tabIndex={n >= total ? -1 : undefined}>
                  {slide.button}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button type="button" className="hero-arrow left" onClick={prev} aria-label="Previous banner">
        <ChevronLeft size={30} />
      </button>
      <button type="button" className="hero-arrow right" onClick={next} aria-label="Next banner">
        <ChevronRight size={30} />
      </button>

      <div className="hero-dots">
        {slides.map((_, n) => (
          <button
            key={n}
            className={n === activeDot ? "on" : ""}
            onClick={() => {
              setAnimate(true);
              setIndex(n);
            }}
            aria-label={`Go to banner ${n + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
