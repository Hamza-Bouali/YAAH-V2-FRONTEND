import axios from "axios";
import axiosInstance from "./AxiosInstance";

export interface Appointment {
    id: number;
    patientID: number;
    date: string;
    patient: string | null;
    time: string;
    type: string;
    place: string;
}

export const getAppointments = async (): Promise<Appointment[]> => {
    try {
        const response = await axiosInstance.get('http://localhost:8000/api/appointments');
        return response.data;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        throw error;
    }
};

export const addAppointment = async (appointment: Appointment): Promise<void> => {
    try {
        await axios.post('http://localhost:8000/appointments', appointment);
    } catch (error) {
        console.error("Error adding appointment:", error);
        throw error;
    }
};

export const deleteAppointment = async (appointmentID: number): Promise<void> => {
    try {
        await axios.delete(`http://localhost:8000/appointments/${appointmentID}`);
    } catch (error) {
        console.error("Error deleting appointment:", error);
        throw error;
    }
}; 

export const updateAppointment = async (appointment: Appointment): Promise<void> => {
    try {
        await axios.put(`http://localhost:8000/appointments/${appointment.id}`, appointment);
    } catch (error) {
        console.error("Error updating appointment:", error);
        throw error;
    }
};