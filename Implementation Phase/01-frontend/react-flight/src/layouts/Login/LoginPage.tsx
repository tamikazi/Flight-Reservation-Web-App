import {useContext, useState} from "react";
import CurrentUserContext, {CurrentUserContextType} from "../../contexts/CurrentUserContext";
import {useHistory} from 'react-router-dom'

export const LoginPage: React.FC<{ setUser: any }> = (props) => {
    const currentUser = useContext(CurrentUserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Displays
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function attemptLogin() {
        // Check fields are filled in
        if(username !== '' && password !== '') {
        const url = `http://localhost:8080/api/login/${username}/${password}`;
            // const loginRequest = new LoginRequestView(username, password);
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(loginRequest)
            // };

            const loginResponse = await fetch(url);
            if(loginResponse.status === 401) {
                setDisplayWarning(true);
                setDisplaySuccess(false);
                return
            } else if (!loginResponse.ok) {
                throw new Error('Something went wrong');
            }
            const loginResponseJson = await loginResponse.json();
            const loadedLogin: CurrentUserContextType = ({
                userId: loginResponseJson.userID,
                role: loginResponseJson.roleID
            })
            props.setUser(loadedLogin);
            setDisplayWarning(false);
            setDisplaySuccess(true);

            // Delay some time then redirect
            setTimeout(() => {history.push('/')}, 1000);

        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className='form-signin w-100 mx-auto mt-5'>
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
                <button type='button' className='btn btn-primary w-100 py-2 mt-3 mb-3' onClick={attemptLogin}>
                    Sign in
                </button>
                {displaySuccess &&
                    <div className='alert alert-success' role='alert'>
                        <h5>Logged in, role is {currentUser.role}</h5>
                        <h5>Redirecting...</h5>
                    </div>
                }
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        Login failed
                    </div>
                }
            </form>

        </div>
    );
};