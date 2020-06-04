import React, { useState } from 'react';
import './Login.css';
import { login } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login(props) {

    const [userData, setUserData] = useState({});
    const [isLoggedUser, setLoggedUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onInputChange = (event) => {
        event.persist();
        console.log(event);

        setUserData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));
        setErrorMessage('');
        console.log(userData);
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(userData).then(() => {
            console.log('LOGIN SUCCESS');
            setLoggedUser(true);
        })
        .catch((err) => setErrorMessage(err.message));
    };

    return (
        <>
        { isLoggedUser && <Redirect to="/" /> }
         <div className="container-fluid login-wrapper">
             <div className="row">
                <div className="col-12 mt-5">
                    <h1>Task<span>IT</span></h1>
                </div>
             </div>
            
       
            <form className="login-form" onSubmit={onFormSubmit}>
                { errorMessage && <span className="text-danger">{errorMessage}</span> }
                <div className="form-group">
                    <input type="email" name="email" id="email" placeholder="Email" className="form-control" onChange={onInputChange}/>
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="password" placeholder="Password" className="form-control" onChange={onInputChange} />
                </div>
                <button className="btn btn-primary mb-3">Login</button>
                <br/>
                <Link to="/register"> Don't have an account?</Link>
            </form>
        </div>
        </>
    )
}