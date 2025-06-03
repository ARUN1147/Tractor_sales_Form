import React, { createContext } from 'react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // No Firebase, so no real notifications.
  const dummyAlerts = []; // can be extended if you want in-app alerts later.

  return (
    <NotificationContext.Provider value={{ alerts: dummyAlerts }}>
      {children}
    </NotificationContext.Provider>
  );
};
