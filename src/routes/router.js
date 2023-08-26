import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from '../pages/Login'
import Warehouse from '../pages/Warehouse';
import Shelf from '../pages/Shelf';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    }, 
    {
        path: '/warehouses',
        element: <Layout />,
        children: [{
            index: true,
            element: <Home />,
            loader: async() => {
                const response = await fetch('http://localhost:8000/warehouses', {
                    method: 'GET',
                    credentials: 'include'
                });
                const { warehouses, message } = await response.json();
                if(message) {
                    throw new Error(message);
                }
                return warehouses;
            }
        }, {
            path: '/warehouses/:id',
            element: <Warehouse />,
            loader: async({ params }) => {
                const response = await fetch(`http://localhost:8000/warehouses/${params.id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const { warehouse, message } = await response.json();
                if(message) {
                    throw new Error(message);
                }
                return warehouse;
            }
        }]
    },
    {
        path: '/shelves/:id',
        element: <Layout />,
        children: [{
            index: true,
            element: <Shelf />,
            loader: async({ params }) => {
                const response = await fetch(`http://localhost:8000/shelves/${params.id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const { shelf, message } = await response.json();
                if(message) {
                    throw new Error(message);
                }
                return shelf;
            }
        }]
    }
]);

export default router;