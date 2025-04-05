import { useState, useEffect } from "react";
import axios from "axios";
import { Loader, CheckCircle, AlertTriangle, Send, LifeBuoy, MessageSquare } from "lucide-react";

export default function Help() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("submit");
  const [fetchError, setFetchError] = useState(false);

  // Fetch all tickets
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setFetchError(false);
      const res = await axios.get("http://localhost:5000/tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setFetchError(true);
      setNotification({ 
        type: "error", 
        message: "Failed to load tickets. Please try again later." 
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Submit Ticket
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setNotification({ type: "error", message: "All fields are required!" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/tickets", form);
      setForm({ name: "", email: "", message: "" });
      setNotification({ type: "success", message: "Ticket submitted successfully!" });
      fetchTickets();
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setNotification({ 
        type: "error", 
        message: "Failed to submit ticket. Please try again." 
      });
    } finally {
      setLoading(false);
      
      // Clear notification after 3 seconds
      setTimeout(() => setNotification(null), 3000);
    }
  };

  // Mark ticket as resolved
  const resolveTicket = async (id) => {
    try {
      await axios.put(`http://localhost:5000/tickets/${id}`);
      setNotification({ type: "success", message: "Ticket marked as resolved!" });
      fetchTickets();
    } catch (error) {
      console.error("Error resolving ticket:", error);
      setNotification({ 
        type: "error", 
        message: "Failed to update ticket status. Please try again." 
      });
    }
    
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className=" p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        <div className="flex items-center space-x-3">
          <LifeBuoy className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Help & Support Center</h1>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          24/7 Support Available
        </div>
      </div>
      
      {/* Notification */}
      {notification && (
        <div className={`mb-4 p-3 rounded-lg flex items-center ${
          notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}>
          {notification.type === "success" ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertTriangle className="w-5 h-5 mr-2" />
          )}
          {notification.message}
        </div>
      )}
      
      {/* Tabs */}
      <div className="flex border-b mb-6">
        <button 
          onClick={() => setActiveTab("submit")} 
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === "submit" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}>
          <MessageSquare className="w-4 h-4 mr-2" />
          Submit a Ticket
        </button>
        <button 
          onClick={() => setActiveTab("history")} 
          className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm ${
            activeTab === "history" 
              ? "border-blue-600 text-blue-600" 
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}>
          <CheckCircle className="w-4 h-4 mr-2" />
          Your Tickets
        </button>
      </div>
      
      {/* Support Form */}
      {activeTab === "submit" && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Submit a Support Ticket</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">How can we help?</label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your issue in detail..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <Loader className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
        </div>
      )}
      
      {/* Ticket History */}
      {activeTab === "history" && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Support Tickets</h2>
          
          {fetchError ? (
            <div className="bg-red-50 p-4 rounded-lg text-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
              <p className="text-red-600">Unable to load your tickets. Please try refreshing the page.</p>
              <button 
                onClick={fetchTickets}
                className="mt-3 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm"
              >
                Retry
              </button>
            </div>
          ) : tickets.length === 0 ? (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <p className="text-gray-500">You haven't submitted any tickets yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{ticket.message}</h3>
                      <p className="text-sm text-gray-500 mt-1">Submitted on {new Date(ticket.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      {ticket.status === "Pending" ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Resolved
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {ticket.name} • {ticket.email}
                    </div>
                    
                    {ticket.status === "Pending" && (
                      <button 
                        onClick={() => resolveTicket(ticket.id)} 
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Footer with Quick Help */}
      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Need Immediate Assistance?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Live Chat</h4>
            <p className="text-sm text-gray-600 mb-3">Chat with our support team in real-time.</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-800">Start Chat →</button>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Phone Support</h4>
            <p className="text-sm text-gray-600 mb-3">Call us directly at 1-800-123-4567.</p>
            <button className="text-green-600 text-sm font-medium hover:text-green-800">Call Now →</button>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Knowledge Base</h4>
            <p className="text-sm text-gray-600 mb-3">Browse our help articles and tutorials.</p>
            <button className="text-purple-600 text-sm font-medium hover:text-purple-800">View Articles →</button>
          </div>
        </div>
      </div>
    </div>
  );
}