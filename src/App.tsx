import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Appointments from './pages/Appointments';
import Patients from './pages/Patients';
import Telemedicine from './pages/Telemedicine';
import Prescriptions from './pages/Prescriptions';
import Billing from './pages/Billing';
import Notifications from './pages/Notifications';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import AccountantPage from './pages/AccountantPage';
import Login from './pages/Login';
import PatientDetails from './pages/PatientDetails';
import { ThemeProvider } from './context/ThemeContext';

const mockPatients = [
  {
    id: '1',
    name: 'John Doe',
    age: 30,
    gender: 'male',
    history: ['Fever', 'Cough'],
    prescriptions: ['Paracetamol', 'Cough syrup'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    age: 25,
    gender: 'female',
    history: ['Headache', 'Sore throat'],
    prescriptions: ['Ibuprofen', 'Cough syrup'],
  },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [patientData, setPatientData] = React.useState(mockPatients);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />} />
            <Route path="dashboard" element={<ProtectedRoute component={Dashboard} isAuthenticated={isAuthenticated} />} />
            <Route path="appointments" element={<ProtectedRoute component={Appointments} isAuthenticated={isAuthenticated} />} />
            <Route path="patients" element={<ProtectedRoute component={Patients} props={{ patients: patientData }} isAuthenticated={isAuthenticated} />} />
            <Route path="telemedicine" element={<ProtectedRoute component={Telemedicine} isAuthenticated={isAuthenticated} />} />
            <Route path="prescriptions" element={<ProtectedRoute component={Prescriptions} isAuthenticated={isAuthenticated} />} />
            <Route path="billing" element={<ProtectedRoute component={Billing} isAuthenticated={isAuthenticated} />} />
            <Route path="notifications" element={<ProtectedRoute component={Notifications} isAuthenticated={isAuthenticated} />} />
            <Route path="messages" element={<ProtectedRoute component={Messages} isAuthenticated={isAuthenticated} />} />
            <Route path="settings" element={<ProtectedRoute component={Settings} isAuthenticated={isAuthenticated} />} />
            <Route path="patient/:id" element={<ProtectedRoute component={PatientDetails} isAuthenticated={isAuthenticated} props={{ patients: patientData }} />} />
            <Route path="accountant" element={<ProtectedRoute component={AccountantPage} isAuthenticated={isAuthenticated} />} />
            
          </Route>
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;