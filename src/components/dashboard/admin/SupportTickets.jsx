import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, Mail, User, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const SupportTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get-support")
      .then((response) => {
        setTickets(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        setFilteredTickets(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Error fetching data");
        setLoading(false);
      });
  }, []);

  // Search functionality
  useEffect(() => {
    const results = tickets.filter(ticket =>
      Object.values(ticket).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredTickets(results);
  }, [searchTerm, tickets]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
      Loading support tickets...
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500 text-xl font-semibold">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-purple-500 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">Support Tickets</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full text-gray-800 w-64 outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Table */}
          <div className="p-6 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-purple-100 text-purple-800">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Message</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-gray-200 hover:bg-purple-50">
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <User className="text-purple-500 w-5 h-5" />
                        <span>{ticket.name}</span>
                      </td>
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <Mail className="text-blue-500 w-5 h-5" />
                        <span>{ticket.email}</span>
                      </td>
                      <td className="px-4 py-3">{ticket.message}</td>
                      <td className="px-4 py-3">
                        {ticket.status === "Resolved" ? (
                          <span className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span>Resolved</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-2 text-yellow-600">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Pending</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 flex items-center space-x-2">
                        <Clock className="text-gray-500 w-5 h-5" />
                        <span>{new Date(ticket.created_at).toLocaleString()}</span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No support tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
