import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Appointment, usePatients } from '../hooks/usePatients';
import { useEffect, useState } from 'react';
import axiosInstance from '../components/models/AxiosInstance';
import axios from 'axios';
import { LoadingSkeleton } from './LoadingSkeleton';
import { useNavigate } from 'react-router-dom';
import { daysInWeek } from 'date-fns/constants';
import { format,parse } from 'date-fns';
import { Loader2 } from 'lucide-react';






function Dashboard() {
  // Sample data for charts


  const Months_dict: { [key: number]: string } = {
    1:"January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
  }

  const get_day = (date: string) => {
    const d = parse(date, 'yyyy-MM-dd', new Date());
    return format(d, 'EEEE');
  };
  const get_month=(date:string)=>{
    const d=parse(date, 'yyyy-MM-dd', new Date());
    return Months_dict[d.getMonth()+1];
  }
  const navigate = useNavigate();
  const [data,SetData]=useState({
      patients_count: 0,
      today_appointments: 0,
      diseases: [],
      medications: [],
      treatments: [],
      today_app: [],
      last_week_visits_by_day: [] as {
        date: string,
        count: number
      }[],
      revenue_per_month: [] as {
        month: string,
        total_revenue: number,
      }[],
      patients_by_age: [] as {
        age_category: string,
        count: number,
      }[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const d = await axiosInstance.get('/api/statistics/');
        SetData(d.data);
        console.log("this week appointmetns: ",d.data.last_week_visits_by_day);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchData();
  }, []);
  

  const today_appointments=data.today_app;
  const appointmentData = data.last_week_visits_by_day.map((d, index) => ({ day: get_day(d.date), appointments: d.count }));

  const revenueData = data.revenue_per_month.map((d, index) => ({ month: get_month(d.month).slice(0,3), revenue: d.total_revenue }));

  const patientAgeData = data.patients_by_age.map((d) => ({ name: d.age_category, value: d.count }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const { patients, loading, error } = usePatients();
  const Tpatients=patients.slice(0, 10);
  
  if(loading){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='animate-spin' />
      </div>
    )
  }


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
            {today_appointments.length>0 ? today_appointments.slice(0,3).map((appt : Appointment, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{format(parse(appt.time, 'HH:mm:ss', new Date()), 'HH:mm')}</p>
                  <p className="text-sm text-gray-600">{patients?.length>0 && patients.find((p) => p.id.toString() === appt.pat.toString())?.name}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full">
                  {appt.status}
                </span>
              </div>
            )): <div className="flex items-center justify-center text-gray-600 text-xl">No appointments today</div>}
            
            {today_appointments.length>3  && <div className="flex cursor-pointer items-center justify-center border-t-[2px] border-gray-200 p-0 m-0 w-full text-gray-700 text-xl" onClick={()=>navigate('/appointments')} >
                .....
              </div>}
          </div>
        </div>

        {/* Patient Stats */}
        {loading ? (
          <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
          <div key={item} className="flex justify-between items-center">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Patient Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Patients</span>
          <span className="font-semibold text-gray-800">{data.patients_count}</span>
              </div>
              <div className="flex justify-between items-center">
          <span className="text-gray-600">New This Week</span>
          <span className="font-semibold text-gray-800">28</span>
              </div>
              <div className="flex justify-between items-center">
          <span className="text-gray-600">Appointments Today</span>
          <span className="font-semibold text-gray-800">{data.today_appointments}</span>
              </div>
            </div>
          </div>
        )}

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
              labelLine={true}
              outerRadius={200}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
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
              {Tpatients?.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{patient.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {Array.isArray(patient.disease) ? 
                        patient.diseases.map((d, index) => (
                          <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">
                            {d.name}
                          </span>
                        )) : 
                        <span className="text-gray-500">No diseases</span>
                      }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {patient.prescriptions.map((prescription, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-800 mr-2">
                        {prescription.medication}
                      </span>
                    )  )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {patient.treatment?.slice(0, 20)}
                    {patient.treatment && patient.treatment.length > 20 && <span>.....</span>}
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