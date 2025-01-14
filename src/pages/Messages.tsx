import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { PatientData } from '../hooks/usePatients';


// Types

interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'other';
}

interface Conversation {
  id: number;
  Patient: PatientData | null;
  lastMessage: string;
  time: string;
  unread: number;
  status: 'online' | 'offline' | 'away';
  messages: Message[];
}

// Helper Components
const Avatar = ({ name, className = '' }: { name: string; className?: string }) => (
  <div className={`bg-blue-100 rounded-full flex items-center justify-center ${className}`}>
    <span className="text-blue-600 font-medium">
      {name.split(' ').map((n) => n[0]).join('')}
    </span>
  </div>
);

const MessageBubble = ({ message }: { message: Message }) => (
  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div 
      className={`rounded-lg p-3 max-w-[70%] ${
        message.sender === 'user' ? 'bg-blue-50' : 'bg-gray-100'
      }`}
    >
      <p className="text-sm">{message.content}</p>
      <span className="text-xs text-gray-500">{message.timestamp}</span>
    </div>
  </div>
);

// Main Component
const Messages = () => {
  // Initial state with sample data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      Patient: {
        id: '1',
        name: 'John Doe',
        prescription: [
          {
            medication: 'Medication A',
            dosage: '10mg',
            frequency: 'Once a day',
            status: 'Active',
            duration: '30 days',
            startDate: '2024-02-15',
            endDate: '2024-03-15',
          }
        ],
        age: 30,
        treatment: 'None',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        lastVisit: '2024-02-15',
        dob: '1994-05-20',
        bloodType: 'O+',
        diseases: ['Hypertension'],
        nextAppointment: '2024-03-15',
        address: '123 Main St, Anytown, USA',
        medications: ['Medication A', 'Medication B'],
        allergies: ['Peanuts', 'Shellfish'],
        recentVisits: [
          {
            date: '2023-12-01',
            reason: 'Routine Checkup',
            doctor: 'Dr. Smith',
          }
        ]
      },
      lastMessage: 'Thank you for the prescription, doctor.',
      time: '5m ago',
      unread: 2,
      status: 'online',
      messages: [
        {
          id: '1',
          content: 'Thank you for the prescription, doctor.',
          timestamp: '10:30 AM',
          sender: 'other'
        },
        {
          id: '2',
          content: "You're welcome! Remember to take it as prescribed.",
          timestamp: '10:31 AM',
          sender: 'user'
        }
      ]
    },
    {
      id: 2,
      Patient: {
        id: '2',
        name: 'Jane Doe',
        prescription: [
          {
            medication: 'Medication A',
            dosage: '10mg',
            frequency: 'Once a day',
            status: 'Active',
            duration: '30 days',
            startDate: '2024-02-15',
            endDate: '2024-03-15',
          }
        ],
        age: 30,
        treatment: 'None',
        email: 'jane.doe@example.com',
        phone: '(555) 123-4567',
        lastVisit: '2024-02-15',
        dob: '1994-05-20',
        bloodType: 'O+',
        diseases: ['Hypertension'],
        nextAppointment: '2024-03-15',
        address: '123 Main St, Anytown, USA',
        medications: ['Medication A', 'Medication B'],
        allergies: ['Peanuts', 'Shellfish'],
        recentVisits: [
          {
            date: '2023-12-01',
            reason: 'Routine Checkup',
            doctor: 'Dr. Smith',
          }
        ]
      },
      lastMessage: 'When should I schedule my next appointment?',
      time: '1h ago',
      unread: 0,
      status: 'offline',
      messages: [
        {
          id: '1',
          content: 'When should I schedule my next appointment?',
          timestamp: '9:45 AM',
          sender: 'other'
        }
      ]
    }
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedConversation?.messages]);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conv =>
    conv.Patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMessage,
          time: 'Just now'
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMsg]
    });
  };

  return (
    <div className="m-8 bg-white rounded-lg shadow-lg">
      <div className="p-0">
        <div className="flex justify-between items-center p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
        </div>

        <div className="bg-white rounded-xl flex h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <div className="w-1/3 border-r">
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
            <div className="divide-y overflow-y-auto">
              {filteredConversations.map((conversation) => (
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
                      {conversation.lastMessage}
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
                {selectedConversation.messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
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