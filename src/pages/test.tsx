import { usePatients } from '../hooks/usePatients';
import { useParams } from 'react-router-dom';


function test() {
  const { patients, loading, error } = usePatients();
    const { id } = useParams();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {patients.map((patient) => (
        <div key={patient.id}>
          <h2>{patient.name}</h2>
          <p>Age: {patient.age}</p>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phone}</p>
          <p>Blood Type: {patient.blood_type}</p>
          <p>Address: {patient.address}</p>
          <p>Treatment: {patient.treatment}</p>
          <h3>Diseases</h3>
          <ul>
            {patient.disease.map((disease) => (
              <li key={disease.id}>{disease.name}</li>
            ))}
          </ul>
          <h3>Allergies</h3>
          <ul>
            {patient.allergies.map((allergy) => (
              <li key={allergy.id}>{allergy.name}</li>
            ))}
          </ul>
          <h3>Visits</h3>
          <ul>
            {patient.visit.map((visit) => (
              <li key={visit.id}>{visit.date} - {visit.reason}</li>
            ))}
          </ul>
          <h3>Appointments</h3>
          <ul>
            {patient.appointment.map((appointment) => (
              <li key={appointment.id}>{appointment.date} at {appointment.time}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default test;