import {useContext, useState} from "react";
import LoginRequestView from "../../models/LoginRequestView";
import CurrentUserContext, {CurrentUserContextType} from "../../contexts/CurrentUserContext";

export const LoginPage: React.FC<{  }> = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function attemptLogin() {
        const url = `http://localhost:8080/api/login/authenticate`;
        // Check fields are filled in
        if(username !== '' && password !== '') {
            const loginRequest = new LoginRequestView(username, password);
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest)
            };

            const loginResponse = await fetch(url, requestOptions);
            if(!loginResponse.ok) {
                throw new Error('Something went wrong');
            }
            const loginResponseJson = await loginResponse.json();
            const loadedLogin: CurrentUserContextType = ({
                userId: loginResponseJson.userId,
                role: loginResponseJson.role
            })
            setCurrentUser(loadedLogin);

        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className='form-signin w-100 m-auto'>
            <form>
                <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
                <div className='form-floating'>
                    <input id='usernameInput' className='form-control' type='text' placeholder='Username'
                           onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor='usernameInput'>Username</label>
                </div>
                <div className='form-floating'>
                    <input id='passwordInput' className='form-control' type='password' placeholder='Password'
                           onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor='passwordInput'>Password</label>
                </div>
                <button className='btn btn-primary w-100 py-2 mt-3' type='submit'>Sign in</button>
            </form>
        </div>
    );
};