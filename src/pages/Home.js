import React from 'react';
import { useLoaderData } from 'react-router';
import List from '../components/List';

import '../styles/pages/Home.scss';

const Home = () => {
    const warehouses = useLoaderData();

    return(
        <section className='home'>
            <List list={warehouses} resource='Warehouses'/>
        </section>
    )
}

export default Home;