import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { CurrentUserContext } from '../../context/currentUserContext';
import {
    MainPage,
    SignInPage,
    SignUpPage,
    Profile,
    MoviesPage,
    SavedMoviesPage,
    NotFoundPage
} from '../../pages';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {mainApi} from '../../utils/MainApi';


function App() {
    const [currentUser, setCurrentUser] = useState({
        isLoggedIn: false,
      });
    
      const [isChecked, setIsChecked] = useState(false);
    
      useEffect(() => {
        mainApi.getCurrentUser()
          .then((user) => {
            setCurrentUser({
              name: user.name,
              email: user.email,
              id: user._id,
              isLoggedIn: true,
            })
          })
          .catch((err) => {
            setCurrentUser({
              name: '',
              email: '',
              id: '',
              isLoggedIn: false,
            });
            sessionStorage.removeItem('searchValue');
            sessionStorage.removeItem('movies');
            sessionStorage.removeItem('checkbox');
            console.log(`Error ${err.status}: ${err.text}`) //TODO возможно потом поправить 
          })
          .finally(() => setIsChecked(true));
      }, [])
    return (
<CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<MainPage />} />
          <Route path={'/signin'} element={<SignInPage></SignInPage>} />
          <Route path={'/signup'} element={<SignUpPage></SignUpPage>} />
          {isChecked &&
          <>
          <Route element={<PrivateRoute />}> */Защищённые роуты/*
            <Route path={'/profile'} element={<Profile></Profile>} />
            <Route path={'/movies'} element={<MoviesPage></MoviesPage>} />
            <Route path={'/saved-movies'} element={<SavedMoviesPage></SavedMoviesPage>} />
          </Route>
          <Route path={'*'} element={<NotFoundPage></NotFoundPage>} />
        </>
      }
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App; 
