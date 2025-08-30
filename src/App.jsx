import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";
import SeeYouSoon from "./SeeYouSoon.jsx";
import TaskCalendar from "./TaskCalendar.jsx";
import JapaneseGarden from "./JapaneseGarden.jsx";
import "./App.css";

// Collection of Koan stories that rotate daily
const koanStories = [
  {
    title: "The Sound of One Hand",
    story:
      "Two hands clap and there is a sound. What is the sound of one hand?",
    master: "Hakuin Ekaku",
  },
  {
    title: "Washing the Bowl",
    story:
      "A monk asked Joshu, 'I have just entered the monastery. Please teach me.' Joshu asked, 'Have you eaten your rice porridge?' The monk replied, 'I have eaten.' Joshu said, 'Then you had better wash your bowl.'",
    master: "Joshu Jushin",
  },
  {
    title: "The Original Face",
    story:
      "Show me your original face before your mother and father were born.",
    master: "Huineng",
  },
  {
    title: "Mu",
    story:
      "A monk asked Joshu, 'Does a dog have Buddha nature?' Joshu answered, 'Mu' (No/Nothing).",
    master: "Joshu Jushin",
  },
  {
    title: "The Flag and Wind",
    story:
      "Two monks were watching a flag flapping in the wind. One said, 'The flag is moving.' The other said, 'The wind is moving.' The sixth patriarch happened to be passing by. He told them, 'Not the wind, not the flag; mind is moving.'",
    master: "Huineng",
  },
  {
    title: "Gutei's Finger",
    story:
      "Gutei raised his finger whenever he was asked a question about Zen. A boy attendant began to imitate him in this way. When Gutei heard about the boy's mischief he seized him and cut off his finger. The boy cried and ran away. Gutei called and when the boy turned his head, Gutei raised up his own finger. In that instant the boy was enlightened.",
    master: "Master Gutei",
  },
  {
    title: "The Tea Cup",
    story:
      "A university professor went to visit a famous Zen master. While the master quietly served tea, the professor talked about Zen. The master poured the visitor's cup to the brim, and then kept pouring. The professor watched the overflow until he could no longer restrain himself. 'It's full! No more will go in!' The master replied, 'You are like this cup; you are full of your own opinions. How can I teach you until you first empty your cup?'",
    master: "Nan-in",
  },
];

// Authentication Context
const AuthContext = createContext();

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log("AuthProvider: Initializing with user:", user);

  useEffect(() => {
    console.log("AuthProvider: Checking for saved user");
    const savedUser = sessionStorage.getItem("currentUser");
    if (savedUser) {
      console.log("AuthProvider: Found saved user:", savedUser);
      setUser(JSON.parse(savedUser));
    } else {
      console.log("AuthProvider: No saved user found");
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    console.log("AuthProvider: Login attempt for username:", username);

    const mockUsers = [
      { id: 1, username: "admin", password: "password123", role: "admin" },
      { id: 2, username: "user", password: "user123", role: "user" },
      { id: 3, username: "demo", password: "demo", role: "user" },
    ];

    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
      };
      console.log("AuthProvider: Login successful, setting user:", userSession);
      setUser(userSession);
      sessionStorage.setItem("currentUser", JSON.stringify(userSession));
      return { success: true };
    }

    console.log("AuthProvider: Login failed - invalid credentials");
    return { success: false, error: "Invalid username or password" };
  };

  const logout = () => {
    console.log("AuthProvider: Logging out user:", user);
    setUser(null);
    sessionStorage.removeItem("currentUser");
    console.log("AuthProvider: User logged out, sessionStorage cleared");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  };

  console.log("AuthProvider: Current auth state:", {
    user: user,
    isAuthenticated: !!user,
    isLoading,
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Home/Landing Page Component
const HomePage = () => {
  const [dailyKoan, setDailyKoan] = useState(null);
  const navigate = useNavigate();

  console.log('HomePage: Component mounted');

  useEffect(() => {
    console.log('HomePage: Setting up daily koan');
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const koanIndex = dayOfYear % koanStories.length;
    setDailyKoan(koanStories[koanIndex]);
    console.log('HomePage: Daily koan set:', koanStories[koanIndex]);
  }, []);

  const handleNavigateToLogin = () => {
    console.log('HomePage: Navigating to login');
    navigate('/login');
  };

  const handleNavigateToGarden = () => {
    console.log('HomePage: Navigating to garden');
    navigate('/garden');
  };

  return (
    <div className="landing-page">
      <div className="title-section">
        <div className="floating-symbols">
          <span className="symbol symbol-1">☯</span>
          <span className="symbol symbol-2">⚮</span>
          <span className="symbol symbol-3">◯</span>
          <span className="symbol symbol-4">△</span>
          <span className="symbol symbol-5">▢</span>
        </div>
        
        <h1 className="main-title">
          <span className="title-word word-1">KOAN</span>
          <span className="title-word word-2">AGNOSTICS</span>
        </h1>
        
        <div className="subtitle-container">
          <p className="subtitle">Where questions become answers, and answers become questions</p>
          <div className="mystery-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className="koan-section">
        {dailyKoan && (
          <div className="daily-koan">
            <div className="koan-header">
              <h3>Today's Koan</h3>
              <div className="koan-divider"></div>
            </div>
            
            <div className="koan-content">
              <h4 className="koan-title">{dailyKoan.title}</h4>
              <p className="koan-story">{dailyKoan.story}</p>
              <p className="koan-master">— {dailyKoan.master}</p>
            </div>
            
            <div className="ripple-effect"></div>
          </div>
        )}
        
        <div className="login-link-container">
          <div className="action-buttons">
            <button 
              className="action-link garden-link" 
              onClick={handleNavigateToGarden}
            >
              Garden
              
            </button>
            
            <button 
              className="action-link login-link" 
              onClick={handleNavigateToLogin}
            >
              Login
              <span className="link-arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  console.log("ProtectedRoute: Checking authentication", {
    isAuthenticated,
    isLoading,
  });

  if (isLoading) {
    console.log("ProtectedRoute: Still loading, showing loading screen");
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 35%, #0f0f1e 100%)",
          color: "#ffffff",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: User not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User authenticated, rendering children");
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

// Login Route Component
const LoginRoute = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  console.log(
    "LoginRoute: Component mounted, isAuthenticated:",
    isAuthenticated
  );

  if (isAuthenticated) {
    console.log(
      "LoginRoute: User already authenticated, redirecting to dashboard"
    );
    return <Navigate to="/dashboard" replace />;
  }

  const handleLoginSuccess = (username, password) => {
    console.log("LoginRoute: Login attempt received:", { username });
    const result = login(username, password);
    if (result.success) {
      console.log("LoginRoute: Login successful, navigating to dashboard");
      navigate("/dashboard");
    } else {
      console.log("LoginRoute: Login failed:", result.error);
    }
    return result;
  };

  return <Login onLogin={handleLoginSuccess} />;
};

// Dashboard Route Component
const DashboardRoute = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log("DashboardRoute: Component mounted with user:", user);

  const handleLogout = () => {
    console.log("DashboardRoute: Logout button clicked");
    const username = user?.username;
    console.log("DashboardRoute: Storing username before logout:", username);

    logout();
    console.log(
      "DashboardRoute: User logged out, using setTimeout for navigation"
    );

    // Use setTimeout to ensure navigation happens after logout state settles
    setTimeout(() => {
      console.log("DashboardRoute: Delayed navigation to see-you-soon");
      navigate("/see-you-soon", { state: { username }, replace: true });
      console.log("DashboardRoute: Navigation called with state:", {
        username,
      });
    }, 0);
  };

  return <Dashboard user={user} onLogout={handleLogout} />;
};

// See You Soon Route Component
const SeeYouSoonRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  console.log("SeeYouSoonRoute: Component mounted");
  console.log("SeeYouSoonRoute: Location state:", location.state);
  console.log("SeeYouSoonRoute: Username from state:", username);

  const handleReturnHome = () => {
    console.log("SeeYouSoonRoute: Returning to home");
    navigate("/home");
  };

  return <SeeYouSoon username={username} onReturnHome={handleReturnHome} />;
};

// Task Calendar Component
// const TaskCalendar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   console.log("TaskCalendar: Component mounted with user:", user);

//   const handleLogout = () => {
//     console.log("TaskCalendar: Logout clicked");
//     const username = user?.username;
//     logout();
//     navigate("/see-you-soon", { state: { username } });
//   };

//   return (
//     <div className="task-calendar-placeholder">
//       <nav
//         style={{
//           padding: "1rem",
//           background: "linear-gradient(135deg, #64ffda 0%, #ff6b9d 100%)",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h1 style={{ margin: 0, color: "#0f0f1e" }}>Task Calendar</h1>
//         <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//           <span style={{ color: "#0f0f1e" }}>Welcome, {user?.username}</span>
//           <button
//             onClick={handleLogout}
//             style={{
//               padding: "0.5rem 1rem",
//               background: "rgba(15, 15, 30, 0.2)",
//               border: "none",
//               borderRadius: "0.5rem",
//               color: "#0f0f1e",
//               cursor: "pointer",
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </nav>
//       <div style={{ padding: "2rem", textAlign: "center" }}>
//         <h2 style={{ color: "#ffffff" }}>Your Task Calendar Will Go Here</h2>
//         <p style={{ color: "rgba(255, 255, 255, 0.7)" }}>
          
//         </p>
//         <p style={{ color: "rgba(255, 255, 255, 0.5)", marginTop: "2rem" }}>
//           User: {user?.username} | Role: {user?.role}
//         </p>
//       </div>
//     </div>
//   );
// };

// Main App Component
function App() {
  console.log("App: Component rendering");

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Temporary test route */}
            <Route
              path="/test-see-you-soon"
              element={
                <div
                  style={{
                    padding: "2rem",
                    color: "white",
                    background: "black",
                  }}
                >
                  <h1>Test Route Works</h1>
                  <p>If you see this, routing is working</p>
                </div>
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginRoute />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRoute />
                </ProtectedRoute>
              }
            />
            <Route path="/see-you-soon" element={<SeeYouSoonRoute />} />
            <Route path="/garden" element={<JapaneseGarden />} />
            <Route
              path="/taskCalendar"
              element={
                <ProtectedRoute>
                  <TaskCalendar />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export { useAuth };
export default App;

