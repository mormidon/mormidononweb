import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./JapaneseGarden.css";

// Collection of Japanese garden images that rotate daily
// Note: These are placeholder URLs - you'll need to replace with actual image URLs
const gardenImages = [
  {
    url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    title: "Zen Stone Garden",
    description:
      "A traditional karesansui (dry landscape garden) with carefully raked gravel and placed stones representing mountains and islands.",
    location: "Ryoan-ji Temple, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1490375427344-e402e32c5fd6?w=1200&q=80",
    title: "Bamboo Forest Path",
    description:
      "Sunlight filtering through towering bamboo creates a natural cathedral of green tranquility.",
    location: "Arashiyama Bamboo Grove, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200&q=80",
    title: "Cherry Blossom Garden",
    description:
      "Delicate sakura petals create a pink canopy over a peaceful garden pond with traditional wooden bridge.",
    location: "Maruyama Park, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=1200&q=80",
    title: "Temple Garden Reflection",
    description:
      "A serene pond reflects the golden pavilion and surrounding maple trees in perfect symmetry.",
    location: "Kinkaku-ji (Golden Pavilion), Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1200&q=80",
    title: "Moss Garden Sanctuary",
    description:
      "Ancient moss covers the ground like a green velvet carpet beneath towering cedar trees.",
    location: "Saiho-ji (Moss Temple), Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1570847140142-b1c5b8981c1e?w=1200&q=80",
    title: "Tea Garden Path",
    description:
      "A winding stone path leads through carefully manicured shrubs to a traditional tea house.",
    location: "Japanese Tea Garden, San Francisco",
  },
  {
    url: "https://images.unsplash.com/photo-1509736803152-7e3d4e3dca1f?w=1200&q=80",
    title: "Koi Pond Serenity",
    description:
      "Colorful koi fish swim peacefully among water lilies in a crystal-clear pond.",
    location: "Portland Japanese Garden, Oregon",
  },
  {
    url: "https://images.unsplash.com/photo-1551688831-ab5fe5ce8d3a?w=1200&q=80",
    title: "Maple Garden Autumn",
    description:
      "Fiery red maple leaves create a stunning contrast against dark pine trees and weathered stone lanterns.",
    location: "Tofuku-ji Temple, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=1200&q=80",
    title: "Waterfall Meditation",
    description:
      "A gentle waterfall cascades over ancient rocks into a peaceful pool surrounded by ferns and moss.",
    location: "Ginkaku-ji (Silver Pavilion), Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1534274867514-d5b47ef2edc3?w=1200&q=80",
    title: "Snow Garden Silence",
    description:
      "Fresh snow blankets the garden, creating a monochrome landscape of pure tranquility.",
    location: "Kenroku-en Garden, Kanazawa",
  },
  {
    url: "https://images.unsplash.com/photo-1524542555615-7199c93e06d4?w=1200&q=80",
    title: "Iris Garden Bloom",
    description:
      "Purple irises bloom beside a meandering stream, their reflections dancing in the gentle current.",
    location: "Meiji Jingu Inner Garden, Tokyo",
  },
  {
    url: "https://images.unsplash.com/photo-1580500550469-d2b57631e5c0?w=1200&q=80",
    title: "Pagoda Garden View",
    description:
      "A multi-story pagoda rises majestically above carefully pruned pine trees and stone pathways.",
    location: "Toji Temple, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1580070247012-dca71b2a9c88?w=1200&q=80",
    title: "Zen Bridge Crossing",
    description:
      "A simple wooden bridge arches gracefully over a still pond, surrounded by carefully placed stones.",
    location: "Shisendo Temple, Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&q=80",
    title: "Meditation Stone Circle",
    description:
      "Perfectly round stones are arranged in concentric circles within a sea of raked white gravel.",
    location: "Daisen-in Temple, Kyoto",
  },
];

const JapaneseGarden = ({ onReturnHome }) => {
  const [dailyGarden, setDailyGarden] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get daily garden image based on current date
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const gardenIndex = dayOfYear % gardenImages.length;
    setDailyGarden(gardenImages[gardenIndex]);

    // Trigger fade-in animation after a short delay
    const timer = setTimeout(() => setFadeIn(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    // Could implement fallback image here
  };

  const handleReturnHome = () => {
    if (onReturnHome) {
      onReturnHome();
    }
    navigate("/home");
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="japanese-garden-container">
      <div className="floating-petals">
        <span className="petal petal-1">🌸</span>
        <span className="petal petal-2">🍃</span>
        <span className="petal petal-3">🌸</span>
        <span className="petal petal-4">🍂</span>
        <span className="petal petal-5">🌸</span>
        <span className="petal petal-6">🍃</span>
      </div>

      <div className={`garden-content ${fadeIn ? "fade-in" : ""}`}>
        <header className="garden-header">
          <div className="header-ornament">
            <span>🏯</span>
          </div>
          <h1 className="garden-title">
            <span className="title-japanese">日本庭園</span>
            <span className="title-english">Japanese Garden</span>
          </h1>
          <p className="garden-subtitle">
            A daily journey through Japan&#39;s most beautiful gardens
          </p>
        </header>

        {dailyGarden && (
          <main className="garden-showcase">
            <div className="image-container">
              {imageLoading && (
                <div className="image-loading">
                  <div className="loading-spinner" />
                  <p>Loading today&#39;s garden...</p>
                </div>
              )}

              <img
                src={dailyGarden.url}
                alt={dailyGarden.title}
                className={`garden-image ${!imageLoading ? "loaded" : ""}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />

              <div className="image-overlay">
                <div className="overlay-content">
                  <h2 className="garden-image-title">{dailyGarden.title}</h2>
                  <p className="garden-location">{dailyGarden.location}</p>
                </div>
              </div>
            </div>

            <div className="garden-details">
              <div className="details-header">
                <h3>Today&#39;s Garden</h3>
                <div className="details-divider" />
              </div>

              <p className="garden-description">{dailyGarden.description}</p>

              <div className="zen-quote">
                <blockquote>
                  &quot;The garden is a mirror reflecting the depths of the
                  soul.&quot;
                </blockquote>
                <cite>— Japanese Garden Philosophy</cite>
              </div>
            </div>
          </main>
        )}

        <div className="garden-actions">
          <button
            className="action-link garden-link"
            onClick={handleReturnHome}
          >
            
            <span className="btn-text">Home</span>
          </button>

          <button
            className="action-link login-link"
            onClick={handleNavigateToLogin}
          >
            
            <span className="btn-text">Login</span>
          </button>
        </div>

        <footer className="garden-footer">
          <p>
            Each day brings a new perspective on the art of Japanese garden
            design
          </p>
        </footer>
      </div>
    </div>
  );
};

JapaneseGarden.propTypes = {
  onReturnHome: PropTypes.func,
};

JapaneseGarden.defaultProps = {
  onReturnHome: null,
};

export default JapaneseGarden;
