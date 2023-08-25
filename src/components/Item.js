import { useNavigate, useLocation } from 'react-router';

import PrimaryButton from './PrimaryButton';

import '../styles/components/Item.scss';

const Item = ({ data }) => {
    const { name, description, quantity } = data;
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className='item'>
            <h2 className="item__name secondary__heading">{name}</h2>
            <PrimaryButton text="Go To Warehouse" handleClick={() => navigate(`${pathname}/${data._id}`)} />
        </div>
    )
}

export default Item;