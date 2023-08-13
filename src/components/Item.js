

import '../styles/components/Item.scss';

const Item = ({ data }) => {
    const { name, description, quantity } = data;

    return (
        <div className='item'>
            <h2 className="item__name">{name}</h2>
        </div>
    )
}

export default Item;