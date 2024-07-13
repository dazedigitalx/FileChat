import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAnonymousUser } from '../contexts/AnonymousUserContext'; // Adjust the import path if necessary

const AnonymousRoute = ({ children }) => {
  const { anonymousId } = useAnonymousUser();

  // If anonymousId exists, render the children (Anonymous component), otherwise redirect to login or another page.
  return anonymousId ? children : <Navigate to="/login" />;
};

export default AnonymousRoute;
