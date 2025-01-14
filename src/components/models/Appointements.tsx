import axios from "axios";

interface Appointment {
    ID: number;
    PatientID: number;
    Date: string;
    Time: string;
    Type: string;
}

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axios.get('http://localhost:3001/appointments');
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};