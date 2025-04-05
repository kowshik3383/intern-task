import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageCircle 
} from 'lucide-react';

const ContactSection = ({ isDarkMode = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div id="contact" className={`${isDarkMode ? 'bg-gray-900' : 'bg-white'} py-24 px-4 transition-colors duration-300`}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4 transition-colors duration-300`}>Get In Touch</h2>
          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto transition-colors duration-300`}>
            Have questions or want to learn more? We're here to help and would love to hear from you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          {/* Contact Animation - Enhanced iframe container */}
          <div className={`rounded-2xl overflow-hidden flex flex-col justify-center relative  transition-colors duration-300`}>
            {/* Styled container for iframe */}
           
            {/* Decorative elements */}
          
         
            
            {/* Responsive iframe container */}
        <div className="rounded-2xl overflow-hidden -ml-20 transform transition-transform duration-300 hover:scale-[1.02]">
  <iframe 
src="https://lottie.host/embed/66da6e1d-6bab-46df-8060-22a302ee3492/4X49cGT22S.lottie"
    className="w-full h-[500px] object-cover bg-transparent"
    allowTransparency="true"
    style={{ background: "transparent" }}
    title="Healthcare Services Animation"
  />
</div>

          </div>

          {/* Contact Form */}
          <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} shadow-xl rounded-2xl p-10 border transition-colors duration-300`}>
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-8 transition-colors duration-300`}>
              Send Us a Message
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2 transition-colors duration-300`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} size={20} />
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className={`w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2 transition-colors duration-300`}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} size={20} />
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className={`w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-medium mb-2 transition-colors duration-300`}>
                  Your Message
                </label>
                <div className="relative">
                  <MessageCircle className={`absolute left-4 top-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`} size={20} />
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder="Type your message here..."
                    className={`w-full pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </div>

              <button 
                type="submit"
                className={`
                  w-full 
                  py-4
                  px-6
                  rounded-lg 
                  font-semibold 
                  shadow-lg
                  hover:shadow-xl
                  transition-all
                  flex 
                  items-center 
                  justify-center
                  ${isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white'
                  }
                `}
              >
                <Send className="mr-3" size={20} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;