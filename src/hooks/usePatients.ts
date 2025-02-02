import { useState, useEffect } from 'react';
import axios from 'axios';

// Define interfaces based on your backend API responses.
interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  status: string;
}

interface Disease {
  id: string;
  name: string;
  description: string;
}

interface Allergy {
  id: string;
  name: string;
  description: string;
}

export interface Visit {
  id: string;
  date: string;
  reason: string;
  notes: string;
  created_at: string;
}

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  status: string;
  notes: string;
}

export interface PatientData {
  id: string;
  prescriptions: Prescription[];
  prescription: String[];
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  blood_type: string;
  address: string;
  treatment: string;
  disease: Disease[];
  allergies: Allergy[];
  visit: [];
  appointment: Appointment[];
}

export const usePatients = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        // Fetch all related data
        const [patientsResponse/*, diseasesResponse, allergiesResponse, visitsResponse, appointmentsResponse*/] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/patients/'),
          /*axios.get('http://127.0.0.1:8000/api/diseases/'),
          axios.get('http://127.0.0.1:8000/api/allergies/'),
          axios.get('http://127.0.0.1:8000/api/visits/'),
          axios.get('http://127.0.0.1:8000/api/appointments/'),*/
        ]);

        // Extract data from responses
        const patientsData = patientsResponse.data;
        /*const diseasesData = diseasesResponse.data;
        const allergiesData = allergiesResponse.data;
        const visitsData = visitsResponse.data;
        const appointmentsData = appointmentsResponse.data;*/

        // Map related data to patients
        const updatedPatients = patientsData.map((patient: PatientData) => ({
          ...patient,
         /* disease: (patient.disease || []).map((diseaseId) =>
            diseasesData.find((d: Disease) => d.id === diseaseId.id)
          ).filter(Boolean),
          allergies: (patient.allergies || []).map((allergyId) =>
            allergiesData.find((a: Allergy) => a.id === allergyId.id)
          ).filter(Boolean),
          visit: (patient.visit || []).map((visitId) =>
            visitsData.find((v: Visit) => v.id === visitId.id)
          ).filter(Boolean),
          appointment: (patient.appointment || []).map((appointmentId) =>
            appointmentsData.find((a: Appointment) => a.id === appointmentId.id)
          ).filter(Boolean),*/
        }));

        setPatients(updatedPatients);
        
      } catch (err) {
        setError('Failed to fetch patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, loading, error };
};