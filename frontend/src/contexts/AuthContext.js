import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const sellerId = localStorage.getItem('seller_id');
    const tokens = localStorage.getItem('sp_api_tokens');
    
    if (sellerId && tokens) {
      const tokenData = JSON.parse(tokens);
      const expirationTime = new Date(tokenData.expires_at).getTime();
      const now = new Date().getTime();
      
      setIsAuthenticated(now < expirationTime);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 