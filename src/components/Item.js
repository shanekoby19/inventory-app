import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFetcher } from 'react-router-dom';

import PrimaryButton from './PrimaryButton';

import '../styles/components/Item.scss';

const Item = ({ data, resource }) => {
    const { _id, name } = data;
    const btnName = resource.slice(-3) === 'ves' ? `${resource.slice(0, -3)}f` : resource.slice(0, -1)
    const navigate = useNavigate();
    const fetcher = useFetcher();

    const [itemName, setItemName] = useState(name);

    return (
        <fetcher.Form className='item' method="post" action={`/${resource.toLowerCase()}/${_id}`}>
            <div className='item__input'>
                <input 
                    className="item__name"
                    name="name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                ></input>
            </div>

            <div className='item__btns'>
                <PrimaryButton 
                    text={`Go To ${btnName}`} 
                    handleClick={() => navigate(`/${resource.toLowerCase()}/${_id}`)} 
                />
                <PrimaryButton 
                    text={`Delete ${btnName}`} 
                    type="submit"
                    name="intent"
                    value="delete"
                />
                { 
                    itemName !== name && 
                    <PrimaryButton
                        text={`Update ${btnName}`}
                        type="submit"
                        name="intent"
                        value="update"
                    />
                }
            </div> 
        </fetcher.Form>
    )
}

export default Item;