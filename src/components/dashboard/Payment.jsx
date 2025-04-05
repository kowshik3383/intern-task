import { useState, useEffect } from "react";
import axios from "axios";
import { CreditCard, Edit, Trash2, Plus, X, AlertCircle } from "lucide-react";

const PaymentManager = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState({ id: null, type: "", amount: "", currency: "", name: "", date: "" });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);

  // Fetch payments
  const fetchPayments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/payments/${userId}`);
      setPayments(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  // Add or update payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`http://localhost:5000/payments/${payment.id}`, payment);
        setShowEditModal(false);
      } else {
        await axios.post("http://localhost:5000/payments", { ...payment, user_id: userId });
        setShowAddModal(false);
      }
      setPayment({ id: null, type: "", amount: "", currency: "", name: "", date: "" });
      setEditing(false);
      fetchPayments();
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  // Edit payment
  const editPayment = (payment) => {-
    setPayment(payment);
    setEditing(true);
    setShowEditModal(true);
  };

  // Delete payment
  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/payments/${id}`);
      fetchPayments();
      setShowDeleteModal(false);
      setPaymentToDelete(null);
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  // Open delete confirmation modal
  const confirmDelete = (payment) => {
    setPaymentToDelete(payment);
    setShowDeleteModal(true);
  };

  // Reset form
  const resetForm = () => {
    setPayment({ id: null, type: "", amount: "", currency: "", name: "", date: "" });
    setEditing(false);
  };

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-medium">{title}</h3>
            <button 
              onClick={() => {
                onClose();
                resetForm();
              }} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

  // Payment form
  const PaymentForm = ({ onSubmit, buttonText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <input 
          name="name" 
          value={payment.name} 
          onChange={handleChange} 
          placeholder="Name" 
          className="border p-2 w-full rounded" 
          required 
        />
      </div>
      
      <div>
        <input 
          name="type" 
          value={payment.type} 
          onChange={handleChange} 
          placeholder="Type" 
          className="border p-2 w-full rounded" 
          required 
        />
      </div>
      
      <div>
        <input 
          name="amount" 
          type="number" 
          value={payment.amount} 
          onChange={handleChange} 
          placeholder="Amount" 
          className="border p-2 w-full rounded" 
          required 
        />
      </div>
      
      <div>
        <input 
          name="currency" 
          value={payment.currency} 
          onChange={handleChange} 
          placeholder="Currency" 
          className="border p-2 w-full rounded" 
          required 
        />
      </div>
      
      <div>
        <input 
          name="date" 
          type="date" 
          value={payment.date} 
          onChange={handleChange} 
          className="border p-2 w-full rounded" 
          required 
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={() => {
            resetForm();
            editing ? setShowEditModal(false) : setShowAddModal(false);
          }}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <CreditCard className="mr-2 text-blue-600" /> Payment Manager
        </h1>
        <button 
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all"
        >
          <Plus size={18} className="mr-1" /> Add Payment
        </button>
      </div>

      <div className="overflow-x-auto mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Records</h2>
        
        {loading ? (
          <div className="text-center py-4">Loading payments...</div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No payments found. Add your first payment to get started!
          </div>
        ) : (
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Amount</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Currency</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Date</th>
                <th className="py-3 px-4 text-center font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-800">{payment.name}</td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {payment.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">
                    {parseFloat(payment.amount).toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {payment.currency}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => editPayment(payment)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => confirmDelete(payment)}
                      className="bg-red-500 text-white px-2 py-1 rounded mx-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Payment Modal */}
      <Modal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        title="Add New Payment"
      >
        <PaymentForm onSubmit={handleSubmit} buttonText="Add Payment" />
      </Modal>

      {/* Edit Payment Modal */}
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)} 
        title="Edit Payment"
      >
        <PaymentForm onSubmit={handleSubmit} buttonText="Update Payment" />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
        title="Confirm Delete"
      >
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <p className="mb-4">
            Are you sure you want to delete the payment <strong>{paymentToDelete?.name}</strong>?
          </p>
          <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={() => paymentToDelete && deletePayment(paymentToDelete.id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentManager;