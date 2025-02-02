import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../components/models/AxiosInstance';
import { useCallback } from 'react';

// Define interfaces based on your backend API responses.
export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  start_date: Date | string | null;
  end_date: Date | string | null;
  status: "active" | "completed" | "cancelled";
  duration: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface Disease {
  id: string;
  name: string;
  description: string;
}

export interface Allergy {
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

export interface Appointment {
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
  visit: string[];
  visits: Visit[];
  appointment: string[];
  appointments: Appointment[];
}

export const usePatients = () => {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [patientsResponse, visitsResponse, medicationsResponse, appointmentsResponse] = 
        await Promise.all([
          axiosInstance.get<PatientData[]>('/api/patients/'),
          axiosInstance.get<Visit[]>('/api/visits/'),
          axiosInstance.get<Prescription[]>('/api/prescriptions/'),
          axiosInstance.get<Appointment[]>('/api/appointments/')
        ]);

      const patientsData = patientsResponse.data;
      const visitsData = visitsResponse.data;
      const medicationsData = medicationsResponse.data;
      const appointmentsData = appointmentsResponse.data;

      const updatedPatients = patientsData.map(patient => {
        const patientVisits = patient.visit
          .map(visitId => visitsData.find(v => v.id === visitId))
          .filter((visit): visit is Visit => visit !== undefined);

        const patientPrescriptions = patient.medication
          .map(medicationId => medicationsData.find(m => m.id === medicationId))
          .filter((prescription): prescription is Prescription => prescription !== undefined);

        const patientAppointments = patient.appointment
          .map(appointmentId => appointmentsData.find(a => a.id === appointmentId))
          .filter((appointment): appointment is Appointment => appointment !== undefined);

        return {
          ...patient,
          visits: patientVisits,
          prescriptions: patientPrescriptions,
          appointments: patientAppointments
        };
      });

      setPatients(updatedPatients);
    } catch (err) {
      setError('Failed to fetch patient data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, loading, error, refetchPatients: fetchPatients };
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


export const usePatientDetails = (patientId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientData | null>(null);

  const updatePatient = useCallback((updates: Partial<PatientData>) => {
    setPatient((prev) => prev ? { ...prev, ...updates } : null);
  }, []);

  const savePatient = useCallback(async () => {
    if (!patient) return;
    
    try {
      setLoading(true);
      await UpdatePatient(patientId, patient);
    } catch (err) {
      setError('Failed to save patient data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [patient, patientId]);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance.get(`/api/patients/${patientId}`);
        setPatient(response.data);
      } catch (err) {
        setError('Failed to fetch patient data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  return { patient, loading, error, updatePatient, savePatient };
};



export const PatientService = {
  async updatePatient(patientId: string, data: Partial<PatientData>) {
    const response = await axiosInstance.put<PatientData>(`/api/patients/${patientId}/`, data);
    return response.data;
  },

  async addPrescription(prescription: Omit<Prescription, 'id'>) {
    const response = await axiosInstance.post<Prescription>('/api/prescriptions/', prescription);
    return response.data;
  },

  async deletePrescription(prescriptionId: string) {
    await axiosInstance.delete(`/api/prescriptions/${prescriptionId}/`);
  },

  async addAllergy(allergy: Omit<Allergy, 'id'>) {
    const response = await axiosInstance.post<Allergy>('/api/allergies/', allergy);
    return response.data;
  },

  async deleteAllergy(allergyId: string) {
    await axiosInstance.delete(`/api/allergies/${allergyId}/`);
  },

  async addVisit(visit: Omit<Visit, 'id'>) {
    const response = await axiosInstance.post<Visit>('/api/visits/', visit);
    return response.data;
  }
};