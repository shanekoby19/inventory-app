
import PrimaryButton from './PrimaryButton';

import '../styles/components/Item.scss';

const Item = ({ data }) => {
    const { name, description, quantity } = data;

    return (
        <div className='item'>
            <h2 className="item__name secondary__heading">{name}</h2>
            <PrimaryButton text="Go To Warehouse" />
        </div>
    )
}

export default Item;