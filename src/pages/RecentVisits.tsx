import type React from "react"
import { useState } from "react"
import { FileText, Clock, Plus } from "lucide-react"
import type { PatientData, Visit } from "../hooks/usePatients"

interface RecentVisitsProps {
  visits: Visit[]
  isEditing: boolean
  setPatient: React.Dispatch<React.SetStateAction<PatientData | null>>
}

export const RecentVisits: React.FC<RecentVisitsProps> = ({ visits, isEditing, setPatient }) => {
  const [newVisit, setNewVisit] = useState<Omit<Visit, "id" | "created_at">>({
    date: "",
    reason: "",
    notes: "",
  })

  const addVisit = () => {
    if (newVisit.date && newVisit.reason) {
      setPatient((prev) => {
        if (!prev) return null
        return {
          ...prev,
          visits: [
            {
              id: Date.now().toString(),
              ...newVisit,
              created_at: new Date().toISOString(),
            },
            ...prev.visits,
          ],
        }
      })
      setNewVisit({ date: "", reason: "", notes: "" })
    }
  }

  return (
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
            onChange={(e) => setNewVisit((prev) => ({ ...prev, date: e.target.value }))}
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            value={newVisit.reason}
            onChange={(e) => setNewVisit((prev) => ({ ...prev, reason: e.target.value }))}
            placeholder="Reason for visit"
            className="px-3 py-2 border rounded"
          />
          <button onClick={addVisit} className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="space-y-4">
        {visits.length > 0 ? (
          visits.map((visit) => (
            <div key={visit.id} className="border-l-4 border-green-500 pl-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{visit.date}</span>
                </div>
                <span className="text-sm text-gray-700">{visit.reason}</span>
              </div>
              {visit.notes && <p className="text-sm text-gray-500 mt-2">{visit.notes}</p>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No recent visits recorded.</p>
        )}
      </div>
    </div>
  )
}

