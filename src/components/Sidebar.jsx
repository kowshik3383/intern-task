import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, ChevronRight, Mic, Calendar, FileText, Clock, X, Sun, Moon } from 'lucide-react';
import logo2 from './dashboard/logo2.png'
import About from './About';
import FeaturesSection from './Feature';
import Feature2 from './ui/Feature2';
import Pricing from './Pricing';
import BlogsSection from './Blogs';
import ContactSection from './Contact';
import FooterSection from './Footer';
import CookieNotice from './CookieNotice';

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
 const [country, setCountry] = useState(localStorage.getItem("country") || "");

  useEffect(() => {
    if (!country) {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.country_name) {
            setCountry(data.country_name);
            localStorage.setItem("country", data.country_name);
          }
        })
        .catch((error) => console.error("Error fetching location:", error));
    }
  }, [country]);

  // Extract first two letters of the country name in uppercase
const getCountryInitials = (country) => {
  if (!country) return "??";
  
  const words = country.split(" ");
  
  // Get first letter of the first word and first letter of the second word (if exists)
  const initials = words.length > 1 
    ? words[0][0] + words[1][0] 
    : words[0].slice(0, 2); // If only one word, take first two letters

  return initials.toUpperCase();
};

// Usage
const countryInitials = getCountryInitials(country);


  // Simulate content loading 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className={`animate-pulse ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Navigation Skeleton */}
      <div className="flex justify-between items-center px-6 md:px-16 py-6">
        <div className="bg-gray-300 dark:bg-gray-700 h-10 w-32 rounded-lg"></div>
        <div className="hidden md:flex space-x-6">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-gray-300 dark:bg-gray-700 h-6 w-20 rounded-md"></div>
          ))}
        </div>
        <div className="flex space-x-4">
          <div className="bg-gray-300 dark:bg-gray-700 h-10 w-10 rounded-full"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-10 w-24 rounded-full"></div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <div className="flex flex-col md:flex-row px-6 md:px-16 py-12">
        <div className="md:w-1/2 md:pr-8">
          <div className="bg-gray-300 dark:bg-gray-700 h-8 w-48 rounded-full mb-6"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-14 w-full rounded-lg mb-4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-14 w-5/6 rounded-lg mb-6"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-6 w-full rounded mb-2"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-6 w-5/6 rounded mb-8"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="bg-gray-300 dark:bg-gray-700 h-14 w-44 rounded-full"></div>
            <div className="bg-gray-300 dark:bg-gray-700 h-14 w-44 rounded-full"></div>
          </div>
        </div>
        <div className="md:w-1/2 mt-12 md:mt-0">
          <div className="bg-gray-300 dark:bg-gray-700 h-72 md:h-96 w-full rounded-2xl"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen relative transition-colors duration-300 
      ${isDarkMode 
        ? 'bg-gradient-to-br from-black to-zinc-700 text-white' 
        : 'bg-gradient-to-r from-yellow-100 to-cyan-200 text-black'
      }`}>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <>
          {/* Navigation Bar */}
          <nav className="flex justify-between items-center px-6 md:px-16">
            <div className="flex items-center">
              <img src={logo2} alt="Logo" className="h-32 w-32 object-cover" />
            </div>
            
            <div className="hidden md:flex items-center space-x-8 font-medium">
              <a href="#features" className={`cursor-pointer transition-colors duration-200 
                ${isDarkMode 
                  ? 'hover:text-blue-300 text-gray-300' 
                  : 'hover:text-blue-400 text-black'
                }`}>Features</a>
              <a href="#about" className={`cursor-pointer transition-colors duration-200 
                ${isDarkMode 
                  ? 'hover:text-blue-300 text-gray-300' 
                  : 'hover:text-blue-400 text-black'
                }`}>About Us</a>
              <a href="#blogs" className={`cursor-pointer transition-colors duration-200 
                ${isDarkMode 
                  ? 'hover:text-blue-300 text-gray-300' 
                  : 'hover:text-blue-400 text-black'
                }`}>Our Blogs</a>
              <a href="#pricing" className={`cursor-pointer transition-colors duration-200 
                ${isDarkMode 
                  ? 'hover:text-blue-300 text-gray-300' 
                  : 'hover:text-blue-400 text-black'
                }`}>Pricing</a>
              <a href="#contact" className={`cursor-pointer transition-colors duration-200 
                ${isDarkMode 
                  ? 'hover:text-blue-300 text-gray-300' 
                  : 'hover:text-blue-400 text-black'
                }`}>Contact Us</a>
            </div>
            
            <div className="md:hidden cursor-pointer" onClick={toggleMobileMenu}>
              <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {/* Theme Toggle */}
              <button 
                onClick={toggleTheme} 
                className={`p-2 rounded-full transition-colors duration-300 
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <a href="/login" className={`
                ${isDarkMode 
                  ? 'text-gray-700 hover:text-white' 
                  : 'text-gray-00 hover:text-black'
                } transition-colors duration-200`}>
                Sign in
              </a>
              <a href="/register" className={`
                ${isDarkMode 
                  ? 'bg-gradient-to-r from-blue-700 to-purple-800 text-white' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-300 text-black'
                } font-medium px-5 py-2 rounded-full flex items-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200`}>
                Get Started
                <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
              </a>
 <div className="">
      <div className="relative group">
        {/* Avatar with country initials */}
        <div className="w-9 h-9 bg-gradient-to-r from-blue-700 to-purple-800 text-white flex items-center justify-center text-md font-bold rounded-full cursor-pointer">
          {countryInitials}
        </div>

        {/* Tooltip (Full Country Name) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
          {country || "Fetching..."}
        </div>
      </div>
    </div>

            </div>
          </nav>
          
          {/* Mobile Menu design a  */}
          {mobileMenuOpen && (
            <div className={`fixed inset-0 z-50 flex flex-col p-8 
              ${isDarkMode 
                ? 'bg-gray-900 bg-opacity-95 text-white' 
                : 'bg-black bg-opacity-90 text-white'
              }`}>
              <div className="flex justify-between items-center mb-8">
                <div className="font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Genix</div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={toggleTheme} 
                    className={`p-2 rounded-full transition-colors duration-300 
                      ${isDarkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-600 text-white hover:bg-gray-500'
                      }`}
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                  <X className="w-6 h-6 cursor-pointer" onClick={toggleMobileMenu} />
                </div>
              </div>
              <div className="flex flex-col space-y-6 text-xl">
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Features</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-200">About Us</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Resources</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Docs</span>
                <span className="hover:text-blue-400 cursor-pointer transition-colors duration-200">Pricing</span>
              </div>
              <div className="mt-auto flex flex-col space-y-4">
                <button className="text-gray-300 hover:text-white transition-colors duration-200 py-2">Sign in</button>
                <button className={`
                  ${isDarkMode 
                    ? 'bg-gradient-to-r from-blue-700 to-purple-800 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-black'
                  } font-medium px-5 py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200`}>
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row px-6 md:px-16 py-12 md:py-12">
            <div className="md:w-1/2 md:pr-8">
              <div className="inline-block mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-px rounded-full">
                  <div className={`
                    ${isDarkMode 
                      ? 'bg-gray-800 bg-opacity-50' 
                      : 'bg-black bg-opacity-50'
                    } backdrop-blur-sm px-5 py-2 rounded-full flex items-center`}>
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse"></div>
                    <span className="text-white text-sm">Introducing AI-Powered Notes</span>
                  </div>
                </div>
<CookieNotice/>
              </div>

              <h1 className={`text-4xl md:text-6xl font-bold mb-6 leading-tight 
                ${isDarkMode ? 'text-white' : 'text-black'}`}>
                Smart Doctor <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Appointment</span> Management
              </h1>

              <p className={`text-xl mb-8 leading-relaxed 
                ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Effortlessly manage patient appointments, generate notes with AI-driven speech-to-text, and import prescriptions seamlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className={`
                  ${isDarkMode 
                    ? 'bg-gradient-to-r from-blue-700 to-purple-400 text-white' 
                    : 'bg-gradient-to-r from-blue-300 to-purple-300 text-black'
                  } font-medium px-6 py-3 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200`}>
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className={`
                  ${isDarkMode 
                    ? 'border border-gray-700 text-gray-300 hover:bg-gray-800' 
                    : 'border border-gray-600 text-black hover:bg-white/5'
                  } px-6 py-3 rounded-full flex items-center justify-center transition-all duration-200`}>
                  Learn More
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              </div>
              
              <div className={`flex flex-wrap gap-4 text-sm 
                ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                  100% Secure
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                  HIPAA Compliant
                </div>
              </div>
            </div>
            
            {/* Illustration with fallback  */}
            <div className="md:w-1/2 mt-12 md:mt-0 flex items-center justify-center">
              <iframe 
                className="w-full max-w-lg -mt-24 h-64 md:h-[600px]"  
                src="https://lottie.host/embed/da456f1e-fd40-4169-95c3-f5cd272aa4f8/OaETe20wFb.lottie"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = `w-full rounded-lg flex items-center justify-center 
                    ${isDarkMode 
                      ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-white' 
                      : 'bg-gradient-to-r from-blue-900 to-purple-900 text-white'}`;
                  fallback.textContent = 'Illustration';
                  e.target.parentNode.appendChild(fallback);
                }}
              ></iframe>
            </div>
          </div>
<About isDarkMode={isDarkMode}/>
<FeaturesSection isDarkMode={isDarkMode}/>
<Feature2 isDarkMode={isDarkMode}/>
<BlogsSection isDarkMode={isDarkMode}/>
<Pricing isDarkMode={isDarkMode}/>
<ContactSection isDarkMode={isDarkMode}/>
<FooterSection isDarkMode={isDarkMode}/>


        </>
      )}
    </div>
  );
};

export default Sidebar;