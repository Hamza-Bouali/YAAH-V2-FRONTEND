import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { usePatients } from '../hooks/usePatients';

function Dashboard() {
  // Sample data for charts
  const appointmentData = [
    { day: 'Mon', appointments: 12 },
    { day: 'Tue', appointments: 15 },
    { day: 'Wed', appointments: 10 },
    { day: 'Thu', appointments: 18 },
    { day: 'Fri', appointments: 14 },
    { day: 'Sat', appointments: 8 },
    { day: 'Sun', appointments: 5 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 4500 },
    { month: 'May', revenue: 6000 },
    { month: 'Jun', revenue: 5500 },
  ];

  const patientAgeData = [
    { name: '0-18', value: 15 },
    { name: '19-35', value: 40 },
    { name: '36-50', value: 30 },
    { name: '51+', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Sample patient data for diseases, medications, and treatments
  const patientData = usePatients();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Dr. Smith</h1>
        <p className="text-gray-600">Here's what's happening today</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today's Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { time: '09:00 AM', patient: 'John Doe', type: 'Check-up' },
              { time: '10:30 AM', patient: 'Jane Smith', type: 'Follow-up' },
              { time: '02:00 PM', patient: 'Mike Johnson', type: 'Consultation' },
            ].map((appt, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{appt.time}</p>
                  <p className="text-sm text-gray-600">{appt.patient}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  {appt.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Stats */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Patients</span>
              <span className="font-semibold text-gray-800">1,234</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">New This Week</span>
              <span className="font-semibold text-gray-800">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Appointments Today</span>
              <span className="font-semibold text-gray-800">12</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Prescription sent', patient: 'Sarah Wilson', time: '2h ago' },
              { action: 'Lab results received', patient: 'Tom Brown', time: '4h ago' },
              { action: 'Appointment rescheduled', patient: 'Emma Davis', time: '5h ago' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                  <p className="text-xs text-gray-600">{activity.patient}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Graphs and Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Appointments per Day */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointments This Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Patient Age Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Age Distribution</h3>
        <ResponsiveContainer width="100%" height={500}>
          <PieChart>
            <Pie
              data={patientAgeData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {patientAgeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Patient Data: Diseases, Medications, and Treatments */}
      <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Data</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Disease
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medication
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Treatment
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patientData?.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {patient.diseases}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {patient.medications.map((medication, index) => {
                      return (
                        <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">
                          {medication}
                        </span>
                      );
                    })}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {patient.treatment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;