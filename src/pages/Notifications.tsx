import React from 'react';
import { Bell, Check, X } from 'lucide-react';
import axiosInstance from '../components/models/AxiosInstance';
interface Notification {
  id: number;
  type: 'appointment' | 'lab' | 'prescription';
  title: string;
  subtitle: string;
  created_at: string;
  is_seen: boolean;
}




function Notifications() {

  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get('api/notifications/');
        setNotifications(response.data);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchNotifications();
  }, []);


  const deleteNotification = async (id: number) => {
    try {
      await axiosInstance.delete(`api/notifications/${id}/`);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  }
        
  const markRead = async (id:number) => {
    try {
      await axiosInstance.put(`api/notifications/${id}/`, {
        ...notifications.find((notification) => notification.id === id),
        is_seen: true,
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id ? { ...notification, is_seen: true } : notification 
        )
      );
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }

  const markAllRead = async () => {
    try {
      notifications.map(async (notification) => {
        await axiosInstance.put(`api/notifications/${notification.id}/`, {
          ...notification,
          is_seen: true,
        });
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({ ...notification, is_seen: true }))
      );
    }
    catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }


  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-blue-600 hover:text-blue-700" onClick={()=>markAllRead()} >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 flex items-start space-x-4 ${
              notification.is_seen ? 'bg-blue-50' : ''
            }`}
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-800">{notification.subtitle}</p>
              <p className="text-sm text-gray-500 mt-1">{notification.created_at}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={()=>markRead(notification.id)} >
                <Check className="w-5 h-5 text-green-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => deleteNotification(notification.id)}>
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