import { useLoaderData } from 'react-router';

import List from '../components/List';

const Shelf = () => {
    const { containers, items } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Containers</h1>
            <List list={containers} resource='Containers'  />

            <h1 className='primary__heading'>Items</h1>
            <List list={items} resource='Items'/>
        </div>
    )
}

export default Shelf;