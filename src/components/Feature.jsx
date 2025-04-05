import React from 'react';
import { Mic, Brain, Shield, Zap } from "lucide-react";

const FeatureCard = ({ Icon, title, description, iconColor, isDarkMode }) => {
  return (
    <div 
      className={`flex items-start space-x-5 group ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
    >
      <div className={`p-3 rounded-xl ${iconColor} ${isDarkMode ? 'bg-opacity-20' : 'bg-opacity-10'} group-hover:bg-opacity-30`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div className="flex-grow">
        <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white group-hover:text-blue-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
          {title}
        </h3>
        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const Feature = ({isDarkMode}) => {
  return (
    <div 
      id="about"
      className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-bl from-black to-zinc-700 text-white' : 'bg-white text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <div className="space-y-8">
            <div className="text-left">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Transforming Healthcare with AI
              </h2>
              <p className={`text-lg max-w-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Intelligent digital solutions that empower medical professionals and enhance patient care.
              </p>
            </div>

            <div className="space-y-6">
              <FeatureCard 
                isDarkMode={isDarkMode}
                Icon={Mic}
                iconColor="text-blue-600"
                title="AI Speech-to-Text Prescriptions"
                description="Advanced voice recognition that accurately transcribes medical prescriptions, reducing errors and saving time."
              />
              <FeatureCard 
                isDarkMode={isDarkMode}
                Icon={Brain}
                iconColor="text-green-600"
                title="Intelligent Medical Comprehension"
                description="AI that understands complex medical terminology, ensuring precise and contextually accurate transcriptions."
              />
              <FeatureCard 
                isDarkMode={isDarkMode}
                Icon={Shield}
                iconColor="text-red-600"
                title="Robust Security Protocols"
                description="HIPAA-compliant platform with end-to-end encryption, protecting patient data with multi-layer security."
              />
            </div>
          </div>

          {/* Right Column - Visualization */}
          <div>
            <div className="rounded-3xl overflow-hidden">
              <iframe 
                src="https://lottie.host/embed/14dba0a9-25ef-4b3d-80d5-c58db333986b/rKV9TcAyeQ.lottie" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className={`absolute bottom-6 right-6 rounded-full shadow-lg p-3 ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-yellow-500'}`}>
              <Zap className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
