import React, { useState } from "react";
import { 
  Clock, 
  BookOpen, 
  User, 
  ArrowRight,
  Calendar,
  X,
  Tag,
  Grid,
  List
} from "lucide-react";

// Modal Component for Blog Post Details
const BlogPostModal = ({ post, isOpen, onClose, isDarkMode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div 
        className={`
          ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} 
          w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden
          transform transition-all duration-300 scale-100
          max-h-[90vh] flex flex-col
        `}
      >
        {/* Modal Header with Image */}
        <div className="relative">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full font-medium">
            {post.category}
          </div>
          <button 
            onClick={onClose}
            className={`
              absolute top-4 left-4 
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'} 
              rounded-full p-2
              transition-colors hover:bg-opacity-80
            `}
          >
            <X size={24} className={isDarkMode ? 'text-white' : 'text-gray-800'} />
          </button>
        </div>
        
        {/* Modal Body with Scrollable Content */}
        <div className="p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
          
          {/* Meta Information */}
          <div className={`flex flex-wrap items-center gap-6 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={18} />
              <span>{post.category}</span>
            </div>
          </div>
          
          {/* Full Content */}
          <div className={`space-y-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <p className="text-lg leading-relaxed">
              {post.excerpt}
            </p>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
            <p className="leading-relaxed">
              Suspendisse in orci enim. Etiam gravida fermentum lectus, et fringilla augue dapibus non. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
            </p>
            <h3 className={`text-2xl font-bold mt-8 mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              Key Findings
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Advanced speech recognition reduces documentation time by up to 45%</li>
              <li>AI-powered transcription shows 98% accuracy in medical terminology</li>
              <li>Implementation costs are offset within 6-8 months through efficiency gains</li>
              <li>Patient satisfaction scores increased by 28% with faster documentation</li>
            </ul>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className={`p-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex justify-between">
            <button 
              className={`
                ${isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                } 
                px-5 py-2 rounded-lg transition-colors
              `}
              onClick={onClose}
            >
              Close
            </button>
            <button 
              className={`
                ${isDarkMode 
                  ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                } 
                px-5 py-2 rounded-lg transition-colors flex items-center
              `}
            >
              Share Article
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPost = ({ post, isDarkMode, onClick }) => {
  return (
    <div 
      className={`
        ${isDarkMode ? 'bg-gray-800 hover:shadow-blue-900/20' : 'bg-white hover:shadow-xl'} 
        rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer
      `}
      onClick={() => onClick(post)}
    >
      <div className="relative">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-3 line-clamp-2`}>
          {post.title}
        </h3>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-3`}>
          {post.excerpt}
        </p>
        <div className={`flex items-center justify-between ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4`}>
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        <button 
          className={`
            w-full 
            flex 
            items-center 
            justify-center 
            ${isDarkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'} 
            py-3 
            rounded-lg 
            font-semibold 
            transition-colors 
            group
          `}
        >
          Read More
          <ArrowRight 
            className="ml-2 group-hover:translate-x-1 transition-transform" 
            size={20} 
          />
        </button>
      </div>
    </div>
  );
};

const BlogsSection = ({ isDarkMode = false }) => {
  const [displayedPosts, setDisplayedPosts] = useState(3);
  const [activeCategory, setActiveCategory] = useState(""); 
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allBlogPosts = [
    {
      title: "AI-Powered Speech Recognition in Healthcare",
      excerpt: "Explore how advanced AI is revolutionizing medical documentation and patient communication.",
      author: "Dr. Emily Chen",
      date: "2024-03-15",
      readTime: 5,
      category: "AI Technology",
      imageUrl: "https://media.istockphoto.com/id/1465867204/photo/customer-service-landing-page-concept-of-online-customer-support-telemarketing-consulting.jpg?s=612x612&w=0&k=20&c=arQmlQaK7eywpLVWICN2nJiaUM2cO8BMEYYMJw91VQM="
    },
    {
      title: "Improving Patient Workflows with Speech-to-Text",
      excerpt: "Discover how speech-to-text technology is streamlining appointment scheduling and medical records.",
      author: "Michael Rodriguez",
      date: "2024-02-28",
      readTime: 4,
      category: "Healthcare Innovation",
      imageUrl: "https://media.istockphoto.com/id/1025428698/vector/bearded-man-reading-a-book-sick-man-lying-in-a-medical-bed-doctor-checking-and-examines-the.jpg?s=612x612&w=0&k=20&c=ME24pi6AR_sijHOL4eT7eJLDHwVQvRrtWHAYZpbm0q0="
    },
    {
      title: "The Future of Medical Communication",
      excerpt: "A deep dive into how AI is transforming the way healthcare professionals interact and document patient information.",
      author: "Sarah Thompson",
      date: "2024-03-10",
      readTime: 6,
      category: "Future of Healthcare",
      imageUrl: "https://media.istockphoto.com/id/1404749040/photo/human-vs-robot.jpg?s=612x612&w=0&k=20&c=IjlGSvSqq8-G-Mzc6CFxwIFzjAk6coClu7SRZQ2XgeU="
    },
    {
      title: "Machine Learning in Diagnostic Imaging",
      excerpt: "Uncover the potential of machine learning algorithms in enhancing medical imaging diagnostics.",
      author: "Dr. Alex Wong",
      date: "2024-03-20",
      readTime: 7,
      category: "AI Technology",
      imageUrl: "https://media.istockphoto.com/id/1468430468/photo/medical-technology-doctor-use-ai-robots-for-diagnosis-care-and-increasing-accuracy-patient.jpg?s=612x612&w=0&k=20&c=KqQbjGMVakHNTJOeh3LVeiqwZWF4Kt5j3taoJXY4x80="
    },
    {
      title: "Ethical Considerations in AI Healthcare",
      excerpt: "Exploring the ethical implications and challenges of implementing AI in medical practice.",
      author: "Emma Patterson",
      date: "2024-03-05",
      readTime: 6,
      category: "Future of Healthcare",
      imageUrl: "https://media.istockphoto.com/id/2172155031/vector/woman-tries-on-bionic-prosthesis-future-technologies-patient-testing-plastic-mechanical-arm.jpg?s=612x612&w=0&k=20&c=R4tNQym334pKEFDpXuO-z7yJ3Tc8V_7WFms45HC3OYo="
    }
  ];

  // Get unique categories for filter
  const categories = [...new Set(allBlogPosts.map(post => post.category))];

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  const filteredPosts = activeCategory
    ? allBlogPosts.filter(post => post.category.toLowerCase().includes(activeCategory.toLowerCase()))
    : allBlogPosts;

  const displayPosts = filteredPosts.slice(0, displayedPosts);

  const handleLoadMore = () => {
    setDisplayedPosts(prev => prev + 3);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setDisplayedPosts(3); // Reset displayed posts when changing category
  };

  return (
    <div id="blogs" className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-20 px-4 transition-colors duration-300`}>
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'} mb-5`}>
            Latest Insights and Research
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Stay updated with the latest advancements in AI-powered healthcare communication
          </p>
        </div>

        {/* Filters and View Controls */}
        <div className={`flex flex-col md:flex-row justify-between items-center mb-10 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
            <button 
              onClick={() => handleCategoryChange("")}
              className={`px-4 hidden py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === "" 
                  ? (isDarkMode ? 'bg-blue-700 text-white' : 'bg-blue-500 text-white') 
                  : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
              }`}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button 
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium hidden transition-colors ${
                  activeCategory === category 
                    ? (isDarkMode ? 'bg-blue-700 text-white ' : 'bg-blue-500 text-white') 
                    : (isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300')
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className={`flex items-center hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-1 rounded-lg shadow-sm`}>
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              aria-label="Grid view"
            >
              <Grid size={20} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
              aria-label="List view"
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {/* Blog Posts */}
        <div className={`${
          viewMode === "grid" 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
        }`}>
          {displayPosts.map((post, index) => (
            <BlogPost 
              key={index}
              post={post}
              isDarkMode={isDarkMode}
              onClick={handleOpenModal}
            />
          ))}
        </div>

        {/* Load More Button */}
        {displayedPosts < filteredPosts.length && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className={`
                ${isDarkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} 
                text-white 
                px-8 
                py-3 
                rounded-lg 
                font-semibold 
                transition-colors 
                flex 
                items-center 
                mx-auto
              `}
            >
              <BookOpen className="mr-3" />
              Load More Posts
            </button>
          </div>
        )}
        
        {/* Empty State */}
        {displayPosts.length === 0 && (
          <div className={`text-center py-16 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold mb-2">No posts found</h3>
            <p>Try changing your filter or check back later for new content.</p>
            <button 
              onClick={() => setActiveCategory("")}
              className="mt-4 px-6 py-2 rounded-lg border border-current"
            >
              View all posts
            </button>
          </div>
        )}
        
        {/* Blog Post Modal */}
        <BlogPostModal 
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default BlogsSection;