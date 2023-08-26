import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from '../pages/Login'
import Warehouse from '../pages/Warehouse';
import Shelf from '../pages/Shelf';
import Container from "../pages/Container";
import Item from "../pages/Item";

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
    },
    {
        path: '/containers/:id',
        element: <Layout />,
        children: [{
            index: true,
            element: <Container />,
            loader: async({ params }) => {
                const response = await fetch(`http://localhost:8000/containers/${params.id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const { container, message } = await response.json();
                if(message) {
                    throw new Error(message);
                }
                return container;
            }
        }]
    },
    {
        path: '/items/:id',
        element: <Layout />,
        children: [{
            index: true,
            element: <Item />,
            loader: async({ params }) => {
                const response = await fetch(`http://localhost:8000/items/${params.id}`, {
                    method: 'GET',
                    credentials: 'include'
                });
                const { item, message } = await response.json();
                if(message) {
                    throw new Error(message);
                }
                return item;
            }
        }]
    }
]);

export default router;