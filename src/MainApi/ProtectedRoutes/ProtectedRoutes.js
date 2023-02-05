import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import myContext from '../../constants/myContext';

//защитить роуты /saved-movies, /profile и /movies авторизацией;
const ProtectedRoutes = () => {
  const { thisuser } = useContext(myContext);
  return (thisuser.isLoggedIn ? <Outlet></Outlet> : <Navigate to={'/'} replace></Navigate>);
};

export default ProtectedRoutes;