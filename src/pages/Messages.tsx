import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { PatientData } from '../hooks/usePatients';
import axiosInstance from '../components/models/AxiosInstance';

// Types

interface Message {
  id?: string | null;
  doctor: string;
  patient: string;
  text: string;
  sent_by:'doctor' | 'patient';
  created_at: string;
}

interface DoctorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  dob: string;
  username: string;

}

interface Conversation {
  id: number;
  patient: string;
  doctor: string;
  Patient: PatientData;
  Doctor?: DoctorData;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  Messages?: Message[];
  messages?: String[];
  lastMessage?: string;
  created_at?: string;
}

// Helper Components
const Avatar = ({ name, className = '' }: { name: string; className?: string }) => (
  <div className={`bg-blue-100 rounded-full flex items-center justify-center ${className}`}>
    <span className="text-blue-600 font-medium">
      {name.split(' ').map((n) => n[0]).join('')}
    </span>
  </div>
);

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MessageBubble = ({ message }: { message: Message }) => (
  <div className={`flex ${message.sent_by === 'doctor' ? 'justify-end' : 'justify-start'}`}>
    <div 
      className={`rounded-lg p-3 max-w-[70%] ${
        message.sent_by === 'doctor' ? 'bg-blue-50' : 'bg-gray-100'
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <span className="text-xs text-gray-500">{formatDate(message.created_at)}</span>
    </div>
  </div>
);

const Messages = () => {
  // Initial state with sample data
  const [conversations, setConversations] = useState<Conversation[]>();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<PatientData[]>();
  const [doctor, setDoctor] = useState<DoctorData>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Effects
  useEffect(() => {
    
    const fetchData = async () => {
      setLoadingConversations(true);
      setLoadingMessages(true);
      try {
        setLoadingConversations(true);
        const [conversationsRes, patientsRes, doctorRes, messRes] = await Promise.all([
          axiosInstance.get('api/conversations/'),
          axiosInstance.get('api/patients/'),
          axiosInstance.get('api/get_user_data/'),
          axiosInstance.get('api/messages/'),
        ]);

        const conversations = conversationsRes.data;
        const patients = patientsRes.data;
        const doctorData = doctorRes.data;
        const allMessages = messRes.data;

        setPatients(patients);
        setDoctor(doctorData);

        const updatedConversations = conversations.map((conv: Conversation) => {
          const patient = patients.find((p: PatientData) => p.id === conv.patient);
          const messages = allMessages.filter((msg: Message) => msg.id && conv.messages?.includes(msg.id as string));

          if (patient) conv.Patient = patient;
          if (doctorData) conv.Doctor = doctorData;

          conv.Messages = messages;
          return conv;
        });

        setConversations(updatedConversations);
      } catch (e) {
        console.log(e);
      } finally {
        setLoadingConversations(false);
        setLoadingMessages(false);
      }
  
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    fetchData();
  }, [selectedConversation?.messages]);

  // Filter conversations based on search query
  const filteredConversations = conversations;

  // Handlers
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;
  
    const newMsg: Message = {
      text: newMessage,
      created_at: new Date().toISOString(),
      sent_by: 'doctor',
      doctor: doctor?.id || 'Unknown Doctor',
      patient: selectedConversation.patient,
    };
  
    try {
      // Log the doctor object to verify its contents
      console.log('Doctor object:', doctor);
  
      // Send the new message to the backend
      const messageResp = await axiosInstance.post('api/messages/', {
        text: newMessage,
        doctor: selectedConversation.doctor,
        patient: selectedConversation.patient,
        sender: selectedConversation.Patient.id, // Ensure this is a valid primary key
        sent_by: 'doctor',
      });
  
      // Update the conversation with the new message
      const updatedConversations = conversations?.map((conv: Conversation) => {
        if (conv.id === selectedConversation.id) {
          return {
            ...conv,
            messages: [...(conv.messages || []), messageResp.data.message_id],
            Messages: [...(conv.Messages || []), newMsg],
            lastMessage: newMessage,
            created_at: new Date().toISOString(),
          };
        }
        return conv;
      });
  
      // Update the conversation in the backend
      await axiosInstance.put(`api/conversations/${selectedConversation.id}/`, {
        doctor: doctor?.id,
        patient: selectedConversation.patient,
        messages: [...(selectedConversation.messages || []), messageResp.data.message_id],
        lastMessage: newMessage,
      });
  
      // Update the state with the new conversation data
      setConversations(updatedConversations);
      setNewMessage('');
      setSelectedConversation({
        ...selectedConversation,
        Messages: [...(selectedConversation.Messages ?? []), newMsg],
      });
  
      // Scroll to the bottom of the messages
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  if((loadingConversations || loadingMessages) && !conversations) {
    return <div>Loading...</div>
  }

  return (
    <div className="m-8 bg-white rounded-lg shadow-lg">
      <div className="p-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>

        <div className="bg-white rounded-xl flex h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <div className="w-1/3 border-r overflow-y-auto">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="divide-y overflow-y-auto max-h-[calc(100vh-240px)]">
              {filteredConversations?.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-4 ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <Avatar name={conversation.Patient?.name || 'Unknown Patient'} className="w-12 h-12" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {conversation.Patient?.name || 'Unknown Patient'}
                      </h3>
                      <p className="text-xs text-gray-500">{conversation.time}</p>
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {conversation.Messages && conversation.Messages.length > 0
                        ? conversation.Messages[conversation.Messages.length - 1].text
                        : 'No messages yet'}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white">{conversation.unread}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar name={selectedConversation.Patient?.name || 'Unknown Patient'} className="w-10 h-10" />
                  <div>
                    <h3 className="font-medium">{selectedConversation.Patient?.name || 'Unknown Patient'}</h3>
                    <p className="text-sm text-gray-500">{selectedConversation.status}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {selectedConversation.Messages?.length ?? 0 > 0 ? selectedConversation.Messages?.map((message: Message) => (
                  <MessageBubble key={message.id} message={message} />
                )) : (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    No messages yet
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;