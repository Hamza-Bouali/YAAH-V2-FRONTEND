import type React from "react"
import { LucideBriefcase } from "lucide-react"
import type { PatientData } from "../types/patient"

interface TreatmentProps {
  treatment: string
  isEditing: boolean
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>
}

export const Treatment: React.FC<TreatmentProps> = ({ treatment, isEditing, setPatient }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <LucideBriefcase className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Treatment</h3>
      </div>
    </div>
    {isEditing ? (
      <textarea
        value={treatment}
        onChange={(e) => setPatient((prev) => (prev ? { ...prev, treatment: e.target.value } : null))}
        className="w-full px-3 py-2 border rounded"
        rows={4}
      />
    ) : (
      <p className="text-gray-600">{treatment}</p>
    )}
  </div>
)

