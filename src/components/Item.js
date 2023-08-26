import { useNavigate } from 'react-router';

import PrimaryButton from './PrimaryButton';

import '../styles/components/Item.scss';

const Item = ({ data, btnName, customPath }) => {
    const { _id, name, description, quantity } = data;
    const navigate = useNavigate();

    return (
        <div className='item'>
            <h2 className="item__name secondary__heading">{name}</h2>
            <PrimaryButton text={`Go To ${btnName}`} handleClick={() => navigate(`${customPath}/${_id}`)} />
        </div>
    )
}

export default Item;