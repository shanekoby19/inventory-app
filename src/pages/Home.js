import React from 'react';
import List from '../components/List';

import '../styles/pages/Home.scss';

const warehouses = [{
    name: "Shane's Warehouse",
    _id: "1"
}]

const Home = () => {
    return(
        <section className='home'>
            <h1 className='primary__heading'>Warehouses</h1>
            <List list={warehouses}/>
        </section>
    )
}

export default Home;