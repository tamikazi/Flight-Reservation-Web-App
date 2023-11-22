export const LoginPage = () => {
    return (
        <form>
            <h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
            <div className='form-floating'>
                <input id='usernameInput' className='form-control' type='text' placeholder='Username'/>
                <label htmlFor='usernameInput'>Username</label>
            </div>
            <div className='form-floating'>
                <input id='passwordInput' className='form-control' type='password' placeholder='Password'/>
                <label htmlFor='passwordInput'>Password</label>
            </div>
            <button className='btn btn-primary w-100 py-2' type='submit'>Sign in</button>
        </form>
    );
};