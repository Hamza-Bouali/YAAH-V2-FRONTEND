import type React from "react"
import { User, Calendar, Phone, Mail, Activity } from "lucide-react"
import type { PatientData } from "../hooks/usePatients"

interface PersonalInfoProps {
  patient: PatientData
  isEditing: boolean
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({ patient, isEditing, setPatient }) => (
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
            onChange={(e) => setPatient((prev) => (prev ? { ...prev, name: e.target.value } : null))}
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
            onChange={(e) => setPatient((prev) => (prev ? { ...prev, dob: e.target.value } : null))}
            className="flex-1 px-2 py-1 border rounded"
          />
        ) : (
          <span className="text-gray-600">
            DOB: {patient.dob} ({patient.age} years)
          </span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Phone className="h-5 w-5 text-gray-400" />
        {isEditing ? (
          <input
            type="tel"
            value={patient.phone}
            onChange={(e) => setPatient((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
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
            onChange={(e) => setPatient((prev) => (prev ? { ...prev, email: e.target.value } : null))}
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
            value={patient.blood_type}
            onChange={(e) => setPatient((prev) => (prev ? { ...prev, blood_type: e.target.value } : null))}
            className="flex-1 px-2 py-1 border rounded"
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-gray-600">Blood Type: {patient.blood_type}</span>
        )}
      </div>
    </div>
  </div>
)

