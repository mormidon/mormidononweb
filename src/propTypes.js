// propTypes.js - Reusable PropTypes definitions
import PropTypes from "prop-types";

// User object shape - used across multiple components
export const UserPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  username: PropTypes.string.isRequired,
  role: PropTypes.oneOf(["admin", "user", "demo"]).isRequired,
});

// Auth context value shape
export const AuthContextPropType = PropTypes.shape({
  user: UserPropType,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
});

// Task object shape (for future TaskCalendar component)
export const TaskPropType = PropTypes.shape({
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  priority: PropTypes.oneOf(["low", "medium", "high"]),
  category: PropTypes.string,
});

// Koan object shape (for landing page)
export const KoanPropType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  story: PropTypes.string.isRequired,
  master: PropTypes.string.isRequired,
});

// Navigation callback functions
export const NavigationPropTypes = {
  onNavigate: PropTypes.func,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  onLoginSuccess: PropTypes.func,
};

// Common component prop types
export const CommonPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

// Form validation prop types
export const FormPropTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onReset: PropTypes.func,
  isValid: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.string),
};
