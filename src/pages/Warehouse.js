import { useLoaderData } from "react-router";

import List from '../components/List'


const Warehouse = () => {
    const { shelves, containers, items } = useLoaderData();

    return (
        <div>
            <List list={shelves} resource='Shelves' />

            <List list={containers} resource='Containers' />

            <List list={items} resource='Items' />
        </div>
    )
}

export default Warehouse;