import  { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  Activity, 
  Pill, 
  AlertCircle, 
  FileText, 
  Clock,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  ArrowLeft
} from 'lucide-react';
import { usePatients } from '../hooks/usePatients';

function PatientDetails() {
  const { id } = useParams<{ id: string }>();
  const  patients  = usePatients(); // Move hook to component level
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const patientId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [patient, setPatient] = useState<{
    id: string;
    name: string;
    dob: string;
    age: number;
    phone: string;
    email: string;
    bloodType: string;
    medications: string[];
    allergies: string[];
    recentVisits: Visit[];
  }>({
    id: '',
    name: '',
    dob: '',
    age: 0,
    phone: '',
    email: '',
    bloodType: '',
    medications: [],
    allergies: [],
    recentVisits: []
  });

  useEffect(() => {
    const fetchPatient = () => {
      try {
        const foundPatient = patients?.find(p => p.id.toString() === patientId.toString());
        if (foundPatient) {
          setPatient({
            ...patient,
            ...foundPatient,
            id: foundPatient.id.toString()
          });
        } else {
          setError('Patient not found');
        }
      } catch (err) {
        setError('Error fetching patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId, patients]);

  const [newMedication, setNewMedication] = useState("");
  const [newAllergy, setNewAllergy] = useState("");
  const [newVisit, setNewVisit] = useState({
    date: "",
    reason: "",
    doctor: ""
  });

  const handleSave = () => {
    // Here you would typically make an API call to save the changes
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset any unsaved changes
    setIsEditing(false);
  };

  const addMedication = () => {
    if (newMedication.trim()) {
      setPatient(prev => ({
        ...prev,
        medications: [...prev.medications, newMedication.trim()]
      }));
      setNewMedication("");
    }
  };

  const removeMedication = (index: number) => {
    setPatient(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }));
  };

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setPatient(prev => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy.trim()]
      }));
      setNewAllergy("");
    }
  };

  const removeAllergy = (index: number) => {
    setPatient(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index)
    }));
  };

  const addVisit = () => {
    if (newVisit.date && newVisit.reason && newVisit.doctor) {
      setPatient(prev => ({
        ...prev,
        recentVisits: [newVisit, ...prev.recentVisits]
      }));
      setNewVisit({ date: "", reason: "", doctor: "" });
    }
  };

  const removeVisit = (index: number) => {
    setPatient(prev => ({
      ...prev,
      recentVisits: prev.recentVisits.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/patients')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Patients
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Patient Details</h1>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-full">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={patient.name}
                      onChange={(e) => setPatient(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
                  )}
                  <p className="text-gray-500">Patient ID: {patient.id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={patient.dob}
                      onChange={(e) => setPatient(prev => ({ ...prev, dob: e.target.value }))}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-gray-600">DOB: {patient.dob} ({patient.age} years)</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={patient.phone}
                      onChange={(e) => setPatient(prev => ({ ...prev, phone: e.target.value }))}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-gray-600">{patient.phone}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={patient.email}
                      onChange={(e) => setPatient(prev => ({ ...prev, email: e.target.value }))}
                      className="flex-1 px-2 py-1 border rounded"
                    />
                  ) : (
                    <span className="text-gray-600">{patient.email}</span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-gray-400" />
                  {isEditing ? (
                    <select
                      value={patient.bloodType}
                      onChange={(e) => setPatient(prev => ({ ...prev, bloodType: e.target.value }))}
                      className="flex-1 px-2 py-1 border rounded"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-gray-600">Blood Type: {patient.bloodType}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
                </div>
              </div>
              {isEditing && (
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setPatient(prev => ({ ...prev, medications: [...prev.medications, e.target.value] }))}
                    placeholder="Add new medication"
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={addMedication}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              <ul className="space-y-2">
                {patient.medications.map((med, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-600">{med}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeMedication(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                </div>
              </div>
              {isEditing && (
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    placeholder="Add new allergy"
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    onClick={addAllergy}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {patient.allergies.map((allergy, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
                  >
                    <span>{allergy}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeAllergy(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
            
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Recent Visits</h3>
                </div>
              </div>
              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input
                    type="date"
                    value={newVisit.date}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, date: e.target.value }))}
                    className="px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={newVisit.reason}
                    onChange={(e) => setNewVisit(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Reason for visit"
                    className="px-3 py-2 border rounded"
                  />
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newVisit.doctor}
                      onChange={(e) => setNewVisit(prev => ({ ...prev, doctor: e.target.value }))}
                      placeholder="Doctor"
                      className="flex-1 px-3 py-2 border rounded"
                    />
                    <button
                      onClick={addVisit}
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                {patient.recentVisits.map((visit, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{visit.date}</span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeVisit(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-900 font-medium">{visit.reason}</p>
                    <p className="text-gray-600">{visit.doctor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientDetails;
interface Visit {
  date: string;
  reason: string;
  doctor: string;
}


