import type React from "react"
import { useState } from "react"
import { Pill, Plus, Trash2 } from "lucide-react"
import type { PatientData, Prescription } from "../hooks/usePatients"

interface MedicationsProps {
  medications: Prescription[]
  isEditing: boolean
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>
}

export const Medications: React.FC<MedicationsProps> = ({ medications, isEditing, setPatient }) => {
  const [newMedication, setNewMedication] = useState("")

  const addMedication = () => {
    if (newMedication.trim()) {
      setPatient((prev) => {
        if (!prev) return null
        return {
          ...prev,
          prescriptions: [
            ...prev.prescriptions,
            {
              id: Date.now().toString(),
              medication: newMedication.trim(),
              dosage: "",
              frequency: "",
              start_date: new Date().toISOString(),
              end_date: new Date().toISOString(),
              status: "active",
              duration: "",
            },
          ],
        }
      })
      setNewMedication("")
    }
  }

  const removeMedication = (id: string) => {
    setPatient((prev) => {
      if (!prev) return null
      return {
        ...prev,
        prescriptions: prev.prescriptions.filter((med) => med.id !== id),
      }
    })
  }

  return (
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
            onChange={(e) => setNewMedication(e.target.value)}
            placeholder="Add new medication"
            className="flex-1 px-3 py-2 border rounded"
          />
          <button onClick={addMedication} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
      <ul className="space-y-2">
        {medications.length > 0 ? (
          medications.map((med) => (
            <li key={med.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-gray-600">{med.medication}</span>
              </div>
              {isEditing && (
                <button onClick={() => removeMedication(med.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </li>
          ))
        ) : (
          <p className="text-gray-500">No medications recorded.</p>
        )}
      </ul>
    </div>
  )
}

