import type React from "react"
import { ArrowLeft, Edit2, Save, X } from "lucide-react"
import type { PatientData } from "../hooks/usePatients"

interface PatientHeaderProps {
  patient: PatientData
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  handleSave: () => void
  handleCancel: () => void
  navigateBack: () => void
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  patient,
  isEditing,
  setIsEditing,
  handleSave,
  handleCancel,
  navigateBack,
}) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={navigateBack} className="flex items-center text-gray-600 hover:text-gray-900">
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
)

