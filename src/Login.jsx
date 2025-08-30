import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Lock, User, Eye, EyeOff, Home, TreePine } from "lucide-react";
import "./Login.css";

// Simple Login Form Component that works with App.jsx AuthProvider
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (onLogin) {
        const result = onLogin(username, password);
        if (!result.success) {
          setError(result.error);
        }
        // If success, the parent component (App.jsx) handles navigation
      } else {
        setError("Login function not available");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToHome = () => {
    navigate("/home");
  };

  const handleNavigateToGarden = () => {
    navigate("/garden");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <Lock />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please sign in to your account</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input password-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <div>
          <div className="navigation-section">
            <p className="navigation-title">Or explore without logging in:</p>
            <div className="navigation-buttons">
              <button
                className="action-link login-link"
                onClick={handleNavigateToHome}
              >
                <span>Home</span>
              </button>

              <button
                className="action-link garden-link"
                onClick={handleNavigateToGarden}
              >
                <span>Garden</span>
              </button>
            </div>
          </div>
        </div>

        {/* <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <div className="demo-list">
            <div>
              Admin: <span className="demo-cred">admin / password123</span>
            </div>
            <div>
              User: <span className="demo-cred">user / user123</span>
            </div>
            <div>
              Demo: <span className="demo-cred">demo / demo</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

// PropTypes for Login
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
