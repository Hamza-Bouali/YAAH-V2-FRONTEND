import { useState, useEffect } from 'react';
import axios from 'axios';

export interface PatientData {
  id: string;
  prescription: {
      medication: string;
      dosage: string;
      frequency: string;
      startDate: string;
      endDate: string;
      status: string;
      duration: string;
  }[];
  name: string;
  age: number;
  email: string;
  treatment: string;
  diseases: string[];
  phone: string;
  address: string;
  lastVisit: string;
  dob: string;
  bloodType: string;
  nextAppointment: string;
  allergies: string[];
  recentVisits: {
      date: string;
      reason: string;
      doctor: string;
  }[];
}


export const usePatients = () => {
  const [patients, setPatients] = useState<PatientData[]>();

  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/patients/');
        setPatients(response.data);
      } catch (err) {
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return  patients /*loading, error*/ ;
};