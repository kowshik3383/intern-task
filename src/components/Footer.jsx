import React from 'react';
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Send, 
  Heart, 
  MapPin, 
  Mail, 
  Phone 
} from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Blog', href: '#blog' },
    { title: 'Contact', href: '#contact' }
  ];

  const services = [
    'AI Healthcare Solutions',
    'Speech Recognition',
    'Medical Documentation',
    'AI Consulting',
    'Innovation Research'
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              TheGenix
              <span className="ml-2 text-blue-500">
                <Heart size={24} fill="currentColor" />
              </span>
            </h3>
            <p className="text-gray-300 mb-6">
              Revolutionizing healthcare communication through cutting-edge AI and speech recognition technologies.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: '#', color: 'text-blue-400' },
                { Icon: Linkedin, href: '#', color: 'text-blue-600' },
                { Icon: Github, href: '#', color: 'text-gray-200' }
              ].map(({ Icon, href, color }, index) => (
                <a 
                  key={index} 
                  href={href} 
                  className={`
                    ${color} 
                    hover:scale-110 
                    transition-transform 
                    bg-gray-800 
                    p-3 
                    rounded-full
                  `}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="
                      text-gray-300 
                      hover:text-blue-500 
                      transition-colors
                      flex 
                      items-center
                    "
                  >
                    <Send size={16} className="mr-2 text-blue-500" />
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="
                      text-gray-300 
                      hover:text-blue-500 
                      transition-colors
                      flex 
                      items-center
                    "
                  >
                    <Send size={16} className="mr-2 text-blue-500" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin size={20} className="mr-3 text-blue-500" />
                <span className="text-gray-300">
                  TheGenix , India
                </span>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-500" />
                <a 
                  href="mailto:contact@aihealthtech.com" 
                  className="text-gray-300 hover:text-blue-500 transition-colors"
                >
                  contact@thegenix.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-500" />
                <a 
                  href="tel:+15551234567" 
                  className="text-gray-300 hover:text-blue-500 transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {currentYear} TheGenix. All Rights Reserved. 
            <span className="ml-4 text-gray-500 text-sm">
              Designed with ❤️ by Our Innovation Team
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection; 