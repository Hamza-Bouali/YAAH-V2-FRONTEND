import React from "react";
import VideoCall from "../components/VideoCall";
import { Video, PhoneOff, Mic, MicOff, VideoOff } from "lucide-react";
import Messages from "./Messages";
import { PatientData } from "../hooks/usePatients";
import { usePatients } from "../hooks/usePatients";

interface ClientInfoProps {
  client: PatientData | null;
}

const ClientInfo: React.FC<ClientInfoProps> = ({ client }) => {
  if (!client) {
    return <div className="text-gray-500">No client selected</div>;
  }

  // Dummy data for demonstration purposes
  const info = client;
  return (
    <div>
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="flex items-center justify-between border-b pb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800">{info.name}</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          Patient
        </span>
      </div>
      
      <div className="grid gap-4">
        <div className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="w-24 font-medium text-gray-700">Age:</span>
          <span className="text-gray-800">{info.age} years</span>
        </div>
        
        <div className="flex items-start bg-gray-50 p-3 rounded-md">
          <span className="w-24 font-medium text-gray-700">Condition:</span>
          <div className="flex flex-wrap gap-2">
            {info.diseases.map((disease, index) => (
              <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                {disease.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="w-24 font-medium text-gray-700">Phone:</span>
          <a href={`tel:${info.phone}`} className="text-blue-600 hover:underline">{info.phone}</a>
        </div>

        <div className="flex items-center bg-gray-50 p-3 rounded-md">
          <span className="w-24 font-medium text-gray-700">Email:</span>
          <a href={`mailto:${info.email}`} className="text-blue-600 hover:underline">{info.email}</a>
        </div>

        <div className="flex items-start bg-gray-50 p-3 rounded-md">
          <span className="w-24 font-medium text-gray-700">Address:</span>
          <span className="text-gray-800">{info.address}</span>
        </div>
      </div>
    </div>
  );
};

function Telemedicine() {
  const [isMicMuted, setIsMicMuted] = React.useState(false);
  const streamRef = React.useRef<MediaStream | null>(null);
  const localVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const [isCallActive, setIsCallActive] = React.useState(false);
  const [selectedClient, setSelectedClient] = React.useState<PatientData | null>(null);
  const  patients  = usePatients().patients;

 

  const handleEndCall = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setIsCallActive(false);
  };
  const handleStartSession = () => {
    if (selectedClient) {
      setIsCallActive(true);
    } else {
      alert("Please select a client to start the session.");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Telemedicine</h1>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleStartSession}
          >
            Start New Session
          </button>
        </div>
      </div>

      {/* Client Selection */}
      <div className="mb-6">
        <label htmlFor="client-select" className="block text-gray-700">Select Client:</label>
        <select
          id="client-select"
          
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedClient?.id || "None selected"}
          onChange={(e) => {
            const client = patients.find((client:PatientData) => client.id === e.target.value) || null;
            setSelectedClient(client);
          }}
        >
          {patients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
          
        </select>
      </div>

      {/* Active Session */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-gray-900 rounded-xl aspect-video relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {isCallActive ? (
                <VideoCall isMicMuted={isMicMuted} isVideoOff={isVideoOff} onEndCall={handleEndCall} />
              ) : (
                <div className="text-white">Call Ended</div>
              )}
            </div>
            {/* Controls */}
            {isCallActive && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
                  onClick={() => setIsMicMuted(!isMicMuted)}
                >
                  {isMicMuted ? <MicOff className="w-6 h-6 text-gray-500" /> : <Mic className="w-6 h-6 text-white" />}
                </button>
                <button
                  className="p-3 bg-gray-800 rounded-full hover:bg-gray-700"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6 text-gray-500" /> : <Video className="w-6 h-6 text-white" />}
                </button>
                <button className="p-3 bg-red-600 rounded-full hover:bg-red-700" onClick={handleEndCall}>
                  <PhoneOff className="w-6 h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Patient Info & Chat */}
        <div>
          <ClientInfo client={selectedClient} />
        </div>
      </div>
    </div>
  );
}

export default Telemedicine;
