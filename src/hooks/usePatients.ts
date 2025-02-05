import { useState, useEffect } from 'react';
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
  sexe: string;
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
  hour: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  status: string;
  notes: string;
  pat: string;
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
  diseases: Disease[];
  disease: string[];
  allergies: String[];
  Allergies: Allergy[] | [];
  visit: string[];
  visits: Visit[];
  sexe: string;
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
      const [patientsResponse, visitsResponse, medicationsResponse, appointmentsResponse,allergiesResponse,diseaseResponse] = 
        await Promise.all([
          axiosInstance.get<PatientData[]>('/api/patients/'),
          axiosInstance.get<Visit[]>('/api/visits/'),
          axiosInstance.get<Prescription[]>('/api/prescriptions/'),
          axiosInstance.get<Appointment[]>('/api/appointments/'),
          axiosInstance.get<Allergy[]>('/api/allergies/'),
          axiosInstance.get<Disease[]>('/api/diseases/'),
        ]);

      const patientsData = patientsResponse.data;
      const visitsData = visitsResponse.data;
      const medicationsData = medicationsResponse.data;
      const appointmentsData = appointmentsResponse.data;
      const allergiesData = allergiesResponse.data;
      const diseasesData = diseaseResponse.data;

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

        const patientAllergies = patient.allergies.map(allergyId => allergiesData.find(a => a.id === allergyId)).filter((allergy): allergy is Allergy => allergy !== undefined);

        const patientDiseases = patient.disease.map(diseaseId => diseasesData.find(d => d.id === diseaseId)).filter((disease): disease is Disease => disease !== undefined);
        return {
          ...patient,
          visits: patientVisits,
          prescriptions: patientPrescriptions,
          appointments: patientAppointments,
          Allergies: patientAllergies,
          diseases: patientDiseases,
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

  async addVisit(visit: Omit<Visit, 'id' | 'created_at'>) {
    const response = await axiosInstance.post<Visit>('/api/visits/', visit);
    return response.data;
  },

  async deleteVisit(visitId: string) {
    const response=await axiosInstance.delete(`/api/visits/${visitId}/`);
    return response.data;
  },

  async addDisease(disease: Omit<Disease, 'id'>) {
    const response = await axiosInstance.post<Disease>('/api/diseases/', disease);
    return response.data;
  },

  async deleteDisease(diseaseId: string) {
    await axiosInstance.delete(`/api/diseases/${diseaseId}/`);
  },

  async addAppointment(appointment: Omit<Appointment, 'id'>) {
    const response = await axiosInstance.post<Appointment>('/api/appointments/', appointment);
    return response.data;
  },

  async deleteAppointment(appointmentId: string) {
    await axiosInstance.delete(`/api/appointments/${appointmentId}/`);
  },
};