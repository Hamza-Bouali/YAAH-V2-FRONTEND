import type React from "react"
import { useState } from "react"
import { AlertCircle, Plus, X } from "lucide-react"
import type { PatientData, Allergy } from "../hooks/usePatients"

interface AllergiesProps {
  allergies: Allergy[]
  isEditing: boolean
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>
}

export const Allergies: React.FC<AllergiesProps> = ({ allergies, isEditing, setPatient }) => {
  const [newAllergy, setNewAllergy] = useState("")

  const addAllergy = () => {
    if (newAllergy.trim()) {
      setPatient((prev) => {
        if (!prev) return null
        return {
          ...prev,
          allergies: [...prev.allergies, { id: Date.now().toString(), name: newAllergy.trim() }],
        }
      })
      setNewAllergy("")
    }
  }

  const removeAllergy = (id: string) => {
    setPatient((prev) => {
      if (!prev) return null
      return {
        ...prev,
        allergies: prev.allergies.filter((allergy) => allergy.id !== id),
      }
    })
  }

  return (
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
          <button onClick={addAllergy} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        {allergies.length > 0 ? (
          allergies.map((allergy) => (
            <div
              key={allergy.id}
              className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
            >
              <span>{allergy.name}</span>
              {isEditing && (
                <button onClick={() => removeAllergy(allergy.id)} className="text-red-500 hover:text-red-700">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No allergies recorded.</p>
        )}
      </div>
    </div>
  )
}

