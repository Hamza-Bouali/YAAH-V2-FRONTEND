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

interface Visit {
  id: string;
  date: string;
  reason: string;
  doctor: string;
  notes: string;
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
  name: string;
  dob: string;
  age: number;
  phone: string;
  email: string;
  blood_type: string;
  address: string;
  treatment: string;
  prescriptions: Prescription[];
  diseases: Disease[];
  allergies: Allergy[];
  visits: Visit[];
  appointments: Appointment[];
}

export const usePatients = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/patients/');
        const prescriptionsResponse = await axios.get('http://localhost:8000/api/prescriptions/');
        const diseasesResponse = await axios.get('http://localhost:8000/api/diseases/');
        const allergiesResponse = await axios.get('http://localhost:8000/api/allergies/');
        const visitsResponse = await axios.get('http://localhost:8000/api/visits/');
        const appointmentsResponse = await axios.get('http://localhost:8000/api/appointments/');

        // First, get all the related data
        const patientsData = response.data;
        const prescriptionsData = prescriptionsResponse.data;
        const diseasesData = diseasesResponse.data;
        const allergiesData = allergiesResponse.data;
        const visitsData = visitsResponse.data;
        const appointmentsData = appointmentsResponse.data;

        // Map through patients and join with related data
        const updatedPatients = patientsData.map((patient: PatientData) => ({
            ...patient,
            // For each relation, check if array exists before mapping
            prescriptions: (patient.prescriptions || []).map(prescId => 
          prescriptionsData.find((p: Prescription) => p.id == prescId)
            ).filter(Boolean),
            diseases: (patient.diseases || []).map(diseaseId => 
          diseasesData.find((d: Disease) => d.id == diseaseId)
            ).filter(Boolean),
            allergies: (patient.allergies || []).map(allergyId => 
          allergiesData.find((a: Allergy) => a.id == allergyId)
            ).filter(Boolean),
            visits: (patient.visit || []).map(visitId => 
          visitsData.find((v: Visit) => v.id == visitId)
            ).filter(Boolean),
            appointments: (patient.appointments || []).map(appointmentId => 
          appointmentsData.find((a: Appointment) => a.id == appointmentId)
            ).filter(Boolean)
        }));

        setPatients(updatedPatients);
        console.log('Patients:', patients);
        console.log('Patients:', updatedPatients);
      } catch (err) {
        setError('Failed to fetch patient data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return { patients, loading, error };
};

// Function to add, update or delete patient data as needed based on Django models
export const addPatient = async (patient: PatientData) => {
  try {
    const response = await axios.post('http://localhost:8000/api/patients/', patient);
    return { success: true, data: response.data };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};

export const updatePatient = async (id: string, updates: Partial<PatientData>) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/patients/${id}/`, updates, {
      headers: { 'Content-Type': 'application/json' },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.error('Update failed:', err?.response?.data || err?.message);
    return { success: false, error: err.message };
  }
};

export const deletePatient = async (id: string) => {
  try {
    await axios.delete(`http://localhost:8000/api/patients/${id}/`);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
};
