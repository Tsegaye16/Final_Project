import React, { createContext, useContext, useReducer } from 'react';

// Initial state for user
const initialState = {
  user: null,
  role: null,
};

// Action types
const SET_USER = 'SET_USER';
const SET_ROLE = 'SET_ROLE';

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLE:
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

// Create context
const UserContext = createContext();

// Create context provider
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUser = (user) => dispatch({ type: SET_USER, payload: user });
  const setRole = (role) => dispatch({ type: SET_ROLE, payload: role });

  const value = { user: state.user, role: state.role, setUser, setRole };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the context
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUserContext };
