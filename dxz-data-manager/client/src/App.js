import React, { useState } from 'react';
import { AuthProvider, useAuth } from './utils/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

/**
 * Main App Component for DXZ Data Manager
 * Handles authentication routing and global state management
 */
const AppContent = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot-password'

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is authenticated, show the dashboard
  if (isAuthenticated && user) {
    return <Dashboard />;
  }

  // Authentication views for non-authenticated users
  const renderAuthView = () => {
    switch (currentView) {
      case 'register':
        return (
          <Register 
            onSwitchToLogin={() => setCurrentView('login')}
          />
        );
      case 'forgot-password':
        return (
          <div className="min-h-screen bg-neu-base flex items-center justify-center p-4">
            <div className="text-center">
              <h2 className="text-2xl font-futuristic text-accent-primary mb-4">
                Password Reset
              </h2>
              <p className="text-gray-600 mb-4">
                This feature will be available soon.
              </p>
              <button
                onClick={() => setCurrentView('login')}
                className="text-accent-primary hover:text-accent-secondary transition-colors duration-200"
              >
                Back to Login
              </button>
            </div>
          </div>
        );
      case 'login':
      default:
        return (
          <Login 
            onSwitchToRegister={() => setCurrentView('register')}
            onSwitchToForgotPassword={() => setCurrentView('forgot-password')}
          />
        );
    }
  };

  return renderAuthView();
};

/**
 * Root App Component with Authentication Provider
 */
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;
