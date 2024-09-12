"use client";

import React, { useReducer } from 'react';

interface State {
  hasError: boolean;
}

interface Action {
  type: 'SET_ERROR';
  error: Error;
}

const initialState: State = {
  hasError: false,
};

const errorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { hasError: true };
    default:
      return state;
  }
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(errorReducer, initialState);

  const handleError = (error: Error) => {
    dispatch({ type: 'SET_ERROR', error });
  };

  if (state.hasError) {
    return <div>Error occurred</div>;
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default ErrorBoundary;
