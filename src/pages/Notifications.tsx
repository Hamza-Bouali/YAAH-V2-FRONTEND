import React from 'react';
import { Bell, Check, X } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'appointment',
    message: 'New appointment request from Sarah Wilson',
    time: '5 minutes ago',
    unread: true,
  },
  {
    id: 2,
    type: 'lab',
    message: 'Lab results ready for John Doe',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'prescription',
    message: 'Prescription renewal request from Mike Johnson',
    time: '2 hours ago',
    unread: false,
  },
  // Add more notifications
];

function Notifications() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-blue-600 hover:text-blue-700">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 flex items-start space-x-4 ${
              notification.unread ? 'bg-blue-50' : ''
            }`}
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{notification.message}</p>
              <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;