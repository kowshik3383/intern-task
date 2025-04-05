import React, { useEffect, useRef } from 'react';
import { 
  CalendarCheck, 
  FileText, 
  Workflow 
} from 'lucide-react';

const About = ({ isDarkMode = false }) => {
  const sectionRef = useRef(null);
  const featureRefs = useRef([]);
  
  const features = [
    {
      icon: <CalendarCheck 
        className={`w-10 h-10 ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`} 
        strokeWidth={1.5} 
      />,
      title: 'Intelligent Scheduling',
      description: 'Seamless appointment management with advanced AI-driven availability optimization.',
      iconBg: isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
    },
    {
      icon: <FileText 
        className={`w-10 h-10 ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`} 
        strokeWidth={1.5} 
      />,
      title: 'Secure Transactions',
      description: 'End-to-end encrypted payment processing with multiple secure gateways.',
      iconBg: isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
    },
    {
      icon: <FileText 
        className={`w-10 h-10 ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`} 
        strokeWidth={1.5} 
      />,
      title: 'E-Prescriptions',
      description: 'Advanced digital prescription system with comprehensive drug interaction alerts.',
      iconBg: isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
    },
    {
      icon: <Workflow 
        className={`w-10 h-10 ${isDarkMode ? 'text-neutral-200' : 'text-neutral-700'}`} 
        strokeWidth={1.5} 
      />,
      title: 'Compliance & Security',
      description: 'Comprehensive EMR with robust multi-layer access controls and audit trails.',
      iconBg: isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
    }
  ];

  useEffect(() => {
    // Initialize refs array
    featureRefs.current = featureRefs.current.slice(0, features.length);
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      // Check if section is in view
      if (sectionTop < windowHeight * 0.75) {
        sectionRef.current.classList.add('animate-fade-in');
        
        // Animate each feature card with a delay
        featureRefs.current.forEach((ref, index) => {
          if (ref) {
            setTimeout(() => {
              ref.classList.add('animate-slide-up');
              ref.style.opacity = 1;
            }, 150 * index);
          }
        });
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once to check if section is already in view on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [features.length]);

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className={`py-20 opacity-0 transition-opacity duration-1000 ${isDarkMode ? 'bg-gradient-to-br from-black to-zinc-700' : 'bg-gradient-to-t from-slate-100 to-white'}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 transform transition-transform duration-700">
          <h2 className={`text-4xl font-bold tracking-tight ${isDarkMode ? 'text-neutral-100' : 'text-neutral-900'} mb-4`}>
            Genix Healthcare Solutions
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'} max-w-2xl mx-auto`}>
            Elegant, intelligent technology designed to enhance healthcare delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div 
              key={index}
              ref={el => featureRefs.current[index] = el}
              className={`
                group relative p-8 
                ${isDarkMode ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-100 bg-white'} 
                border rounded-2xl 
                transition-all duration-500 
                transform opacity-0
                ${isDarkMode 
                  ? 'hover:border-neutral-700 hover:shadow-2xl' 
                  : 'hover:border-neutral-200 hover:shadow-xl'}
              `}
            >
              <div className="flex items-center mb-6">
                <div className={`
                  ${feature.iconBg} 
                  p-3 rounded-xl mr-4 
                  transition-all duration-500 
                  group-hover:rotate-6 group-hover:scale-105
                  animate-pulse-slow
                `}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-medium ${isDarkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>
                  {feature.title}
                </h3>
              </div>
              <p className={`${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} font-light leading-relaxed`}>
                {feature.description}
              </p>
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  className={`${isDarkMode ? 'text-neutral-600' : 'text-neutral-400'}`}
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px); 
          }
          to { 
            opacity: 1;
            transform: translateY(0); 
          }
        }
        
        @keyframes pulseSlow {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s forwards;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s infinite;
        }
      `}</style>
    </section>
  );
};

export default About;