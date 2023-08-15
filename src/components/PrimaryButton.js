

import '../styles/components/PrimaryButton.scss';

const PrimaryButton = ({ 
    text="button", 
    handleClick=() => undefined,
    customStyles={}
}) => {
    return (
        <button 
            className='primary__button' 
            onClick={handleClick}
            style={customStyles}
        >{text}</button>
    )
}

export default PrimaryButton;