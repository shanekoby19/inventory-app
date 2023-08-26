import { useLoaderData } from 'react-router';

import List from '../components/List';

const Container = () => {
    const { items } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Items</h1>
            <List list={items} btnName="Item" customPath={`../../items`} />
        </div>
    )
}

export default Container;