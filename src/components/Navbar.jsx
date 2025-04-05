import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaTimes, 
  FaUser,
  FaHome,
  FaCog,
  FaBook,
  FaAddressCard,
  FaEnvelope,
  FaRocket
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', icon: FaHome },
    { name: 'Services', href: '#services', icon: FaCog },
    { name: 'Features', href: '#features', icon: FaBook },
    { name: 'About', href: '#about', icon: FaAddressCard },
    { name: 'Contact', href: '#contact', icon: FaEnvelope }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={` top-0 left-0 w-full z-50 transition-all duration-500 mb-10 ${
        isScrolled 
          ? 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-xl shadow-2xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://genixai.connectplus.org.uk/static/media/logo.da276ddf0809263204e8c91f58f682d5.svg" 
            alt="Genix Logo" 
            className=" w-20 h-16"
          />
        
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center text-black/80 hover:text-black font-medium transition-colors"
            >
              <link.icon className="mr-2 text-black/60 hover:text-black" />
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-xl transition-all hover:shadow-2xl flex items-center space-x-2"
          >
            <FaRocket className="mr-2" />
            Get Started
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { duration: 0.3 }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2 }
            }}
            className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-blue-600/95 to-purple-600/95 backdrop-blur-xl shadow-2xl"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center py-3 text-black hover:bg-white/10 rounded-lg font-medium border-b last:border-b-0 border-white/20 transition-colors"
                  onClick={toggleMenu}
                >
                  <link.icon className="mr-3 text-black/70" />
                  {link.name}
                </a>
              ))}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-blue-600 px-4 py-3 rounded-full font-semibold flex items-center justify-center space-x-2 hover:bg-white/90 transition-colors"
              >
                <FaRocket className="mr-2 animate-pulse" />
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;