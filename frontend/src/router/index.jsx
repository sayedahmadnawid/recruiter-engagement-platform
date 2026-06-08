import {
    createBrowserRouter,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Dashboard from '../pages/Dashboard';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'projects',
                element: <Projects />,
            },
            {
                path: 'contact',
                element: <Contact />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
        ],
    },
]);