import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../components/models/AxiosInstance';

// Define interfaces based on your backend API responses.
interface Prescription {
        id: string,
        medication: string,
        dosage:string,
        frequency: string,
        start_date: Date | string | null,
        end_date: Date | string | null,
        status: "active" | "completed" | "cancelled",
        duration: string,
        created_at?: Date | null,
        updated_at?: Date | null,
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
  medication: string[];
  prescriptions: Prescription[];
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
  visit: String[];
  visits: Visit[] ;
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
        const [patientsResponse,visitsResponse,medicationsResponse /*, diseasesResponse, allergiesResponse, , appointmentsResponse*/] = await Promise.all([
          axiosInstance.get('/api/patients/'), 
          axiosInstance.get('/api/visits/'),
          axiosInstance.get('/api/prescriptions/'),
          /*axios.get('http://127.0.0.1:8000/api/diseases/'),
          axios.get('http://127.0.0.1:8000/api/allergies/'),
         
          axios.get('http://127.0.0.1:8000/api/appointments/'),*/
        ]);

        // Extract data from responses
        const patientsData = patientsResponse.data;
        const visitsData = visitsResponse.data;
        const medicationsData = medicationsResponse.data;
        /*const diseasesData = diseasesResponse.data;
        const allergiesData = allergiesResponse.data;
        
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

        patientsData.forEach((patient: PatientData) => {
          let patientVisits: Visit[] = [];
          let patientPrescriptions: Prescription[] = [];
          patient.visit.forEach((visitId) => {
            const visit = visitsData.find((v: Visit) => v.id === visitId);
            if (visit) {
              patientVisits.push(visit);
            }
          });
          patient.medication.forEach((medicationId) => {
            const prescription = medicationsData.find((m: Prescription) => m.id === medicationId);
            if (prescription) {
              patientPrescriptions.push(prescription);
            }
          });
          patient.visits = patientVisits;
          patient.prescriptions = patientPrescriptions;
        });
        setPatients(patientsData);
        /*setPatients(updatedPatients);*/
        
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



export const UpdatePatient = async (id: string, data: PatientData) => {
  try {
    const response = await axiosInstance.put(`/api/patients/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Failed to update patient:', error);
    throw error;
  }
};