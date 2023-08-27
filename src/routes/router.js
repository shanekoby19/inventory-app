import { createBrowserRouter } from "react-router-dom";

// Utility Router logic
import { 
    getAll,
    getById,
    idActions
} from "./utilRouter";

// Pages
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from '../pages/Login'
import Warehouse from '../pages/Warehouse';
import Shelf from '../pages/Shelf';
import Container from "../pages/Container";
import Item from "../pages/Item";

const router = createBrowserRouter([
    {
        /////////////////////////////////// LOGIN /////////////////////////////////
        path: '/',
        element: <Login />,
    }, 
    {
        ////////////////////////////////// WAREHOUSE ///////////////////////////////
        path: '/warehouses',
        element: <Layout />,
        children: [{
            index: true,
            element: <Home />,
            loader: getAll('warehouses'),
        }, {
            path: '/warehouses/:id',
            element: <Warehouse />,
            loader: getById('warehouses'),
            action: idActions('warehouses'),
        }]
    },
    {
        ////////////////////////////////// SHELVES ///////////////////////////////
        path: '/shelves/:id',
        element: <Layout />,
        action: idActions('shelves'),
        children: [{
            index: true,
            element: <Shelf />,
            loader: getById('shelves'),
        }]
    },
    {
        ////////////////////////////////// CONTAINERS ///////////////////////////////
        path: '/containers/:id',
        element: <Layout />,
        action: idActions('containers'),
        children: [{
            index: true,
            element: <Container />,
            loader: getById('containers'),
        }]
    },
    {
        ////////////////////////////////// ITEMS ///////////////////////////////
        path: '/items/:id',
        element: <Layout />,
        action: idActions('items'),
        children: [{
            index: true,
            element: <Item />,
            loader: getById('items'),
        }]
    }
]);

export default router;