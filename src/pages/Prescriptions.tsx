import React, { useEffect, useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Allergy, PatientData, usePatients } from '../hooks/usePatients';
import axiosInstance from '../components/models/AxiosInstance';
import { Prescription } from '../hooks/usePatients';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import {LoadingSkeleton} from './Patients';


const LoadingPhase= () => {
  return (
    <div>
      <LoadingSkeleton />
    </div>
  )
}

  

function Prescriptions() {
  
  const  navigate  = useNavigate();
  let {patients ,loading, error } = usePatients();

  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const Pres_response = await axiosInstance.get('/api/prescriptions/');
        let prescriptionsData = Pres_response.data;
        patients.forEach((patient: PatientData) => {
                  
                  let patientPrescriptions:Prescription[] = [];
                  
        
                  patient.medication.forEach((allergyId) => {
                    const allergy = prescriptionsData.find((a:Allergy) => a.id === allergyId);
                    if (allergy) {
                      patientPrescriptions.push(allergy);
                    }
                  });
        
        
                  
        
                  
                  patient.prescriptions = patientPrescriptions;
                  console.log(patient.prescriptions);
                });
                setLoading(false);
      } catch (error: any) {
        console.error('Fetch patients failed:', error);
        error='An error occurred while fetching patients. Please try again.';
      }
    };

    fetchPatients();
  }, []);
  

  const [searchQuery, setSearchQuery] = useState('');

  
 if(loading){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => navigate('/patient/new')}>
          <Plus className="w-4 h-4 mr-2" />
          New Prescription
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prescriptions..."
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

      {/* Prescriptions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {patients.map((pat) => (
            <tr key={pat.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{pat.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {pat.prescriptions?.[0]?.medication || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {pat.prescriptions?.[0]?.dosage || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {pat.prescriptions?.[0]?.frequency || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {pat.prescriptions?.[0]?.duration || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pat.prescriptions?.[0]?.status==='active'?'bg-green-100 text-green-800' : pat.prescriptions?.[0]?.status==='completed'?'bg-blue-100 text-blue-800':'bg-red-100 text-red-800'}`}>
                  {pat.prescriptions?.[0]?.status || 'N/A'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a  className="text-indigo-600 hover:text-indigo-900 cursor-pointer " onClick={() =>navigate('/patient/'+pat.id)}>
                  Edit
                </a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prescriptions;