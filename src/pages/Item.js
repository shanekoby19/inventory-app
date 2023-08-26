import { useLoaderData } from 'react-router';

const Item = () => {
    const { name, description, quantity } = useLoaderData();

    return (
        <div>
            <h1 className='primary__heading'>Items</h1>
            <h2>{name}</h2>
            <h2>{description}</h2>
            <h2>{quantity}</h2>
        </div>
    )
}

export default Item;