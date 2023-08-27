

import '../styles/components/PrimaryButton.scss';

const PrimaryButton = ({ 
    text="button",
    name,
    value,
    type,
    handleClick=() => undefined,
    customStyles={}
}) => {
    return (
        <button 
            className='primary__button' 
            onClick={handleClick}
            style={customStyles}
            name={name}
            value={value}
            type={type}
        >{text}</button>
    )
}

export default PrimaryButton;