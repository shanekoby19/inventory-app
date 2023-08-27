import { useLoaderData } from 'react-router';

import List from '../components/List';

const Container = () => {
    const { items } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Items</h1>
            <List list={items} resource='Items' />
        </div>
    )
}

export default Container;