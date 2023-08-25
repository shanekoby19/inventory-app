import React from 'react';
import { useLoaderData } from 'react-router';
import List from '../components/List';

import '../styles/pages/Home.scss';

const Home = () => {
    const warehouses = useLoaderData();

    return(
        <section className='home'>
            <h1 className='primary__heading'>Warehouses</h1>
            <List list={warehouses}/>
        </section>
    )
}

export default Home;