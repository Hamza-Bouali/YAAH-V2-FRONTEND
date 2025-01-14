import { useState, useEffect } from 'react';
import axios from 'axios';
import PatientDataPage from '../pages/PatientData'; // Adjust the import path as needed


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
  medications: string[];
  allergies: string[];
  recentVisits: {
      date: string;
      reason: string;
      doctor: string;
  }[];
}


export const usePatients = () => {
  const [patients, setPatients] = useState<PatientData[]>();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setPatients([
          {
            id: '1',
            name: 'John Doe',
            prescription: [
              {
                medication: 'Medication A',
                dosage: '10mg',
                frequency: 'Once a day',
                status: 'Active',
                duration: '30 days',
                startDate: '2024-02-15',
                endDate: '2024-03-15',
              }
            ],
            age: 30,
            treatment: 'None',
            email: 'john.doe@example.com',
            phone: '(555) 123-4567',
            lastVisit: '2024-02-15',
            dob: '1994-05-20',
            bloodType: 'O+',
            diseases: ['Hypertension'],
            nextAppointment: '2024-03-15',
            address: '123 Main St, Anytown, USA',
            medications: ['Medication A', 'Medication B'],
            allergies: ['Peanuts', 'Shellfish'],
            recentVisits: [
              {
                date: '2023-12-01',
                reason: 'Routine Checkup',
                  doctor: 'Dr. Smith',
              }]
              },
            
          
          {
            id: '2',
            treatment: 'None',
            name: 'Jane Smith',
            diseases: ['None'],
            prescription: [],
            age: 25,
            email: 'jane.smith@example.com',
            phone: '(555) 987-6543',
            lastVisit: '2024-01-10',
            nextAppointment: '2024-02-10',
            address: '456 Elm St, Othertown, USA',
            dob: '1998-08-15',
            bloodType: 'A-',
            medications: ['Medication C'],
            allergies: ['None'],
            recentVisits: [
              {
                date: '2023-11-20',
                reason: 'Flu Symptoms',
                doctor: 'Dr. Johnson',
              },
            ],
          },
        ]);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      }
    };

    fetchPatients();
  }, []);
  /*const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/patients');
        setPatients(response.data);
      } catch (err) {
        setError('Failed to fetch patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);*/

  return  patients /*loading, error*/ ;
};