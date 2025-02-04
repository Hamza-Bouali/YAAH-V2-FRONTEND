import React, { useState, useEffect } from "react"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { format, parse } from "date-fns"
import type { Appointment } from "./models/Appointements"

interface AppointmentModalProps {
  appointment?: Appointment
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  addAppointment: (newAppointment: Appointment) => void
  selectedClient: string
  setSelectedClient: React.Dispatch<React.SetStateAction<string>>
  openClientModal: () => void
  selectedDateTime: { date: string; time: string } | null
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  open,
  setOpen,
  addAppointment,
  selectedClient,
  openClientModal,
  selectedDateTime,
}) => {
  const [date, setDate] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [place, setPlace] = useState<"In-person" | "Virtual">("In-person")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClient || !date || !time || !place) {
      alert("Please fill in all fields")
      return
    }
  
    // Convert 12-hour format time to 24-hour format
    const formattedTime = format(
      parse(time, 'hh:mm a', new Date()),
      'HH:mm:ss'
    )
  
    const newAppointment: Omit<Appointment, "id"> = {
      pat: selectedClient,
      date,
      time: formattedTime,
      status: "scheduled",
      notes: "",
      place: place as "In-person" | "Virtual", // Convert to lowercase
    }
  
    addAppointment(newAppointment)
    setOpen(false)
  }

  const modalRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setTime("")
        setDate("")
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    if (selectedDateTime) {
      setDate(selectedDateTime.date)
      setTime(selectedDateTime.time)
    }
    

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, selectedDateTime])

  return (
    <Dialog open={open} ref={modalRef} onClose={() => setOpen(false)} className="relative z-20">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 mb-4">
                New Appointment
              </DialogTitle>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client</label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={selectedClient}
                      readOnly
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Select a client"
                    />
                    <button
                      type="button"
                      onClick={openClientModal}
                      className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Select
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={date?.toString()}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-white border-2 h-6 shadow-sm focus:border-blue-200 focus:ring-blue-500"
                    >
                  <option value="">Select time</option>
                  {timeSlots.map((timeSlot) => (
                    <option key={timeSlot} value={timeSlot}>
                      {timeSlot}
                    </option>
                  ))}
                </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Appointment Mode</label>
                  <div className="mt-1 flex space-x-4">
                    <div className="flex items-center">
                      <input
                        id="In-person"
                        name="appointment-mode"
                        type="radio"
                        checked={place === "In-person"}
                        onChange={() => setPlace("In-person")}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="In-person" className="ml-2 block text-sm text-gray-700">
                        In-person
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="Virtual"
                        name="appointment-mode"
                        type="radio"
                        checked={place === "Virtual"}
                        onChange={() => setPlace("Virtual")}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="Virtual" className="ml-2 block text-sm text-gray-700">
                        Virtual
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:col-start-2"
                  >
                    Add Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default AppointmentModal;