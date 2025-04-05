import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Pill, 
  Clock, 
  AlertTriangle, 
  UserRound, 
  ChevronRight, 
  Plus, 
  Trash2, 
  CalendarDays,
  Search,
  Filter,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

export default function Medicine() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medications, setMedications] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    dosage: "",
    timings: "",
    complications: "",
    date: "",
    notes: "",
  });
  
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path.toLowerCase()}`);
  };

  // Get user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.id || 1; // Default user_id for testing

  // Fetch patients
  useEffect(() => {
    axios.get(`http://localhost:5000/patients/${user_id}`).then((response) => {
      setPatients(response.data);
    });
  }, [user_id]);

  // Fetch medications when a patient is selected
  useEffect(() => {
    if (selectedPatient) {
      axios.get(`http://localhost:5000/medications?user_id=${selectedPatient.id}`).then((response) => {
        setMedications(response.data);
      });
    }
  }, [selectedPatient]);

  // Handle Medication Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) return alert("Select a patient first");
    await axios.post("http://localhost:5000/medications", { ...form, user_id: selectedPatient.id });
    setForm({ name: "", dosage: "", timings: "", complications: "", date: "", notes: "" });
    axios.get(`http://localhost:5000/medications?user_id=${selectedPatient.id}`).then((res) => setMedications(res.data));
    setIsFormOpen(false);
  };

  // Delete Medication
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/medications/${id}`);
    axios.get(`http://localhost:5000/medications?user_id=${selectedPatient.id}`).then((res) => setMedications(res.data));
  };

  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                onClick={handleDashboardNavigation} 
                src={logo} 
                alt="Logo" 
                className="h-10 w-auto cursor-pointer mr-6" 
              />
              <div className="hidden md:flex space-x-1">
                {["Medications",  "Notes"].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleNavigation(item === "Notes" ? "records" : item)}
                    className={`px-4 py-2 text-sm rounded-md hover:bg-white/20 transition-colors duration-200 ${
                      item === "Medications" ? "bg-white/20 font-medium" : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-white/20">
                <Bell size={20} />
              </button>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-medium">{user?.first_name?.charAt(0) || "U"}</span>
              </div>
            </div>
          </div>
          {/* Mobile Navigation */}
          <div className="md:hidden overflow-x-auto pb-2 flex space-x-2">
            {[ "Medications", "Notes"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item === "Notes" ? "dashboard/notes" : item)}
                className={`px-4 py-1 text-sm rounded-full whitespace-nowrap ${
                  item === "Medications" ? "bg-white/20 font-medium" : "hover:bg-white/10"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar: Patients List */}
        <div className="w-full md:w-1/4 lg:w-1/5 bg-white shadow-sm border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center">
              <UserRound className="mr-2 text-indigo-600" size={20} />
              Patients
            </h2>
            
            {/* Search Bar */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-9 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            <div className="p-2 space-y-1">
              {filteredPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No patients found</p>
                </div>
              ) : (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-3 rounded-lg cursor-pointer flex items-center justify-between transition-all ${
                      selectedPatient?.id === patient.id 
                        ? "bg-indigo-600 text-white shadow-md" 
                        : "hover:bg-indigo-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        selectedPatient?.id === patient.id ? "bg-white" : "bg-indigo-100"
                      }`}>
                        <span className={selectedPatient?.id === patient.id ? "text-indigo-600" : "text-indigo-500"}>
                          {patient.first_name.charAt(0)}{patient.last_name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{patient.first_name} {patient.last_name}</span>
                    </div>
                    <ChevronRight size={16} className={selectedPatient?.id === patient.id ? "opacity-100" : "opacity-0"} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content: Medications */}
        <div className="w-full md:w-3/4 lg:w-4/5 overflow-y-auto">
          {!selectedPatient ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 p-4">
              <UserRound size={64} className="mb-4 opacity-30" />
              <p className="text-lg text-center">Select a patient to view and manage medications</p>
            </div>
          ) : (
            <div className="p-4 md:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    <span className="text-indigo-600">{selectedPatient.first_name} {selectedPatient.last_name}'s</span> Medications
                  </h1>
                  <p className="text-gray-500">{medications.length} medication{medications.length !== 1 ? 's' : ''} recorded</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <Filter size={16} className="mr-2" />
                    Filter
                  </button>
                  <button 
                    onClick={() => setIsFormOpen(!isFormOpen)} 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-all"
                  >
                    <Plus size={16} className="mr-2" />
                    {isFormOpen ? "Cancel" : "Add Medication"}
                  </button>
                </div>
              </div>

              {/* Add Medication Form */}
              {isFormOpen && (
                <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-indigo-100 transition-all">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Pill className="mr-2 text-indigo-600" size={20} />
                    New Medication
                  </h2>
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                      <input
                        type="text"
                        placeholder="e.g., Amoxicillin"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                      <input
                        type="text"
                        placeholder="e.g., 500mg"
                        value={form.dosage}
                        onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timing Schedule</label>
                      <input
                        type="text"
                        placeholder="e.g., Every 8 hours"
                        value={form.timings}
                        onChange={(e) => setForm({ ...form, timings: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        required
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Potential Complications</label>
                      <textarea
                        placeholder="e.g., May cause drowsiness"
                        value={form.complications}
                        onChange={(e) => setForm({ ...form, complications: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-20"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                      <textarea
                        placeholder="Any additional instructions or notes"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-20"
                      />
                    </div>
                    <div className="col-span-1 md:col-span-2 mt-2">
                      <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all">
                        Save Medication
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Medications List */}
              <div className="mt-6">
                {medications.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <Pill size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No medications added yet.</p>
                    <p className="text-gray-400">Add a medication to get started.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {medications.map((med) => (
                      <div key={med.id} className="bg-white shadow-md rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                        {/* Header with background color */}
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 border-b border-indigo-100">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-lg mr-3">
                              <Pill className="text-white" size={20} />
                            </div>
                            <div>
                              <h2 className="font-bold text-lg text-gray-800">{med.name}</h2>
                              <div className="flex items-center text-indigo-500 text-sm">
                                <CalendarDays size={14} className="mr-1" />
                                <span>{med.date || "No date specified"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Medication Details */}
                        <div className="p-4 space-y-3">
                          {/* Dosage */}
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="bg-green-100 p-2 rounded-lg">
                              <Pill className="text-green-600" size={16} />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 uppercase font-medium">Dosage</div>
                              <div className="text-gray-700 font-medium">{med.dosage}</div>
                            </div>
                          </div>

                          {/* Timings */}
                          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <Clock className="text-blue-600" size={16} />
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 uppercase font-medium">Schedule</div>
                              <div className="text-gray-700 font-medium">{med.timings}</div>
                            </div>
                          </div>

                          {/* Warnings (if any) */}
                          {med.complications && (
                            <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded-lg">
                              <div className="bg-yellow-100 p-2 rounded-lg">
                                <AlertTriangle className="text-yellow-600" size={16} />
                              </div>
                              <div>
                                <div className="text-xs text-yellow-700 uppercase font-medium">Complications</div>
                                <div className="text-yellow-800">{med.complications}</div>
                              </div>
                            </div>
                          )}

                          {/* Notes (if any) */}
                          {med.notes && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <div className="text-xs text-gray-500 uppercase font-medium mb-1">Notes</div>
                              <p className="text-gray-700">{med.notes}</p>
                            </div>
                          )}
                          
                          {/* Delete Button */}
                          <div className="flex justify-end mt-4">
                            <button 
                              onClick={() => handleDelete(med.id)} 
                              className="flex items-center text-red-500 hover:text-red-700 hover:bg-red-50 py-1 px-3 rounded-lg transition-all"
                            >
                              <Trash2 size={16} className="mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}