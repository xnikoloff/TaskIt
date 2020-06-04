import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../../core/api/users.api';



export function UserCard({ user, onDelete }) {
    const loggedUser = getLoggedUser();

    return (
        <div className="col-12 col-lg-3 my-5">
            <div class="card">
                <img src={user.picture} className="card-img-top" alt={user.name}/>
                <div className="card-body">
                    <h4 className="card-title mb-5"><Link to={`/users/${user.id}`}>{user.name}</Link></h4>
                    <hr/>
                    <h6 className="card-subtitle mb-2 text-muted">User info</h6>
                    <hr/>
                    <div className="age-box">
                        <p className="card-text">Age: </p>
                        <h5 className="card-subtitle font-italic">{user.age}</h5>
                    </div>
                <hr/>
                    <div className="email-box">
                        <p className="card-text">Email: </p>
                        <h5 className="card-subtitle font-italic">{user.email} </h5>
                    </div>
                { loggedUser.isAdmin && <Link className="card-link" to={`/users/edit/${user.id}`}>Edit</Link> }
                { loggedUser.isAdmin && <div className="cursor-pointer" onClick={() => onDelete(user.id)}>Delete</div> }
                </div>
            </div>
        </div>
    );
}