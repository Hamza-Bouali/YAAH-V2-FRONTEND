import axios from 'axios';

/*
    name: "Sarah Johnson",
    id: "#12345",
    age: 42,
    dob: "1981-05-15",
    phone: "(555) 123-4567",
    email: "sarah.j@email.com",
    bloodType: "A+",
    medications: [
      "Lisinopril 10mg - Daily",
      "Metformin 500mg - Twice daily",
      "Atorvastatin 20mg - Evening"
    ],
    allergies: ["Penicillin", "Sulfa drugs"],
    recentVisits: [
      {
        date: "2024-02-15",
        reason: "Regular checkup",
        doctor: "Dr. Smith"
      },
      {
        date: "2023-12-10",
        reason: "Flu symptoms",
        doctor: "Dr. Martinez"
      }
    ]
  } */
export interface PatientData {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string;
    address: string;
    dob: string;
    bloodType: string;
    medications: string[];
    allergies: string[];
    recentVisits: {
        date: string;
        reason: string;
        doctor: string;
    }[];
}

export const getPatients = async (): Promise<PatientData[]> => {
    const response = await axios.get('http://localhost:8000/api/patients');
    return response.data;
}

export const getPatient = async (id: number): Promise<PatientData> => {
    const response = await axios.get(`http://localhost:8000/api/patients/${id}`);
    return response.data;
}

export const addPatient = async (patient: PatientData): Promise<void> => {
    await axios.post('http://localhost:8000/api/patients', patient);
}

export const deletePatient = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/api/patients/${id}`);
}

export const updatePatient = async (patient: PatientData): Promise<void> => {
    await axios.put(`http://localhost:8000/api/patients/${patient.id}`, patient);
}

