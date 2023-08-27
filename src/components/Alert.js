
/**
 * A component to alert the user when something in the UI has changed.
 * @param {message} - The message for the alert
 * @param {statusClass} - A class to determine the state of this alert. ('good', 'bad', 'warn')
 * @returns - An Alert component.
 */
const Alert = ({ message='Saved Successfully', statusClass='good', isHidden=() => true }) => {
    return (
        !isHidden() &&
        <div className={`statusClass`}>
            <p>{message}</p>
        </div>
    )
}

export default Alert