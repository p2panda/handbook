import React, { useState } from 'react';

export const MessageContext = React.createContext();

export const MessageProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <MessageContext.Provider value={{ error, setError, success, setSuccess }}>
      {children}
    </MessageContext.Provider>
  );
};
