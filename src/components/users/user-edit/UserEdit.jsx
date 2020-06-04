import React, { useState, useEffect } from 'react';
import './UserEdit.css';
import { getUserById, saveUser } from '../../../core/api/users.api';
import { Redirect } from 'react-router-dom';

export function UserEdit(props) {
    console.log(props);

    const [error, setError] = useState('');
    const [editedUser, setEditedUser] = useState({name: '', age: 0, email: '', password: '', isAdmin: false, isActive: false });
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (props.computedMatch.params.id) {
            getUserById(props.computedMatch.params.id).then((currentUser) => {
                console.log(currentUser);
                setEditedUser(currentUser.data);
            });
        }        
    }, [props.computedMatch.params.id]);

    const onInputChange = (event) => {
        event.persist();
        
        setEditedUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }));

        if(error){
            setError('');
        }
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        saveUser(editedUser).then(() => {
            console.log('SUCCESS');
            setShouldRedirect(true);
        })
        .catch((err) => setError(err.message))
    }

    
    const onCheckboxChange = (event) => {
        event.persist();
        const value = event.target.checked === "on";

        setEditedUser((prevState) => ({
            ...prevState, 
            [event.target.name]: value
        }));

        if(error){
            setError('');
        }
    }


    return (
        <>
        { shouldRedirect && <Redirect to='/users' /> }
        <div className="user-edit-wrapper">
            {error && <span className="user-edit-wrapper">{error}</span>}
            <form className="user-edit-form" onSubmit={onFormSubmit}>
                <div className="form-group">
                    <input type="text" name="name" id="name" placeholder="Name" className="form-control" onChange={onInputChange} value={editedUser.name} />
                </div>
                <div className="form-group">
                    <input type="number" name="age" id="age" placeholder="Age" min="0" max="100" className="form-control" onChange={onInputChange} value={editedUser.age} />
                </div>
                <div className="form-group">
                    <input type="email" name="email" id="email" placeholder="Email" className="form-control" onChange={onInputChange} value={editedUser.email} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" id="password" placeholder="Password" className="form-control" onChange={onInputChange}  value={editedUser.password} />
                </div>
                <div className="form-group">
                    <label labelfor="isActive">Is Active: </label>
                    <input type="checkbox" name="isActive" id="isActive" className="form-control check" onChange={onCheckboxChange} checked={editedUser.isActive} />
                </div>
                <div className="form-group">
                    <label labelfor="isAdmin">Is Admin: </label>
                    <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control check" onChange={onCheckboxChange} checked={editedUser.isAdmin} />
                </div>
                <button className="btn btn-success">Save user</button>
            </form>
        </div>
        </>
    )
}