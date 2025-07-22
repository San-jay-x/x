import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import NeumorphicCard from './NeumorphicCard';
import NeumorphicButton from './NeumorphicButton';

/**
 * Main Dashboard Component for DXZ Data Manager
 * Post-login interface with neumorphic design
 */
const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeView, setActiveView] = useState('data-manager'); // 'data-manager', 'name-generator', 'join-channels'
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // Navigation items for the three-dot menu
  const menuItems = [
    { id: 'name-generator', label: 'Random Name Generator', icon: '🎲' },
    { id: 'data-manager', label: 'Data Manager', icon: '📊' },
    { id: 'join-channels', label: 'Join Channels', icon: '🔗' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'name-generator':
        return (
          <NeumorphicCard className="w-full max-w-4xl">
            <div className="text-center">
              <h2 className="text-2xl font-futuristic text-accent-primary mb-4">
                🎲 Random Name Generator
              </h2>
              <p className="text-gray-600 mb-8">
                Generate random Indian names with passwords
              </p>
              <p className="text-accent-warning">
                Feature coming soon...
              </p>
            </div>
          </NeumorphicCard>
        );

      case 'join-channels':
        return (
          <NeumorphicCard className="w-full max-w-md">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-futuristic text-accent-primary mb-4">
                🔗 Join Our Channels
              </h2>
              
              <NeumorphicButton
                variant="success"
                size="lg"
                className="w-full font-futuristic"
                onClick={() => window.open('https://chat.whatsapp.com/IECS5uR40MNHEBcAEJGMVN?mode=r_t', '_blank')}
              >
                📱 WhatsApp Channel
              </NeumorphicButton>

              <NeumorphicButton
                variant="info"
                size="lg"
                className="w-full font-futuristic"
                onClick={() => window.open('https://t.me/DXZWorkzone', '_blank')}
              >
                ✈️ Telegram Channel
              </NeumorphicButton>
            </div>
          </NeumorphicCard>
        );

      case 'data-manager':
      default:
        return (
          <NeumorphicCard className="w-full max-w-4xl">
            <div className="text-center">
              <h2 className="text-2xl font-futuristic text-accent-primary mb-4">
                📊 Data Manager
              </h2>
              <p className="text-gray-600 mb-8">
                Manage your passwords, UIDs, 2FA keys, and emails
              </p>
              <p className="text-accent-warning">
                Feature coming soon...
              </p>
            </div>
          </NeumorphicCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neu-base">
      {/* Background particles effect */}
      <div className="particles-bg">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-primary/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-neu-base/80 backdrop-blur-md border-b border-gray-300/30"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.05 }}
            >
              <h1 className="text-2xl font-futuristic font-bold text-accent-primary">
                DXZ Data Manager
              </h1>
            </motion.div>

            {/* User info and menu */}
            <div className="flex items-center space-x-4">
              {/* Username */}
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-medium text-accent-primary">{user?.username}</p>
              </div>

              {/* Three-dot menu */}
              <div className="relative">
                <NeumorphicButton
                  size="sm"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-3"
                  isPressed={menuOpen}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </NeumorphicButton>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-64 bg-neu-base shadow-neu-raised rounded-xl border border-gray-300/30 py-2 z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Username display for mobile */}
                      <div className="px-4 py-2 border-b border-gray-300/30 sm:hidden">
                        <p className="text-sm text-gray-600">Welcome back,</p>
                        <p className="font-medium text-accent-primary">{user?.username}</p>
                      </div>

                      {/* Menu items */}
                      {menuItems.map((item, index) => (
                        <motion.button
                          key={item.id}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-200/50 transition-colors duration-200 flex items-center space-x-3 ${
                            activeView === item.id ? 'bg-gray-200/30 text-accent-primary' : 'text-gray-700'
                          }`}
                          onClick={() => {
                            setActiveView(item.id);
                            setMenuOpen(false);
                          }}
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-medium">{item.label}</span>
                        </motion.button>
                      ))}

                      {/* Logout button */}
                      <div className="border-t border-gray-300/30 mt-2 pt-2">
                        <motion.button
                          className="w-full text-left px-4 py-3 hover:bg-red-100/50 transition-colors duration-200 flex items-center space-x-3 text-accent-danger"
                          onClick={handleLogout}
                          whileHover={{ x: 4 }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <span className="text-xl">🚪</span>
                          <span className="font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Close menu overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;