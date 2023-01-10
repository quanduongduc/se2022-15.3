import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import AppRoute from './routes/AppRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TracksContextProvider from './context/TracksContextProvider';
import PlaylistContextProvider from './context/PlaylistContextProvider';
import TrackContextProvider from './context/TrackContextProvider';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <PlaylistContextProvider>
                    <TracksContextProvider>
                        <TrackContextProvider>
                            <Routes>
                                <Route path="/*" element={<AppRoute />} />
                            </Routes>
                        </TrackContextProvider>
                    </TracksContextProvider>
                </PlaylistContextProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
