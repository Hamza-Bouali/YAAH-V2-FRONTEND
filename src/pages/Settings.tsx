import React, { useEffect, useState } from 'react';
import { User, Lock, Bell, Globe, CreditCard } from 'lucide-react';
import axiosInstance from '../components/models/AxiosInstance';
import { set } from 'date-fns';
// Reusable Navigation Item Component



interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  onClick: () => void;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, text, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full p-3 text-gray-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${
      isActive ? 'bg-blue-50 text-blue-600' : ''
    }`}
    aria-label={text}
  >
    <Icon className="w-5 h-5 mr-3" />
    {text}
  </button>
);

// Reusable Input Field Component
interface InputFieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', value, onChange, placeholder, name }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      />
  </div>
);

// Reusable TextArea Component
interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
    />
  </div>
);

// Security Settings Component
const SecuritySettings = () => (
  <div>
    <h2 className="text-lg font-semibold mb-6">Security Settings</h2>
    <form className="space-y-6">
      <InputField
        value={''}
        onChange={() => {}}
        label="Current Password"
        type="password"
        placeholder="Enter your current password"
      />
      <InputField
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Confirm New Password"
        type="password"
        placeholder="Confirm your new password"
        value=""
        onChange={() => {}}
      />
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

// Notifications Settings Component
const NotificationsSettings = () => (
  <div>
    <h2 className="text-lg font-semibold mb-6">Notifications Settings</h2>
    <form className="space-y-6">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Email Notifications
        </label>
        <input type="checkbox" className="toggle" />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Push Notifications
        </label>
        <input type="checkbox" className="toggle" />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

// Language Settings Component
const LanguageSettings = () => (
  <div>
    <h2 className="text-lg font-semibold mb-6">Language Settings</h2>
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Language
        </label>
        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
        </select>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

// Billing Settings Component
const BillingSettings = () => (
  <div>
    <h2 className="text-lg font-semibold mb-6">Billing Settings</h2>
    <form className="space-y-6">
      <InputField
        label="Card Number"
        type="text"
        placeholder="Enter your card number"
        value=""
        onChange={() => {}}
      />
      <InputField
        label="Card Holder"
        type="text"
        placeholder="Enter your card holder name"
        value=""
        onChange={() => {}}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Expiration Date"
          type="text"
          placeholder="MM/YY"
          value=""
          onChange={() => {}}
        />
        <InputField
          label="CVV"
          type="text"
          placeholder="123"
          value=""
          onChange={() => {}}
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
);

interface UserData
{
  id: string
  password: string
  first_name: string
  phone_number: string
  last_name: string
  email: string
  username: string
  groups: string[]
  user_permissions: string[]
  is_staff: boolean
  is_active: boolean
  is_superuser: boolean
  last_login: string
  date_joined: string
}

function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  
  const [user, setUser] = useState({} as UserData);
  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    specialty: 'General Practice',
    bio: 'Board-certified general practitioner with over 15 years of experience...',
  });
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    await axiosInstance.put('/api/update_user_data/', {
      ...formData,
    })
    .then((response) => {
      console.log(response.data);
    }
    )
    .catch((error) => {
      console.log(error);
    }
    );
  };

  useEffect(() => {
    setFormData({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      specialty: 'General Practice',
      bio: 'Board-certified general practitioner with over 15 years of experience...',
    });
  }, [user]);
  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <>
            <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>
            {/* Profile Photo */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-blue-600 font-medium">DS</span>
                </div>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  Change Photo
                </button>
              </div>
            </div>
            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                type="text"
                value={user.username}
                onChange={() => {}}
                placeholder="Enter your username"
              />
              <InputField
                label="phone number"
                type="text"
                value={user.phone_number}
                onChange={() => {}}
                placeholder="Enter your phone number"
              />
              <InputField
                label="Specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              />
              <TextAreaField
                label="Bio"
                placeholder="bio"
                value={formData.bio}
                onChange={handleChange}
              />
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </>
        );
      case 'Security':
        return <SecuritySettings />;
      case 'Notifications':
        return <NotificationsSettings />;
      case 'Language':
        return <LanguageSettings />;
      case 'Billing':
        return <BillingSettings />;
      default:
        return null;
    }
  };


  useEffect(() => {

    function fetchData()
    {
        axiosInstance.get('/api/get_user_data/')
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      
    }

    fetchData();
  }, []);
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <nav className="space-y-2">
            {[
              { icon: User, text: 'Profile' },
              { icon: Lock, text: 'Security' },
              { icon: Bell, text: 'Notifications' },
              { icon: Globe, text: 'Language' },
              { icon: CreditCard, text: 'Billing' },
            ].map((item) => (
              <NavItem
                key={item.text}
                {...item}
                onClick={() => setActiveTab(item.text)}
                isActive={activeTab === item.text}
              />
            ))}
          </nav>
        </div>

        {/* Main Settings Area */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;