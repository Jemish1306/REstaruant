import { createContext, useContext, useState } from 'react';

// Create a Context for the profile
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    img: 'https://via.placeholder.com/150',
    name: 'John Doe',
    restaurant: 'Does Diner',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'Male',
    city: 'Springfield',
    state: 'IL',
    country: 'USA',
    address: '1234 Elm Street, Springfield, IL, USA',
  });

  const updateProfile = (updatedData) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedData,
    }));
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  return useContext(ProfileContext);
};
