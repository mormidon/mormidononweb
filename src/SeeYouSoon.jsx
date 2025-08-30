import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./SeeYouSoon.css";

// Collection of Eastern wisdom quotes that rotate daily
const easternQuotes = [
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote:
      "Do not believe in anything simply because you have heard it. Do not believe in anything simply because it is spoken and rumored by many.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote:
      "When you realize there is nothing lacking, the whole world belongs to you.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote:
      "The sage does not attempt anything very big, and thus achieves greatness.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote:
      "Three things cannot be long hidden: the sun, the moon, and the truth.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote: "Those who flow as life flows know they need no other force.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote:
      "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote: "Nature does not hurry, yet everything is accomplished.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote: "Silence is a source of great strength.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote:
      "Better than a thousand hollow words, is one word that brings peace.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote:
      "The wise find pleasure in water; the virtuous find pleasure in hills.",
    author: "Confucius",
    tradition: "Confucianism",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    tradition: "Confucianism",
  },
  {
    quote:
      "The superior man understands what is right; the inferior man understands what will sell.",
    author: "Confucius",
    tradition: "Confucianism",
  },
  {
    quote:
      "When we see men of worth, we should think of equaling them; when we see men of a contrary character, we should turn inwards and examine ourselves.",
    author: "Confucius",
    tradition: "Confucianism",
  },
  {
    quote:
      "If you want to awaken all of humanity, then awaken all of yourself.",
    author: "Lao Tzu",
    tradition: "Taoism",
  },
  {
    quote:
      "Hatred is never appeased by hatred in this world. By non-hatred alone is hatred appeased. This is a law eternal.",
    author: "Buddha",
    tradition: "Buddhism",
  },
  {
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    tradition: "Chinese Wisdom",
  },
  {
    quote: "When the student is ready, the teacher will appear.",
    author: "Buddhist Proverb",
    tradition: "Buddhism",
  },
  {
    quote: "Fall seven times, rise eight.",
    author: "Japanese Proverb",
    tradition: "Japanese Wisdom",
  },
  {
    quote: "The bamboo that bends is stronger than the oak that resists.",
    author: "Japanese Proverb",
    tradition: "Japanese Wisdom",
  },
  {
    quote:
      "A diamond is merely a lump of coal that handled stress exceptionally well.",
    author: "Hindu Proverb",
    tradition: "Hindu Wisdom",
  },
  {
    quote:
      "The lotus flower blooms most beautifully from the deepest and thickest mud.",
    author: "Buddhist Proverb",
    tradition: "Buddhism",
  },
  {
    quote:
      "Yesterday is history, tomorrow is a mystery, today is a gift, which is why we call it the present.",
    author: "Zen Proverb",
    tradition: "Zen Buddhism",
  },
  {
    quote:
      "You are perfect as you are, and you could use a little improvement.",
    author: "Zen Saying",
    tradition: "Zen Buddhism",
  },
  {
    quote: "The obstacle is the path.",
    author: "Zen Proverb",
    tradition: "Zen Buddhism",
  },
  {
    quote: "Let go or be dragged.",
    author: "Zen Proverb",
    tradition: "Zen Buddhism",
  },
  {
    quote: "The river that survives is the one that bends.",
    author: "Chinese Proverb",
    tradition: "Chinese Wisdom",
  },
  {
    quote:
      "A society grows great when old men plant trees whose shade they know they shall never sit in.",
    author: "Greek Proverb (Eastern influenced)",
    tradition: "Ancient Wisdom",
  },
];

const SeeYouSoon = ({ username, onReturnHome }) => {
  const [dailyQuote, setDailyQuote] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get daily quote based on current date
    const today = new Date();
    const dayOfYear = Math.floor(
      (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );
    const quoteIndex = dayOfYear % easternQuotes.length;
    setDailyQuote(easternQuotes[quoteIndex]);

    // Trigger fade-in animation
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleReturnHome = () => {
    if (onReturnHome) {
      onReturnHome();
    }
    navigate("/home");
  };

  const handleLoginAgain = () => {
    navigate("/login");
  };

  return (
    <div className="see-you-soon-container">
      <div className="see-you-soon-content">
        <div className="floating-symbols">
          <span className="symbol symbol-1">🕉️</span>
          <span className="symbol symbol-2">☸️</span>
          <span className="symbol symbol-3">☯</span>
          <span className="symbol symbol-4">🪷</span>
          <span className="symbol symbol-5">⚮</span>
          <span className="symbol symbol-6">◯</span>
        </div>

        <div className={`farewell-section ${fadeIn ? "fade-in" : ""}`}>
          <div className="farewell-header">
            <div className="lotus-icon">
              <span>🪷</span>
            </div>
            <h1 className="farewell-title">
              <span className="title-word">See You Soon</span>
              {username && (
                <span className="username-highlight">{username}</span>
              )}
            </h1>
            <p className="farewell-subtitle">
              May your path be filled with wisdom and peace
            </p>
          </div>

          {dailyQuote && (
            <div className="wisdom-section">
              <div className="quote-container">
                <div className="quote-header">
                  <h3>Today&apos;s Eastern Wisdom</h3>
                  <div className="quote-divider" />
                </div>

                <div className="quote-content">
                  <blockquote className="daily-quote">
                    &quot;{dailyQuote.quote}&quot;
                  </blockquote>
                  <div className="quote-attribution">
                    <span className="quote-author">— {dailyQuote.author}</span>
                    <span className="quote-tradition">
                      {dailyQuote.tradition}
                    </span>
                  </div>
                </div>

                <div className="ripple-effect" />
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button
              className="action-button primary"
              onClick={handleReturnHome}
            >
              Home
              
            </button>

            <button
              className="action-button secondary"
              onClick={handleLoginAgain}
            >
              Login
              
            </button>
          </div>

          <div className="blessing-text">
            <p>Until we meet again on the path of enlightenment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
SeeYouSoon.propTypes = {
  username: PropTypes.string,
  onReturnHome: PropTypes.func,
};

SeeYouSoon.defaultProps = {
  username: null,
  onReturnHome: null,
};

export default SeeYouSoon;
