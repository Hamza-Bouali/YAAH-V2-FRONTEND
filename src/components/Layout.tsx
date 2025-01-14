import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  VideoIcon, 
  FileText, 
  Bell, 
  CreditCard,
  Activity,
  MessageSquare,
  Settings,
  LayoutDashboard,
  X,
  Monitor
} from 'lucide-react';

const navItems = [
  { icon: Calendar, text: 'Appointments', path: '/appointments' },
  { icon: Users, text: 'Patients', path: '/patients' },
  { icon: LayoutDashboard, text: 'DashBoard', path: '/Dashboard' },
  { icon: VideoIcon, text: 'Telemedicine', path: '/telemedicine' },
  { icon: FileText, text: 'Prescriptions', path: '/prescriptions' },
  { icon: Monitor, text: 'Accountant', path: '/accountant' },
  { icon: CreditCard, text: 'Billing', path: '/billing' },
  { icon: Bell, text: 'Notifications', path: '/notifications' },
  { icon: MessageSquare, text: 'Messages', path: '/messages' },
  { icon: Settings, text: 'Settings', path: '/settings' },
];

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSidebar, setShowSidebar] = React.useState(true);

  return (
    <div className={`min-h-screen bg-gray-50 `}>
      <div className={`fixed  h-full bg-white shadow-lg ${showSidebar ? 'w-64' : 'w-32'} transformation duration-200 ease-in-out`}>
        <div className={`flex ${showSidebar? 'justify-start': 'justify-center'} `}> 
          <div 
          className="flex items-center p-4 border-b cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Activity className={`h-8 w-8 text-blue-600 `} onClick={()=>{setShowSidebar(true)}} />
          {showSidebar && <span className="ml-2 text-xl font-semibold text-gray-800">YAAH</span>}
        </div>
            {showSidebar && <X className="h-6 w-6 cursor-pointer m-5" onClick={()=>{setShowSidebar(false)}} />}
            
        </div>
        <nav className="p-4">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center w-full p-3 mt-1 rounded-lg ${!showSidebar ? 'justify-center':'justify-start'} transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <item.icon className={` ${showSidebar ? 'text-lg':'text-sm'}`} />
               {showSidebar && <span className="ml-3">{item.text}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;