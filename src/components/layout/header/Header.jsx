import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { logout } from '../../../core/api/users.api';
import './Header.css';

export const Header = withRouter((props) => {

  const [isLoggedOut, setLogoutFlag] = useState(false);
  const [serachParam, setSearchParam]  = useState('');

  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  }

  const onSearchChange = (event) => {
    event.persist(); 
    setSearchParam(event.target.value);
  }

  const onSearchClick = (event) =>{
    event.preventDefault();

    const pathNameUrl = props.location.pathname.substr(1);
    const historyObj = { pathname: `/${pathNameUrl}` }

    if(serachParam){
      historyObj['search'] = `?q'=${serachParam}`;
    }

    props.history.push(historyObj );
  }


    return (
         <>
        { isLoggedOut && <Redirect to="/login" /> }
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href=".">Task<span>IT</span></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto pr-4">
              <li className="nav-item active">
              <Link to="/" className="nav-link"><i class="fas fa-home fa-lg"></i> HOME</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link"><i class="fas fa-users fa-lg"></i> USERS</Link>
              </li>
              <li className="nav-item">
                <Link to="/users/create" className="nav-link"><i class="fas fa-plus-circle fa-lg"></i> CREATE USER</Link>
              </li>
              <li className="nav-item">
                <Link to="/notes" className="nav-link"><i class="fas fa-book-open fa-lg"></i> ALL NOTES</Link>
              </li>
              <li className="nav-item">
                <Link to="/notes/my-notes" className="nav-link"><i class="fas fa-book-open fa-lg"></i> MY NOTES</Link>
              </li>
              <li className="nav-item">
                <Link to="/notes/create" className="nav-link"><i class="fas fa-notes-medical fa-lg"></i> CREATE NOTE</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={onSearchClick}>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <span className="logout-btn" onClick={onLogout} >Logout</span>
          </div>
        </nav>
        </>
    );
})