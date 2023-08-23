import { React, useState } from 'react';
import { useNavigate } from 'react-router';
import PrimaryButton from '../components/PrimaryButton';

const Login = () => {
    // Hooks
    const navigate = useNavigate();

    // State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const login = async() => {
        try {
            // Sending a GET request using the fetch API
            const response = await fetch('http://localhost:8000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            // Convert the response to json.
            const data = await response.json();
            
            // If an error exists set the error message.
            if(data.message) {
                return setError(data.message);
            }

            // If no error exists login the user.
            navigate('/warehouses')
        } catch(err) {
            console.log(err);
        }
    }

    return(
        <div className='container'>
            <main className='login'>
                { error && <p>{error}</p>}
                <div className='login__form__group'>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email}
                        onChange={handleEmailChange} 
                    ></input>
                </div>
                <div className='login__form__group'>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        onChange={handlePasswordChange} 
                    ></input>
                </div>
                <PrimaryButton 
                    text="Login"
                    handleClick={login}
                />
            </main>
        </div>
    )
}

export default Login;