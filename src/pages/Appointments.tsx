import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import AppointmentModal from "../components/AppointmentModal"
import ClientModal from "../components/ClientModal"
import {
  type Appointment,
  getAppointments,
  addAppointment,
  deleteAppointment,
} from "../components/models/Appointements"
import { usePatients } from "../hooks/usePatients"
import { format, addDays, startOfWeek, parse } from "date-fns"



function Appointments() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const patients = usePatients().patients
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isClientModalOpen, setIsClientModalOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedDateTime, setSelectedDateTime] = useState<{ date: string; time: string } | null>(null)
  const [selectAppointment, setSelectAppointment] = useState<Appointment | null>(null)

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments()
        setAppointments(data)
      } catch (error) {
        console.error("Failed to fetch appointments", error)
      }
    }
    fetchAppointments()
  }, [])

  const startOfCurrentWeek = startOfWeek(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM"
  ]

  // Add utility functions for time conversion
  const convertTo24Hour = (time12h: string): string => {
    try {
      const date = parse(time12h, 'hh:mm a', new Date())
      return format(date, 'HH:mm:ss')
    } catch (error) {
      console.error("Error converting to 24 hour format:", error)
      return "13:00:00" // Fallback default time
    }
  }

const convertTo12Hour = (time24h: string): string => {
  try {
    // Create a valid date object using the current date and the time
    const date = parse(time24h, 'HH:mm:ss', new Date())
    return format(date, 'hh:mm a')
  } catch (error) {
    console.error("Error converting to 12 hour format:", error)
    return "12:00 AM" // Fallback default time
  }
}


  // Update handleSessionClick
  const handleSessionClick = (date: string, time: string) => {
    setSelectedDateTime({
      date: date,
      time: time // Store the original 12-hour format
    })
    setIsAppointmentModalOpen(true)
  }

  const handleAddAppointment = async (newAppointment: Omit<Appointment, "id">) => {
    try {
      // Ensure we have valid date and time
      if (!selectedDateTime?.date || !selectedDateTime?.time) {
        throw new Error("Invalid date or time selected")
      }

      // Convert the time to 24-hour format
      const time24 = convertTo24Hour(selectedDateTime.time)
      
      const addedAppointment = await addAppointment({
        ...newAppointment,
        status: "scheduled",
        notes: "",
        pat: selectedClient,
        date: selectedDateTime.date,
        time: time24,
        place: newAppointment.place
      })

      setAppointments([...appointments, addedAppointment])
      setIsAppointmentModalOpen(false)
    } catch (error) {
      console.error("Failed to add appointment", error)
      alert("Failed to add appointment. Please try again.")
    }
  }

  const handleDeleteAppointment = async (appointmentId?: string) => {
    if (!appointmentId) return

    if (!confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await deleteAppointment(appointmentId)
      setAppointments(appointments.filter((apt) => apt.id !== appointmentId))
    } catch (error) {
      console.error("Failed to delete appointment", error)
      alert("Failed to delete appointment. Please try again.")
    }
  }

  return (
    <div className="p-8">
      <AppointmentModal
        open={isAppointmentModalOpen}
        setOpen={setIsAppointmentModalOpen}
        addAppointment={handleAddAppointment}
        appointment={appointments.find(
          (apt) => apt.date === selectedDateTime?.date && apt.time === selectedDateTime?.time,
        )}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        openClientModal={() => setIsClientModalOpen(true)}
        selectedDateTime={selectedDateTime}

      />

      <ClientModal
        open={isClientModalOpen}
        setOpen={setIsClientModalOpen}
        clients={patients}
        onSelectClient={(clientName) => {
          setSelectedClient(clientName)
          setIsClientModalOpen(false)
        }}
      />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setIsAppointmentModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => setCurrentDate(addDays(currentDate, -7))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">
            {format(startOfCurrentWeek, "MMMM d")} - {format(addDays(startOfCurrentWeek, 6), "MMMM d, yyyy")}
          </h2>
          <button onClick={() => setCurrentDate(addDays(currentDate, 7))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-8 border-b">
          <div className="border-r">
            <div className="h-12 border-b"></div>
            {timeSlots.map((time) => (
              <div key={time} className="h-20 border-b p-2 text-sm text-gray-500">
                <div>{time}</div>
              </div>
            ))}
          </div>

          {weekDays.map((day) => (
            <div key={format(day, "yyyy-MM-dd")} className="border-r last:border-r-0">
              <div className="h-12 border-b p-2 text-center">
                <div className="font-medium">{format(day, "EEE")}</div>
                <div className="text-sm text-gray-500">{format(day, "d")}</div>
              </div>
              {timeSlots.map((timeSlot) => {
                  const date = format(day, "yyyy-MM-dd")
                  const appointment = appointments.find(
                    (apt) => apt.date === date && 
                    convertTo12Hour(apt.time) === timeSlot
                  )

                  return (
                    <div
                      key={timeSlot}
                      className="h-20 border-b relative cursor-pointer"
                      onClick={() => handleSessionClick(date, timeSlot)}
                    >
                      {appointment ? (
                        <div
                          className={`absolute inset-1 ${
                            appointment.place.toLowerCase() === "virtual" 
                              ?  "bg-blue-200 text-blue-700"  
                              : "bg-green-200 text-green-700" 
                          } rounded p-2 text-sm cursor-pointer hover:bg-opacity-80`}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteAppointment(appointment.id)
                          }}
                        >
                          <div className="font-medium">{
                            patients.find((patient) => patient.id === appointment.pat)?.name
                            }</div>
                          <div className="text-xs">
                            {appointment.place.charAt(0).toUpperCase() + 
                            appointment.place.slice(1)}
                          </div>
                          <div className="text-xs">{(appointment.status)}</div>
                        </div>
                      ) : (
                        <div className="h-full w-full hover:bg-gray-50"></div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appointments;