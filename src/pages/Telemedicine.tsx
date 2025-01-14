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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{info.name}</h2>
      <p>Age: {info.age}</p>
      <p>Condition: {info.diseases}</p>
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
  const  patients  = usePatients();

 

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
          value={selectedClient?.id || ""}
          onChange={(e) => {
            const client = patients?.find(client => client.id === e.target.value) || null;
            setSelectedClient(client);
          }}
        >
          {patients?.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
          {/* Add more clients as needed */}
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
