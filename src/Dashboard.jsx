import PropTypes from "prop-types";
import {
  Shield,
  LogOut,
  User,
  Calendar,
  Settings,
  BarChart3,
  Users,
  Lock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
  };

  const navigateToTaskCalendar = () => {
    navigate("/taskCalendar");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-left">
            <Shield className="nav-logo" />
            <h1 className="nav-title">KOAN Agnostics Dashboard</h1>
          </div>
          <div className="nav-right">
            <span className="welcome-text">
              Welcome, <span className="username">{user?.username}</span>
            </span>
            <span
              className={`role-badge ${
                user?.role === "admin" ? "admin-role" : "user-role"
              }`}
            >
              {user?.role}
            </span>
            <button onClick={handleLogout} className="logout-button">
              <LogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="welcome-section">
            <div className="welcome-header">
              <div className="welcome-icon">
                <User />
              </div>
              <div className="welcome-info">
                <h2 className="welcome-title">Welcome to Your Dashboard</h2>
                <p className="welcome-subtitle">
                  Your gateway to contemplation and productivity
                </p>
              </div>
            </div>

            <div className="session-info">
              <h3 className="session-title">Session Information</h3>
              <div className="session-grid">
                <div className="session-item">
                  <span className="session-label">User ID:</span>
                  <span className="session-value">{user?.id}</span>
                </div>
                <div className="session-item">
                  <span className="session-label">Username:</span>
                  <span className="session-value">{user?.username}</span>
                </div>
                <div className="session-item">
                  <span className="session-label">Role:</span>
                  <span className="session-value">{user?.role}</span>
                </div>
                <div className="session-item">
                  <span className="session-label">Status:</span>
                  <span className="session-value authenticated">
                    Authenticated
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div
              className="dashboard-card clickable"
              onClick={navigateToTaskCalendar}
            >
              <div className="card-header">
                <Calendar className="card-icon" />
                <h3 className="card-title">Task Calendar</h3>
              </div>
              <p className="card-description">
                Manage your daily tasks and track your progress with the
                mystical task calendar
              </p>
              <div className="card-action">
                <span>Open Calendar →</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <User className="card-icon" />
                <h3 className="card-title">Profile Settings</h3>
              </div>
              <p className="card-description">
                Customize your profile and manage your account preferences
              </p>
              <div className="card-action">
                <span>Manage Profile →</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <BarChart3 className="card-icon" />
                <h3 className="card-title">Progress Analytics</h3>
              </div>
              <p className="card-description">
                View detailed analytics of your task completion and productivity
                patterns
              </p>
              <div className="card-action">
                <span>View Analytics →</span>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <Settings className="card-icon" />
                <h3 className="card-title">Preferences</h3>
              </div>
              <p className="card-description">
                Configure your dashboard settings and notification preferences
              </p>
              <div className="card-action">
                <span>Configure →</span>
              </div>
            </div>

            {user?.role === "admin" && (
              <>
                <div className="dashboard-card admin-card">
                  <div className="card-header">
                    <Users className="card-icon" />
                    <h3 className="card-title">User Management</h3>
                  </div>
                  <p className="card-description">
                    Manage users, roles, and permissions across the platform
                  </p>
                  <div className="card-action">
                    <span>Manage Users →</span>
                  </div>
                </div>

                <div className="dashboard-card admin-card">
                  <div className="card-header">
                    <Lock className="card-icon" />
                    <h3 className="card-title">System Admin</h3>
                  </div>
                  <p className="card-description">
                    Access advanced system settings and administrative tools
                  </p>
                  <div className="card-action">
                    <span>Admin Panel →</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="user-info-panel">
            <div className="user-card">
              <div className="user-avatar">
                <User />
              </div>
              <div className="user-details">
                <h3 className="user-name">{user?.username}</h3>
                <p className="user-role-text">
                  {user?.role === "admin"
                    ? "System Administrator"
                    : user?.role === "user"
                    ? "Standard User"
                    : "Demo User"}
                </p>
                <div className="user-stats">
                  <div className="stat-item">
                    <span className="stat-label">Account Type:</span>
                    <span className={`stat-value ${user?.role}`}>
                      {user?.role}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Access Level:</span>
                    <span className="stat-value">
                      {user?.role === "admin"
                        ? "Full Access"
                        : "Standard Access"}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Login Time:</span>
                    <span className="stat-value">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h3 className="section-title">Quick Actions</h3>
            <div className="actions-grid">
              <button
                className="action-button primary"
                onClick={navigateToTaskCalendar}
              >
                <Calendar />
                <span>Open Task Calendar</span>
              </button>
              <button className="action-button secondary">
                <Settings />
                <span>Settings</span>
              </button>
              <button className="action-button secondary">
                <BarChart3 />
                <span>View Reports</span>
              </button>
              <button className="action-button danger" onClick={handleLogout}>
                <LogOut />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// PropTypes validation
Dashboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    username: PropTypes.string.isRequired,
    role: PropTypes.oneOf(["admin", "user", "demo"]).isRequired,
  }),
  onLogout: PropTypes.func,
};

// Default props
Dashboard.defaultProps = {
  user: null,
  onLogout: null,
};

export default Dashboard;
