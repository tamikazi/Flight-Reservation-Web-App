import React, {useState} from "react";
import RegisterView from "../../models/RegisterView";

export const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [card, setCard] = useState(false);

    const [displayWarning, setDisplayWarning] = useState(false);
    const [invalidWarning, setInvalidWarning] = useState(false);
    const [failureWarning, setFailureWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function registerUser() {
        try {
            const url = `http://localhost:8080/api/users/register`

            const userRequest = new RegisterView(
                username,
                password,
                fname,
                lname,
                address,
                card
            )

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userRequest)
            };

            const userResponse = await fetch(url, requestOptions);

            // Check if payment was successful
            if (userResponse.status === 400) {
                setInvalidWarning(true);
                return;
            } else if(!userResponse.ok) {
                setFailureWarning(true);
                return;
            } else {
                setFailureWarning(false);
                setDisplaySuccess(true);
            }
        } catch (error) {
            setFailureWarning(true);
        }
    }

    const signupHandle = () => {
        setDisplayWarning(false);
        setInvalidWarning(false);
        setFailureWarning(false);
        setDisplaySuccess(false);
        if(username !== '' && password !== '' && fname !== '' && lname !== '' && address !== '') {
            registerUser();
        } else {
            setDisplayWarning(true);
        }
    }

    return(
        <div className='container mt-5'>
            <form className='w-50 mx-auto'>
                <div className='row g-3'>
                    <div className='col-12'>
                        <label htmlFor='username' className='form-label'>Email Address</label>
                        <input type='email' id='username' className='form-control'
                               onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type='password' className='form-control' id='password'
                               onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className='col-6'>
                        <label htmlFor='fname' className='form-label'>First Name</label>
                        <input type='text' className='form-control' id='fname'
                               onChange={(e) => setFname(e.target.value)}/>
                    </div>
                    <div className='col-6'>
                        <label htmlFor='lname' className='form-label'>Last Name</label>
                        <input type='text' className='form-control' id='lname'
                               onChange={(e) => setLname(e.target.value)}/>
                    </div>
                    <div className='col-12'>
                        <label htmlFor='address' className='form-label'>Home Address</label>
                        <input type='text' className='form-control' id='address'
                               onChange={(e) => setAddress(e.target.value)}/>
                    </div>
                    <div className='col-12 form-check'>
                        <input className='form-check-input' type='checkbox' name='card' id='card'
                               onChange={() => setCard(!card)}/>
                        <label className='form-check-label' htmlFor='card'>
                            Enroll company credit card
                        </label>
                    </div>
                </div>
                <button type='button' className='btn btn-primary mt-4 mb-3' onClick={signupHandle}>
                    Sign Up
                </button>
                {displayWarning &&
                    <div className='alert alert-danger' role='alert'>
                        All fields must be filled in
                    </div>
                }
                {invalidWarning &&
                    <div className='alert alert-danger' role='alert'>
                        Username already used
                    </div>
                }
                {failureWarning &&
                    <div className='alert alert-danger' role='alert'>
                        Failed to register user
                    </div>
                }
                {displaySuccess &&
                    <div className='alert alert-success' role='alert'>
                        Registration successful
                    </div>
                }
            </form>
        </div>
    );
};