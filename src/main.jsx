import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Pages and Components
import App from './App.jsx';
import Home from './pages/Home.jsx';
import ProductPage from './pages/ProductPage.jsx';
import OurStory from './components/OurStory.jsx';

// Define routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products/:productSlug', element: <ProductPage /> },
            { path: 'our-story', element: <OurStory /> },
        ],
    },
], {
    future: {
        v7_relativeSplatPath: true,
    },
});

// Mount the app
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
