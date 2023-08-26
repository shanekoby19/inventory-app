import { useLoaderData } from "react-router"
import List from '../components/List'


const Warehouse = () => {
    const { shelves, containers, items } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Shelves</h1>
            <List list={shelves} btnName="Shelf" customPath={`../../shelves`} />

            <h1 className='primary__heading'>Containers</h1>
            <List list={containers} btnName="Container" customPath={`../../containers`}  />

            <h1 className='primary__heading'>Items</h1>
            <List list={items} btnName="Item" customPath={`../../items`} />
        </div>
    )
}

export default Warehouse;