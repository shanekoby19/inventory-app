import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from '../pages/Login'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    }, {
        path: '/warehouses',
        element: <Layout />,
        loader: async() => {
            const response = await fetch('http://localhost:8000/warehouses', {
                method: 'GET',
                credentials: 'same-origin'
            });
            const warehouses = await response.json();
            return warehouses;
        },
        children: [{
            index: true,
            element: <Home />
        }]
    }
]);

export default router;