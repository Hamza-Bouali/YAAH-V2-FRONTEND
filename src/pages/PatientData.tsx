import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Calendar, Clipboard, Activity, Moon, Sun } from 'lucide-react';

// Sample patient data
const patients = [
  {
    id: 1,
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    contact: 'john.doe@example.com',
    medicalHistory: [
      { condition: 'Hypertension', date: '2022-01-01' },
      { condition: 'Diabetes', date: '2021-05-15' },
    ],
    appointments: [
      { date: '2024-03-01', time: '10:00 AM', type: 'Check-up' },
      { date: '2024-02-15', time: '02:00 PM', type: 'Follow-up' },
    ],
    prescriptions: [
      { medication: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { medication: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
    ],
    labResults: [
      { test: 'Blood Pressure', result: '120/80', date: '2024-03-01' },
      { test: 'Blood Sugar', result: '110 mg/dL', date: '2024-03-01' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 32,
    gender: 'Female',
    contact: 'jane.smith@example.com',
    medicalHistory: [
      { condition: 'Asthma', date: '2020-08-10' },
    ],
    appointments: [
      { date: '2024-03-10', time: '11:00 AM', type: 'Consultation' },
    ],
    prescriptions: [
      { medication: 'Albuterol', dosage: '2 puffs', frequency: 'As needed' },
    ],
    labResults: [
      { test: 'Peak Flow', result: '400 L/min', date: '2024-03-10' },
    ],
  },
];

function PatientDataPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  return (
    <div className="p-8 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Patient Data Dashboard</h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkTheme ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handlePatientClick(patient)}
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">{patient.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{patient.age} years, {patient.gender}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{patient.contact}</p>
          </div>
        ))}
      </div>

      {/* Patient Details */}
      {selectedPatient && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">{selectedPatient.name}'s Details</h2>

          {/* Patient Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Patient Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Age:</span> {selectedPatient.age}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Gender:</span> {selectedPatient.gender}</p>
              <p><span className="font-medium text-gray-800 dark:text-gray-200">Contact:</span> {selectedPatient.contact}</p>
            </div>
          </div>

          {/* Medical History */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Medical History</h3>
            <div className="space-y-2">
              {selectedPatient.medicalHistory.map((history, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-gray-800 dark:text-gray-200">{history.condition}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{history.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Appointments</h3>
            <div className="space-y-2">
              {selectedPatient.appointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-gray-800 dark:text-gray-200">{appointment.type}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.date} at {appointment.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Prescriptions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Prescriptions</h3>
            <div className="space-y-2">
              {selectedPatient.prescriptions.map((prescription, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-gray-800 dark:text-gray-200">{prescription.medication}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{prescription.dosage} ({prescription.frequency})</p>
                </div>
              ))}
            </div>
          </div>

          {/* Lab Results */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Lab Results</h3>
            <div className="space-y-2">
              {selectedPatient.labResults.map((lab, index) => (
                <div key={index} className="flex items-center justify-between">
                  <p className="text-gray-800 dark:text-gray-200">{lab.test}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{lab.result} ({lab.date})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDataPage;