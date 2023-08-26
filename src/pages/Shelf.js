import { useLoaderData } from 'react-router';

import List from '../components/List';

const Shelf = () => {
    const { containers, items } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Containers</h1>
            <List list={containers} btnName="Container" customPath={`../../containers`}  />

            <h1 className='primary__heading'>Items</h1>
            <List list={items} btnName="Item" customPath={`../../items`} />
        </div>
    )
}

export default Shelf;