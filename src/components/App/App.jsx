import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {
    SignInPage,
    MainPage,
    MoviesPage,
    SignUpPage,
    Profile,
    SavedMoviesPage,
    NotFoundPage
} from '../../pages';

function App() {
    return (
        <BrowserRouter>
            <Routes>
              {/* Используется элементы из отдельной директории - Pages (react выше 6 версии) */}
                <Route path={'*'} element={<NotFoundPage></NotFoundPage>}></Route>
                <Route path={'/'} element={<MainPage></MainPage>}></Route>
                <Route path={'/signin'} element={<SignInPage></SignInPage>}></Route>
                <Route path={'/signup'} element={<SignUpPage></SignUpPage>}></Route>
                <Route path={'/profile'} element={<Profile></Profile>}></Route>
                <Route path={'/movies'} element={<MoviesPage></MoviesPage>}></Route>
                <Route path={'/saved-movies'} element={<SavedMoviesPage></SavedMoviesPage>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
