import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePatients } from '../hooks/usePatients';



// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[...Array(5)].map((_, index) => (
      <div key={index} className="h-12 bg-gray-200 rounded-lg"></div>
    ))}
  </div>
);


function Patients() {
  const  {patients ,loading, error } = usePatients();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter patients based on search query
  const filteredPatients = patients?.filter((patient) =>
    patient?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Display loading state
  if (loading) return <div className="p-8"><LoadingSkeleton /></div>;

  // Display error state
  //if (error) return <div className="p-8 text-red-500">{error}</div>;

  const handleNewPatient = () => {
    navigate('/patient/new');
  };

  return (
    <div className="p-8">
      {/* Header and New Patient Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Patients</h1>
        <button 
          onClick={handleNewPatient}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Patient
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </button>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  No patients found.
                </td>
              </tr>
            ) : (
              filteredPatients?.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{patient.phone}</div>
                    <div className="text-gray-500 text-sm">{patient.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{patient.visits?.length > 0 
                    ? new Date(patient.visits
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .find(visit => new Date(visit.date) <= new Date())?.date || 'No past visits')
                        .toLocaleDateString()
                    : 'No visits'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {(() => {
                      const nextAppointment = patient.appointments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                      console.log(patient.appointments);
                      return nextAppointment ? new Date(nextAppointment.date).toLocaleDateString() : 'No appointments';
                    })()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium mr-4">
                    <button 
                      onClick={() => navigate(`/patient/${patient.id}`)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </button>
                    <button 
                      onClick={() => navigate(`/patient/${patient.id}?edit=true`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patients;