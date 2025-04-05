import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

const currencyData = {
  "United Kingdom": { symbol: "\u00a3", rate: 1 },
  "United States": { symbol: "$", rate: 1.2 },
  "European Union": { symbol: "\u20ac", rate: 1 },
  "India": { symbol: "\u20b9", rate: 90 },
};

const PricingCard = ({ title, basePrice, features, isPopular, description, isDarkMode, currency }) => {
  const { symbol, rate } = currencyData[currency] || currencyData["European Union"];
  const price = (basePrice * rate).toFixed(2);

  return (
    <div className={`
      relative w-full max-w-sm p-8 border rounded-3xl shadow-xl transition-all duration-300
      ${isDarkMode ? 'bg-gray-800 hover:shadow-blue-900/20' : 'bg-white hover:shadow-2xl'}
      ${isPopular ? (isDarkMode ? 'border-blue-500 border-2 ring-2 ring-blue-900/30' : 'border-blue-500 border-2 ring-2 ring-blue-100')
        : (isDarkMode ? 'border-gray-700 hover:border-blue-800' : 'border-gray-200 hover:border-blue-200')}
      group
    `}>
      {isPopular && (
        <div className="absolute top-0 right-0 flex items-center bg-blue-500 text-white px-4 py-1.5 text-xs font-semibold rounded-r-3xl rounded-bl-lg">
          Best Value
        </div>
      )}
      
      <div className="text-center">
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-3`}>{title}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 h-12 text-sm`}>{description}</p>
        
        <div className="mb-8">
          <div className="flex items-baseline justify-center">
            <span className={`text-4xl font-extrabold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{symbol}{price}</span>
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} ml-2`}>/month</span>
          </div>
          <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>Billed Annually</div>
        </div>
        
        <ul className="space-y-4 mb-8 text-left">
          {features.map((feature, index) => (
            <li key={index} className={`flex items-center text-sm ${feature.included ? (isDarkMode ? 'text-gray-300' : 'text-gray-800') : (isDarkMode ? 'text-gray-600' : 'text-gray-400')}`}>
              {feature.included ? <Check className={`${isDarkMode ? 'text-blue-400' : 'text-blue-500'} mr-3 flex-shrink-0`} size={18} />
                : <X className={`${isDarkMode ? 'text-gray-600' : 'text-gray-300'} mr-3 flex-shrink-0`} size={18} />}
              <span className={`${feature.included ? (isDarkMode ? 'text-gray-300' : 'text-gray-700') : 'line-through'}`}>{feature.text}</span>
            </li>
          ))}
        </ul>
        
        <button className={`
          w-full py-3 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 
          ${isPopular ? (isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600')
            : (isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200')}
          hover:shadow-md group-hover:-translate-y-1
        `}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const PricingSection = ({ isDarkMode = false }) => {
  const [country, setCountry] = useState(localStorage.getItem("country") || "European Union");

  useEffect(() => {
    if (!localStorage.getItem("country")) {
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
  }, []);

  const pricingPlans = [
    { title: 'Basic', basePrice: 49, description: 'Perfect for small practices getting started', isPopular: false, features: [
      { text: 'Up to 10 Appointments', included: true },
      { text: 'Basic Reporting', included: true },
      { text: 'Email Support', included: true },
      { text: 'Patient Records', included: false },
      { text: 'Advanced Analytics', included: false }
    ] },
    { title: 'Professional', basePrice: 99, description: 'Ideal for growing medical practices', isPopular: true, features: [
      { text: 'Unlimited Appointments', included: true },
      { text: 'Comprehensive Reporting', included: true },
      { text: 'Email & Phone Support', included: true },
      { text: 'Patient Records', included: true },
      { text: 'Advanced Analytics', included: true }
    ] },
    { title: 'Enterprise', basePrice: 199, description: 'Comprehensive solution for large healthcare organizations', isPopular: false, features: [
      { text: 'Unlimited Appointments', included: true },
      { text: 'Custom Reporting', included: true },
      { text: 'Dedicated Support', included: true },
      { text: 'Advanced Patient Management', included: true },
      { text: 'Machine Learning Insights', included: true }
    ] }
  ];

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} py-20 border-t-0 px-4 transition-colors duration-300`}>
      <div className="text-center mb-16">
        <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-4`}>
          Transparent Pricing
        </h2>
        <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          Flexible plans designed to support healthcare practices of all sizes
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={index} {...plan} isDarkMode={isDarkMode} currency={country} />
        ))}
      </div>
    </div>
  );
};

export default PricingSection;