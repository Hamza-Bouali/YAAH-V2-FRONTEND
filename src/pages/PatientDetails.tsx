import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PatientData, Visit, Allergy, Prescription,Appointment,Disease } from '../hooks/usePatients';
import { usePatients, PatientService } from '../hooks/usePatients';
import { AlertCircle, Pill, Plus, Trash2 ,User} from 'lucide-react';
import { ArrowLeft,Edit2,Save,X,Calendar,Phone,Mail,Activity  } from 'lucide-react';
import { LoadingSkeleton } from './LoadingSkeleton';
import {format,parse} from 'date-fns';


interface CustomAlertProps {
  children: React.ReactNode;
  className?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ children, className }) => {
  return (
    <div className={`bg-red-500 text-white p-4 rounded-lg ${className}`}>
      {children}
    </div>
  );
};


interface CustomAlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CustomAlertDescription: React.FC<CustomAlertDescriptionProps> = ({ children, className }) => {
  return <p className={`text-sm ${className}`}>{children}</p>;
};

const PatientInfo = ({ patient, isEditing, setPatient }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center space-x-4 mb-6">
      <div className="bg-blue-100 p-3 rounded-full">
        <User className="h-6 w-6 text-blue-600" />
      </div>
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={patient.name}
            onChange={(e) => setPatient((prev: PatientData) => ({ ...prev, name: e.target.value }))}
            className="w-full px-2 py-1 border rounded"
          />
        ) : (
          <h2 className="text-xl font-semibold text-gray-900">{patient.name}</h2>
        )}
        <p className="text-gray-500">Patient ID: {patient.id}</p>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <Calendar className="h-5 w-5 text-gray-400" />
        {isEditing ? (
          <input
            type="date"
            value={patient.dob}
            onChange={(e) => setPatient((prev: PatientData) => ({ ...prev, dob: e.target.value }))}
            className="flex-1 px-2 py-1 border rounded"
          />
        ) : (
          <span className="text-gray-600">DOB: {patient.dob} ({patient.age} years)</span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Phone className="h-5 w-5 text-gray-400" />
        {isEditing ? (
          <input
            type="tel"
            value={patient.phone}
            onChange={(e) => setPatient((prev: PatientData) => ({ ...prev, phone: e.target.value }))}
            className="flex-1 px-2 py-1 border rounded"
          />
        ) : (
          <span className="text-gray-600">{patient.phone}</span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Mail className="h-5 w-5 text-gray-400" />
        {isEditing ? (
          <input
            type="email"
            value={patient.email}
            onChange={(e) => setPatient((prev: PatientData) => ({ ...prev, email: e.target.value }))}
            className="flex-1 px-2 py-1 border rounded"
          />
        ) : (
          <span className="text-gray-600">{patient.email}</span>
        )}
      </div>
      <div className="flex items-center space-x-3">
        <Activity className="h-5 w-5 text-gray-400" />
        {isEditing ? (
          <select
            value={patient.blood_type}
            onChange={(e) => setPatient((prev: PatientData) => ({ ...prev, blood_type: e.target.value }))}
            className="flex-1 px-2 py-1 border rounded"
          >
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <span className="text-gray-600">Blood Type: {patient.blood_type}</span>
        )}
      </div>
    </div>
  </div>
);


interface PatientHeaderProps {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  navigate: (path: string) => void;
  isLoading: boolean;
}

const PatientHeader = ({ 
  isEditing, 
  setIsEditing, 
  handleSave, 
  handleCancel, 
  navigate,
  isLoading 
}: PatientHeaderProps) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/patients')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Patients
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Patient Details</h1>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              disabled={isLoading}
            >
              <Save className="h-4 w-4" />
              <span>{isLoading ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              disabled={isLoading}
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);

interface PatientInfoProps {
  patient: PatientData;
  isEditing: boolean;
  setPatient: (updater: (prev: PatientData) => PatientData) => void;
}

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { patients, refetchPatients } = usePatients();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patient, setPatient] = useState<PatientData | null>(null);

  const [newMedication, setNewMedication] = useState<Omit<Prescription, 'id'>>({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    end_date: '',
    start_date: '',
    status: 'active',
  });

  const [newAllergy, setNewAllergy] = useState<Omit<Allergy, 'id'>>({
    name: '',
    description: '',
  });

  useEffect(() => {
    if (id && patients) {
      const foundPatient = patients.find(p => p.id === id);
      if (foundPatient) {
        setPatient(foundPatient);
        console.log("Allergies: ",foundPatient.Allergies);
        console.log("allergies: ",foundPatient.allergies);
      }
    }
  }, [id, patients]);

  const handleSave = useCallback(async () => {
    if (!patient) return;

    try {
      setIsLoading(true);
      setError(null);
      await PatientService.updatePatient(patient.id, patient);
      await refetchPatients();
      setIsEditing(false);
    } catch (err) {
      setError('Failed to save changes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, refetchPatients]);


  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setError(null);
  }, []);

  const handleAddPrescription = useCallback(async () => {
    if (!patient) return;

    try {
      setIsLoading(true);
      setError(null);
      const createdPrescription = await PatientService.addPrescription(newMedication);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          prescriptions: [...prev.prescriptions, createdPrescription],
          medication: [...prev.medication, createdPrescription.id]
        };
      });
      setNewMedication({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        end_date: '',
        start_date: '',
        status: 'active',
      });
    } catch (err) {
      setError('Failed to add prescription');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, newMedication]);
  const [newDisease, setNewDisease] = useState<Omit<Disease, 'id'>>({
    name: '',
    description: ''
  });
  
  const [newVisit, setNewVisit] = useState<Omit<Visit, 'id' | 'created_at'>>({
    date: '',
    reason: '',
    notes: '',
    hour:''
  });
  
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id'>>({
    date: '',
    time: '',
    doctor: '',
    status: 'scheduled',
    notes: '',
    pat: patient?.id || '',
  });
  
  // Add handler methods
  const handleAddDisease = useCallback(async () => {
    if (!patient) return;
    try {
      setIsLoading(true);
      const createdDisease = await PatientService.addDisease(newDisease);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          diseases: [...prev.diseases, createdDisease],
          disease: [...prev.disease, createdDisease.id]
        };
      });
      setNewDisease({ name: '', description: '' });
    } catch (err) {
      setError('Failed to add disease');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, newDisease]);
  
  const handleDeleteDisease = useCallback(async (diseaseId: string) => {
    if (!patient) return;
    try {
      setIsLoading(true);
      await PatientService.deleteDisease(diseaseId);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          diseases: prev.diseases.filter(d => d.id !== diseaseId),
          disease: prev.disease.filter(id => id !== diseaseId)
        };
      });
    } catch (err) {
      setError('Failed to delete disease');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);
  
  const handleAddVisit = useCallback(async () => {
    if (!patient) return;
    try {
      setIsLoading(true);
      const createdVisit = await PatientService.addVisit(newVisit);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          visits: [...prev.visits, createdVisit],
          visit: [...prev.visit, createdVisit.id]
        };
      });
      setNewVisit({ date: '', reason: '', notes: '' ,hour:''});
    } catch (err) {
      setError('Failed to add visit');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, newVisit]);
  
  const handleDeleteVisit = useCallback(async (visitId: string) => {
    if (!patient) return;
    try {
      setIsLoading(true);
      await PatientService.deleteVisit(visitId);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          visits: prev.visits.filter(v => v.id !== visitId),
          visit: prev.visit.filter(id => id !== visitId)
        };
      });
    } catch (err) {
      setError('Failed to delete visit');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);
  
  const handleAddAppointment = useCallback(async () => {
    if (!patient) return;
    try {
      setIsLoading(true);
      const createdAppointment = await PatientService.addAppointment({
        ...newAppointment,
        pat: patient.id, // Make sure to include the patient ID
        date: newAppointment.date,
        time: format(parse(newAppointment.time, 'HH:mm', new Date()), 'HH:mm:ss'),
        status: "scheduled",
        notes: newAppointment.notes || ""
      });
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          appointments: [...prev.appointments, createdAppointment],
          appointment: [...prev.appointment, createdAppointment.id]
        };
      });
      setNewAppointment({
        date: '',
        time: '',
        doctor: '',
        status: 'scheduled',
        notes: '',
        pat: patient.id || '',
      });
    } catch (err) {
      setError('Failed to add appointment');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, newAppointment]);
  
  const handleDeleteAppointment = useCallback(async (appointmentId: string) => {
    if (!patient) return;
    try {
      setIsLoading(true);
      await PatientService.deleteAppointment(appointmentId);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          appointments: prev.appointments.filter(a => a.id !== appointmentId),
          appointment: prev.appointment.filter(id => id !== appointmentId)
        };
      });
    } catch (err) {
      setError('Failed to delete appointment');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);
  const handleAddAllergy = useCallback(async () => {
    if (!patient) return;

    try {
      setIsLoading(true);
      setError(null);
      const createdAllergy = await PatientService.addAllergy(newAllergy);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          allergies: [...(prev.allergies), createdAllergy.id],
          Allergies: [...(prev.Allergies), createdAllergy]
        };
      });
      setNewAllergy({
        name: '',
        description: ''
      });
    } catch (err) {
      setError('Failed to add allergy');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient, newAllergy]);

  const handleDeleteAllergy = useCallback(async (allergyId: string) => {
    if (!patient) return;

    try {
      setIsLoading(true);
      setError(null);
      await PatientService.deleteAllergy(allergyId);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          allergies: prev.allergies.filter(a => a !== allergyId)
        };
      });
    } catch (err) {
      setError('Failed to delete allergy');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);

  const handleDeletePrescription = useCallback(async (prescriptionId: string) => {
    if (!patient) return;

    try {
      setIsLoading(true);
      setError(null);
      await PatientService.deletePrescription(prescriptionId);
      setPatient(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          prescriptions: prev.prescriptions.filter(p => p.id !== prescriptionId),
          medication: prev.medication.filter(id => id !== prescriptionId)
        };
      });
    } catch (err) {
      setError('Failed to delete prescription');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);

  if (!patient) return <LoadingSkeleton />;

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSave={handleSave}
        handleCancel={handleCancel}
        navigate={navigate}
        isLoading={isLoading}
      />

      {error && (
        <CustomAlert className="max-w-7xl mx-auto mt-4">
          <CustomAlertDescription>{error}</CustomAlertDescription>
        </CustomAlert>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PatientInfo patient={patient} isEditing={isEditing} setPatient={setPatient} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Medications Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
                </div>
              </div>
              {isEditing && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={newMedication.medication}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, medication: e.target.value }))}
                    placeholder="Medication name"
                    className="px-3 py-2 border rounded"
                  />
                  <input
                    type="text"
                    value={newMedication.dosage}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                    placeholder="Dosage"
                    className="px-3 py-2 border rounded"
                  />
                  <input 
                    type="date"
                    value={newMedication.start_date?.toString()}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, start_date: e.target.value }))}
                    placeholder="Start Date"
                    className="px-3 py-2 border rounded"
                  />
                  <input 
                    type="date"
                    value={newMedication.end_date?.toString()}
                    onChange={(e) => setNewMedication(prev => ({ ...prev, end_date: e.target.value }))}
                    placeholder="End Date"
                    className="px-3 py-2 border rounded"
                  />

                  <button
                    onClick={handleAddPrescription}
                    disabled={isLoading}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                  </div>
                  )}

                  <div className="space-y-4">
                  {patient.prescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{prescription.medication}</h4>
                      <p className="text-sm text-gray-600">{prescription.dosage}</p>
                    </div>
                    {isEditing && (
                      <button
                      onClick={() => handleDeletePrescription(prescription.id)}
                      className="text-red-600 hover:text-red-800"
                      >
                      <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                    </div>
                  ))}
                  </div>
                </div>
                {/* Allergies Section */}
                  <div className="bg-white rounded-lg shadow p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                                  <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                                </div>
                              </div>
                              {isEditing && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <input
                                    type="text"
                                    value={newAllergy.name}
                                    onChange={(e) => setNewAllergy(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Allergy name"
                                    className="px-3 py-2 border rounded"
                                  />
                                  <input
                                    type="text"
                                    value={newAllergy.description}
                                    onChange={(e) => setNewAllergy(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Description"
                                    className="px-3 py-2 border rounded"
                                  />
                                  <button
                                    onClick={handleAddAllergy}
                                    disabled={isLoading}
                                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
            
                              <div className="space-y-4">
                                {patient.Allergies?.length>0 && patient.Allergies.map((allergy) => (
                                  <div key={allergy.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div>
                                      <h4 className="font-medium">{allergy.name}</h4>
                                      <p className="text-sm text-gray-600">{allergy.description}</p>
                                    </div>
                                    {isEditing && (
                                      <button
                                        onClick={() => handleDeleteAllergy(allergy.id)}
                                        className="text-red-600 hover:text-red-800"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                        </div>
                        {/* Diseases Section */}
                        <div className="bg-white rounded-lg shadow p-6 mt-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Activity className="h-5 w-5 text-green-600" />
                              <h3 className="text-lg font-semibold text-gray-900">Existing Diseases</h3>
                            </div>
                          </div>
                          {isEditing && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <input
                                type="text"
                                value={newDisease.name}
                                onChange={(e) => setNewDisease(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Disease name"
                                className="px-3 py-2 border rounded"
                              />
                              <input
                                type="text"
                                value={newDisease.description}
                                onChange={(e) => setNewDisease(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Description"
                                className="px-3 py-2 border rounded"
                              />
                              <button
                                onClick={handleAddDisease}
                                disabled={isLoading}
                                className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          )}
                          <div className="space-y-4">
                            {patient.diseases.length > 0 ? (
                              patient.diseases.map((disease) => (
                                <div key={disease.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <h4 className="font-medium">{disease.name}</h4>
                                    <p className="text-sm text-gray-600">{disease.description}</p>
                                  </div>
                                  {isEditing && (
                                    <button
                                      onClick={() => handleDeleteDisease(disease.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No diseases recorded</p>
                            )}
                          </div>
                        </div>

                        {/* Similar modifications for Visits and Appointments sections */}
                        {/* Visits Section */}
                        <div className="bg-white rounded-lg shadow p-6 mt-6 grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="flex items-center space-x-2 mb-4">
                              <Calendar className="h-5 w-5 text-purple-600" />
                              <h3 className="text-lg font-semibold text-gray-900">Visits</h3>
                            </div>
                            {isEditing && (
                              <div className="grid grid-cols-1 gap-4 mb-4">
                                <input
                                  type="date"
                                  value={newVisit.date}
                                  onChange={(e) => setNewVisit(prev => ({ ...prev, date: e.target.value }))}
                                  className="px-3 py-2 border rounded"
                                />
                                <input
                                  type="text"
                                  value={newVisit.reason}
                                  onChange={(e) => setNewVisit(prev => ({ ...prev, reason: e.target.value }))}
                                  placeholder="Visit Reason"
                                  className="px-3 py-2 border rounded"
                                />
                                <input
                                  type="time"
                                  value={newVisit.hour}
                                  onChange={(e) => setNewVisit(prev => ({ ...prev, hour: e.target.value }))}
                                  placeholder="the time"
                                  className="px-3 py-2 border rounded"  
                                />
                                <input
                                  type="text"
                                  value={newVisit.notes}
                                  onChange={(e) => setNewVisit(prev => ({ ...prev, notes: e.target.value }))}
                                  placeholder="Notes (Optional)"
                                  className="px-3 py-2 border rounded"
                                />
                                <button
                                  onClick={handleAddVisit}
                                  disabled={isLoading}
                                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            <div className="space-y-4">
                              {patient.visits.map((visit) => (
                                <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">{visit.date}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{visit.reason}</p>
                                    {visit.notes && (
                                      <p className="text-xs text-gray-500 mt-1">{visit.notes}</p>
                                    )}
                                  </div>
                                  {isEditing && (
                                    <button
                                      onClick={() => handleDeleteVisit(visit.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Appointments Section */}
                          <div>
                            <div className="flex items-center space-x-2 mb-4">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
                            </div>
                            {isEditing && (
                              <div className="grid grid-cols-1 gap-4 mb-4">
                                <input
                                  type="date"
                                  value={newAppointment.date}
                                  onChange={(e) => setNewAppointment(prev => ({ ...prev, date: e.target.value }))}
                                  className="px-3 py-2 border rounded"
                                />
                                <input
                                  type="time"
                                  value={newAppointment.time}
                                  onChange={(e) => setNewAppointment(prev => ({ ...prev, time: e.target.value }))}
                                  className="px-3 py-2 border rounded"
                                />
                                <select
                                  value={newAppointment.status}
                                  onChange={(e) => setNewAppointment(prev => ({ ...prev, status: e.target.value }))}
                                  className="px-3 py-2 border rounded"
                                >
                                  <option value="scheduled">Scheduled</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                <input
                                  type="text"
                                  value={newAppointment.notes}
                                  onChange={(e) => setNewAppointment(prev => ({ ...prev, notes: e.target.value }))}
                                  placeholder="Notes (Optional)"
                                  className="px-3 py-2 border rounded"
                                />
                                <button
                                  onClick={handleAddAppointment}
                                  disabled={isLoading}
                                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            <div className="space-y-4">
                              {patient.appointments.map((appointment) => (
                                <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                  <div>
                                    <div className="flex justify-between">
                                      <span className="font-medium">{appointment.date} at {appointment.time}</span>
                                      <span className={`text-xs px-2 py-1 rounded ${
                                        appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                        'bg-yellow-100 text-yellow-800'
                                      }`}>
                                        {appointment.status}
                                      </span>
                                    </div>
                                    {appointment.notes && (
                                      <p className="text-xs text-gray-500 mt-1">{appointment.notes}</p>
                                    )}
                                  </div>
                                  {isEditing && (
                                    <button
                                      onClick={() => handleDeleteAppointment(appointment.id)}
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>    

                            
                     </div>
                     
          </div>
      </main>
    </div>
  );
};

export default PatientDetails;