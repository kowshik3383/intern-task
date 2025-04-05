import React, { useState, useEffect, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import toast from "react-hot-toast";
import { Clock, Edit2, Trash2, Mic, StopCircle, Save,Bell } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from './logo.png'
const MedicalRecord = () => {
  const [transcript, setTranscript] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [notes, setNotes] = useState([]);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const [selectedSection, setSelectedSection] = useState(null);
  const recognitionRef = useRef(null);
  const [prescription, setPrescription] = useState("");
const navigate = useNavigate();

const handleNavigation = (path) => {
    navigate(`/${path.toLowerCase()}`); // Converts "Medications" -> "/medications"
  };

const languages = [
  // Indian languages
  { code: "hi-IN", label: "Hindi" },
  { code: "ta-IN", label: "Tamil" },
  { code: "te-IN", label: "Telugu" },
  { code: "kn-IN", label: "Kannada" },
  { code: "ml-IN", label: "Malayalam" },
  { code: "mr-IN", label: "Marathi" },
  { code: "bn-IN", label: "Bengali" },
  { code: "gu-IN", label: "Gujarati" },
  { code: "pa-IN", label: "Punjabi" },
  { code: "or-IN", label: "Odia" },
  { code: "as-IN", label: "Assamese" },
  { code: "ur-IN", label: "Urdu" },
  { code: "ks-IN", label: "Kashmiri" },
  { code: "sd-IN", label: "Sindhi" },
  { code: "mni-IN", label: "Manipuri" },
  { code: "ne-IN", label: "Nepali" },
  { code: "kok-IN", label: "Konkani" },
  { code: "bho-IN", label: "Bhojpuri" },
  { code: "doi-IN", label: "Dogri" },
  { code: "sa-IN", label: "Sanskrit" },

  // English-speaking countries
  { code: "en-US", label: "English (United States)" },
  { code: "en-GB", label: "English (United Kingdom)" },
  { code: "en-CA", label: "English (Canada)" },
  { code: "en-AU", label: "English (Australia)" },
  { code: "en-NZ", label: "English (New Zealand)" },
  { code: "en-IE", label: "English (Ireland)" },
  { code: "en-ZA", label: "English (South Africa)" },

  // European languages
  { code: "es-ES", label: "Spanish (Spain)" },
  { code: "fr-FR", label: "French (France)" },
  { code: "de-DE", label: "German" },
  { code: "it-IT", label: "Italian" },
  { code: "pt-PT", label: "Portuguese (Portugal)" },
  { code: "nl-NL", label: "Dutch" },
  { code: "sv-SE", label: "Swedish" },
  { code: "da-DK", label: "Danish" },
  { code: "fi-FI", label: "Finnish" },
  { code: "no-NO", label: "Norwegian" },
  { code: "is-IS", label: "Icelandic" },
  { code: "pl-PL", label: "Polish" },
  { code: "cs-CZ", label: "Czech" },
  { code: "sk-SK", label: "Slovak" },
  { code: "hu-HU", label: "Hungarian" },
  { code: "ro-RO", label: "Romanian" },
  { code: "bg-BG", label: "Bulgarian" },
  { code: "el-GR", label: "Greek" },
  { code: "et-EE", label: "Estonian" },
  { code: "lv-LV", label: "Latvian" },
  { code: "lt-LT", label: "Lithuanian" },
  { code: "hr-HR", label: "Croatian" },
  { code: "sr-RS", label: "Serbian" },
  { code: "sl-SI", label: "Slovenian" },
  { code: "bs-BA", label: "Bosnian" },
  { code: "mk-MK", label: "Macedonian" },
  { code: "sq-AL", label: "Albanian" },
  { code: "mt-MT", label: "Maltese" },
  { code: "ga-IE", label: "Irish" },
  { code: "cy-GB", label: "Welsh" },
  { code: "gd-GB", label: "Scottish Gaelic" },
  { code: "eu-ES", label: "Basque" },
  { code: "ca-ES", label: "Catalan" },
  { code: "gl-ES", label: "Galician" },
  { code: "ru-RU", label: "Russian" },
  { code: "be-BY", label: "Belarusian" },
  { code: "uk-UA", label: "Ukrainian" }
];

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("savedNotes"));
    if (savedNotes) setNotes(savedNotes);
  }, []);


  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition)
      return alert("Browser does not support speech recognition.");

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = true;
    recognition.continuous = true; // This ensures the recognition keeps going until you stop it manually
    recognition.onresult = async (event) => {
      const spokenText = Array.from(event.results) 
        .map((result) => result[0].transcript)
        .join("");
      setTranscript(spokenText);

      try {
        const response = await fetch(
          "https://doctor-1mp7.onrender.com/detect-and-translate",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: spokenText, targetLanguage: "en-US" }),
          }
        );
        const data = await response.json();
        setTranslatedText(data.translatedText || "Translation failed");
      } catch (error) {
        console.error("Error during translation:", error);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      // Optionally restart the recognition if there's an error
      recognition.start();
    };

    recognitionRef.current = recognition;
    recognition.start();
    toast.success("Listening...");
  };

  const stopSpeechRecognition = () => {
    recognitionRef.current?.stop();
    toast.success("Stopped listening.");
  };

  const saveNotes = () => {
    const newNote = {
      section: selectedSection,
      transcript,
      translatedText,
      timestamp: new Date().toLocaleString(),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setShowModal(false);
    toast.success("Notes saved!");
  };
  const [isRecording, setIsRecording] = useState(false);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopSpeechRecognition();
      setIsRecording(false);
    } else {
      startSpeechRecognition();
      setIsRecording(true);
    }
  };
  const handleNoteAction = (index, action) => {
    const updatedNotes = [...notes];
    if (action === "edit") {
      setTranscript(updatedNotes[index].transcript);
      setTranslatedText(updatedNotes[index].translatedText);
      setSelectedSection(updatedNotes[index].section);
      setShowModal(true);
    } else if (action === "delete") {
      updatedNotes.splice(index, 1);
      setNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
      toast.success("Note deleted!");
    } else if (action === "update") {
      updatedNotes[index] = {
        ...updatedNotes[index],
        transcript,
        translatedText,
      };
      setNotes(updatedNotes);
      localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
      toast.success("Note updated!");
    }
  };
const [loading, setLoading] = useState(false);

const handleGeneratePrescription = async () => {
  setLoading(true); // Start loading
  try {
    const response = await axios.post("https://doctor-1mp7.onrender.com/generate-prescription", {
      text: translatedText,
    });
    setPrescription(response.data.prescription);
  } catch (error) {
    console.error("Error generating prescription:", error);
  } finally {
    setLoading(false); // Stop loading
  }
};
const [patients, setPatients] = useState([]);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
      if (!userId) return setError("User ID not found in localStorage.");

      try {
        const response = await fetch(`http://localhost:5000/patients/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch patients.");

        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPatients();
  }, []);
  const handleDashboardNavigation = () => {
    navigate('/dashboard');
  };
const user = JSON.parse(localStorage.getItem("user"));
  return (
     <section className="min-h-screen bg-gradi ent-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
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



<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    {/* Patient List Section */}
    <div className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}
      
      {patients?.length > 0 ? (
        patients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setSelectedSection(patient.id)}
            className={`p-6 rounded-xl transition-all duration-200 cursor-pointer ${
              selectedSection === patient.id
                ? "bg-white shadow-lg border-l-4 border-indigo-500"
                : "bg-white/60 hover:bg-white hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">
                {patient.first_name || "Unnamed Patient"}
              </span>
              <button onClick={() => setShowModal(true)} className="p-2 rounded-full hover:bg-gray-100">
                <Mic className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No patients found</p>
      )}

      <div className="bg-white/60 p-6 rounded-xl">
        <h2 className="font-semibold text-gray-800 mb-4">Problem List</h2>
        <button className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors">
          <span className="mr-2 text-xl">+</span>
          <span className="font-medium">Add Problem</span>
        </button>
      </div>
    </div>

    {/* History Section */}
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">History</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Follow Up</span>
          <button className="p-2 rounded-full bg-violet-100 hover:bg-violet-200 transition-colors">
            <Clock className="w-5 h-5 text-violet-600" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes?.length > 0 ? (
          notes
            .filter((note) => note.section === selectedSection)
            .map((note, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-2">{note.timestamp}</p>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Transcript:</span>
                    <p className="mt-1 text-gray-600">{note.transcript}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Translation:</span>
                    <p className="mt-1 text-gray-600">{note.translatedText}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={() => handleNoteAction(index, "edit")}
                    className="px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-600 text-white rounded-full transition-colors flex items-center space-x-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleNoteAction(index, "delete")}
                    className="px-3 py-1.5 text-xs bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No notes found for {selectedSection}
          </div>
        )}
      </div>

      <div className="mt-8 max-w-2xl mx-auto space-y-6">
        <textarea
          value={translatedText}
          onChange={(e) => setTranslatedText(e.target.value)}
          placeholder="Enter symptoms or condition..."
          className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 shadow-sm 
          placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent 
          transition-all duration-200 text-gray-700 text-lg resize-none"
        />
        <button
          onClick={handleGeneratePrescription}
          disabled={loading}
          className={`w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-violet-600 
          text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
          hover:from-indigo-700 hover:to-violet-700 transform hover:-translate-y-0.5 
          transition-all duration-200 text-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? "Generating..." : "Generate Prescription"}
        </button>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {prescription && !loading && (
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md 
          hover:shadow-lg transition-shadow duration-200">
            <h3 className="text-gray-800 font-semibold text-lg mb-3">Prescription</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {prescription}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


      {/* Floating Action Button */}
      <button
        className="fixed bottom-20 right-8 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-pink-500 shadow-xl ring-4 ring-blue-300 hover:ring-2 hover:ring-blue-500 transition-all duration-500 ease-in-out hover:scale-110 active:scale-95 animate-pulse focus:outline-none"
        onClick={() => setShowLanguageModal(true)}
      >
        <FaMicrophone className="text-white text-xl" />
      </button>

      {/* Language Selection Modal */}
     {showLanguageModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 w-full max-w-md m-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your Language</h2>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setSelectedLanguage(lang.code);
              setShowLanguageModal(false);
              setShowModal(true);
            }}
            className="w-full p-3 text-left rounded-lg hover:bg-gray-100 transition-colors"
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  </div>
)}


      {/* Recording Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Transcription & Translation</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Transcript:</h3>
                <p className="text-gray-600">{transcript || "Start speaking..."}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2">Translated Text:</h3>
                <p className="text-gray-600">{translatedText || "Translation will appear here..."}</p>
              </div>

              <button
                className={`w-full py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
                } text-white`}
                onClick={handleToggleRecording}
              >
                {isRecording ? (
                  <StopCircle className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
                <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
              </button>

              <button
                className="w-full py-3 bg-indigo-600  hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors"
                onClick={saveNotes}

              >
                <Save className="w-5 h-5" />
                <span>Submit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MedicalRecord;
