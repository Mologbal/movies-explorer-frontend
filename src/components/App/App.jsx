import React from 'react';
import {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import myContext from '../../constants/myContext';
import ProtectedRoutes from '../../MainApi/ProtectedRoutes/ProtectedRoutes';
import * as ProjectApi from '../../MainApi/MainApi';
import {
    SignIn,
    Main,
    Movies,
    NotFound,
    Profile,
    SavedMovies,
    SignUp,
  } from '../../pages';

function App() {
    const [check, setCheck] = useState(false);
    const [thisuser, setUser] = useState({isLoggedIn: false});

    useEffect(() => {
        ProjectApi
            .getDataUser().then((data) => {
                setUser({...data, isLoggedIn: true})
            })
            .catch((error) => {
                console.log(error);
            })
            . finally(() => setCheck(true));
    }, [])

    return (
        <myContext.Provider
            value={{
                thisuser,
                setUser
            }}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Main></Main>}/>
                    <Route path={'*'} element={<NotFound></NotFound>}/>
                    <Route path={'/signup'} element={<SignUp></SignUp>}/>
                    <Route path={'/signin'} element={<SignIn></SignIn>}/>
                     {check && <> < Route element = { <ProtectedRoutes></ProtectedRoutes> }>
                            <Route path={'/profile'} element={<Profile></Profile>}></Route>
                            <Route path={'/movies'} element={<Movies></Movies>}></Route>
                            <Route path={'/saved-movies'} element={<SavedMovies></SavedMovies>}></Route>
                        </Route>
                    </>
                    }
                </Routes>
            </BrowserRouter>
        </myContext.Provider>
    );
}

export default App;
