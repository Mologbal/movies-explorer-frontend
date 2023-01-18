import { Outlet, Navigate } from 'react-router-dom';
import {useContext} from 'react';
import {CurrentUserContext} from '../../context/currentUserContext';

const PrivateRoute = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    currentUser.isLoggedIn ? <Outlet /> : <Navigate to={'/'} />
  );
};

export default PrivateRoute;