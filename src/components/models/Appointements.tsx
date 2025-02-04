import axiosInstance from "./AxiosInstance"

export interface Appointment {
  id?: string
  pat: string
  date: string
  time: string
  status: string
  place: "in-person" | "virtual"
  notes: string
}

export const getAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await axiosInstance.get("/api/appointments/")
    return response.data
  } catch (error) {
    console.error("Error fetching appointments:", error)
    throw error
  }
}

const getPatientUUID = async (patientName: string): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/api/patients/`)
    const patient = response.data.find((patient: { name: string }) => patient.name === patientName)

    if (!patient) {
      throw new Error(`Patient not found: ${patientName}`)
    }
    return patient.id
  } catch (error) {
    console.error("Error fetching patient UUID:", error)
    throw error
  }
}

export const addAppointment = async (appointment: Omit<Appointment, "id">): Promise<Appointment> => {
  try {
    // Convert the patient name to a UUID if necessary
    const patientUUID = await getPatientUUID(appointment.pat)

    const appointmentData = {
      ...appointment,
      pat: patientUUID,
      date: appointment.date,
      time: appointment.time,
      place: appointment.place, // Keep the original case
    }

    const response = await axiosInstance.post("/api/appointments/", appointmentData)
    return response.data
  } catch (error) {
    console.error("Error adding appointment:", error)
    throw error
  }
}

export const updateAppointment = async (appointment: Appointment): Promise<Appointment> => {
  try {
    const response = await axiosInstance.put(`/api/appointments/${appointment.id}`, appointment)
    return response.data
  } catch (error) {
    console.error("Error updating appointment:", error)
    throw error
  }
}

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/api/appointments/${id}/`)
  } catch (error) {
    console.error("Error deleting appointment:", error)
    throw error
  }
}