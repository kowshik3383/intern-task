import { useEffect, useState } from 'react';
import axios from 'axios';
import { Edit, Trash2, Plus, Search, RefreshCw, User, Briefcase, Calendar, MapPin, Phone, FileText } from 'lucide-react';

const Patient = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user.id;
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPatientId, setCurrentPatientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        details: '',
        occupation: '',
        checkup_date: '',
        address: '',
        mobile: ''
    });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/patients/${user_id}`);
            setPatients(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({
            first_name: '',
            last_name: '',
            details: '',
            occupation: '',
            checkup_date: '',
            address: '',
            mobile: ''
        });
        setIsEditing(false);
        setCurrentPatientId(null);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
        if (!showForm) {
            resetForm();
        }
    };

    const addPatient = async () => {
        try {
            await axios.post('http://localhost:5000/patients', { user_id, ...form });
            fetchPatients();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    const editPatient = (patient) => {
        setForm({
            first_name: patient.first_name,
            last_name: patient.last_name,
            details: patient.details,
            occupation: patient.occupation,
            checkup_date: patient.checkup_date,
            address: patient.address,
            mobile: patient.mobile
        });
        setIsEditing(true);
        setCurrentPatientId(patient.id);
        setShowForm(true);
    };

    const updatePatient = async () => {
        try {
            await axios.put(`http://localhost:5000/patients/${currentPatientId}`, form);
            fetchPatients();
            resetForm();
            setShowForm(false);
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    const deletePatient = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`http://localhost:5000/patients/${id}`);
                setPatients(patients.filter(patient => patient.id !== id));
            } catch (error) {
                console.error('Error deleting patient:', error);
            }
        }
    };

    const filteredPatients = patients.filter(patient => 
        patient.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mobile.includes(searchTerm)
    );

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Patients Registry</h2>
                <div className="flex space-x-2">
                    <button 
                        onClick={fetchPatients} 
                        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded transition"
                    >
                        <RefreshCw size={16} />
                        <span>Refresh</span>
                    </button>
                    <button 
                        onClick={toggleForm} 
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                    >
                        {showForm ? 'Cancel' : <><Plus size={16} /> <span>Add Patient</span></>}
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Patient' : 'Add New Patient'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><User size={16} /></span>
                            <input 
                                type="text" 
                                name="first_name" 
                                placeholder="First Name" 
                                value={form.first_name}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><User size={16} /></span>
                            <input 
                                type="text" 
                                name="last_name" 
                                placeholder="Last Name" 
                                value={form.last_name}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><FileText size={16} /></span>
                            <input 
                                type="text" 
                                name="details" 
                                placeholder="Medical Details" 
                                value={form.details}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><Briefcase size={16} /></span>
                            <input 
                                type="text" 
                                name="occupation" 
                                placeholder="Occupation" 
                                value={form.occupation}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><Calendar size={16} /></span>
                            <input 
                                type="date" 
                                name="checkup_date" 
                                value={form.checkup_date}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                            <span className="px-3 text-gray-500"><Phone size={16} /></span>
                            <input 
                                type="text" 
                                name="mobile" 
                                placeholder="Mobile Number" 
                                value={form.mobile}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                        <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden md:col-span-2">
                            <span className="px-3 text-gray-500"><MapPin size={16} /></span>
                            <input 
                                type="text" 
                                name="address" 
                                placeholder="Address" 
                                value={form.address}
                                onChange={handleInputChange} 
                                className="flex-1 p-2 outline-none" 
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button 
                            onClick={resetForm} 
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                        >
                            Reset
                        </button>
                        <button 
                            onClick={isEditing ? updatePatient : addPatient} 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                        >
                            {isEditing ? 'Update Patient' : 'Add Patient'}
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-4 relative">
                <div className="flex items-center bg-white rounded border border-gray-300 overflow-hidden">
                    <span className="px-3 text-gray-500"><Search size={16} /></span>
                    <input 
                        type="text" 
                        placeholder="Search by name or mobile..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        className="flex-1 p-2 outline-none" 
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center p-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    {searchTerm ? "No patients match your search criteria" : "No patients found. Add your first patient!"}
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupation</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Checkup</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPatients.map(patient => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{patient.first_name} {patient.last_name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">{patient.details || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.occupation || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {patient.checkup_date ? new Date(patient.checkup_date).toLocaleDateString() : "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{patient.mobile}</div>
                                        <div className="text-xs text-gray-500 truncate max-w-xs">{patient.address}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => editPatient(patient)} 
                                            className="text-blue-600 hover:text-blue-900 mr-3"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => deletePatient(patient.id)} 
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            
            <div className="mt-4 text-sm text-gray-500 text-right">
                Total patients: {filteredPatients.length}
            </div>
        </div>
    );
};

export default Patient;