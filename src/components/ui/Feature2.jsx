import React from 'react';
import { Calendar, CreditCard, Users, Mail, HeartPulse } from "lucide-react";

const ServiceCard = ({ Icon, title, description, isDarkMode }) => (
  <div className={`flex items-start space-x-4 group ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
    <div className={`p-2 rounded-lg transition-all duration-300 
      ${isDarkMode ? 'bg-gray-800 text-blue-400' : 'bg-blue-50 text-blue-600'}
      group-hover:scale-105`}>
      <Icon className="w-6 h-6" />
    </div>
    <div className="flex-grow">
      <h3 className={`text-lg font-semibold mb-1 transition-colors 
        ${isDarkMode 
          ? 'text-white group-hover:text-blue-300' 
          : 'text-gray-900 group-hover:text-blue-600'
        }`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  </div>
);

const Feature2 = ({isDarkMode = false}) => {
  return (
    <div 
      className={`min-h-screen flex items-center justify-center py-16 px-4 transition-colors duration-300 
        ${isDarkMode 
          ? 'bg-gradient-to-bl from-gray-900 to-gray-800 text-white' 
          : 'bg-gray-50 text-gray-900'
        }`}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Visualization */}
        <div className="relative order-1 md:order-first">
          <div className="rounded-2xl overflow-hidden -ml-20 transform transition-transform duration-300 hover:scale-[1.02]">
            <iframe 
             src="https://lottie.host/embed/53c687f4-f85d-4817-85bf-df353b72700a/wIkHPB5ZFT.lottie" 
              className="w-full h-[500px] object-cover"
              title="Healthcare Services Animation"
            />

          </div>
          <div className={`absolute bottom-4 right-20 rounded-full shadow-md p-2 
            ${isDarkMode 
              ? 'bg-gray-700 text-blue-400' 
              : 'bg-white text-blue-600'
            } transition-all duration-300 hover:scale-110`}>
            <HeartPulse className="w-5 h-5" />
          </div>
        </div>

        {/* Right Column - Services */}
        <div className="space-y-6 ml-14">
          <div className="text-left ">
            <h2 className={`text-3xl font-bold mb-3 
              ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Healthcare Management Solutions
            </h2>
            <p className={`text-base max-w-xl mb-6 
              ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Empowering healthcare providers with intelligent, integrated management tools.
            </p>
          </div>

          <div className="space-y-5">
  <ServiceCard 
              isDarkMode={isDarkMode}
              Icon={Calendar}
              title="Appointment Management"
              description="Intelligent scheduling and real-time availability updates."
            />
            <ServiceCard 
              isDarkMode={isDarkMode}
              Icon={Users}
              title="Patient Management"
              description="Comprehensive tracking and personalized care coordination."
            />
            <ServiceCard 
              isDarkMode={isDarkMode} 
              Icon={CreditCard}
              title="Payments Management"
              description="Simplified billing and transparent financial tracking."
            />
          
            <ServiceCard 
              isDarkMode={isDarkMode}
              Icon={Mail}
              title="Email Alerts"
              description="Automated notifications for appointments and updates."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature2;