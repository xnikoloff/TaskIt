import React, { Component } from 'react';
import './Register.css';
import { register } from '../../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            age: '',
            isRegistered: false,
            errorMessage: ''
        };
    }


    onInputChange = (event) =>  {
        event.persist();

        this.setState({
            [event.target.name]: event.target.value,
            errorMessage: ''
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { isRegistered, ...user } = this.state;
        console.log(user);
        register(user).then(() => {
            this.setState({
                isRegistered: true
            });
        })
        .catch((err) => this.setState({ errorMessage: err.message }));
    };

    render() {
        return (
            <>
            {this.state.isRegistered && <Redirect to="/login" /> }
            <div className="container-fluid login-wrapper">
                <div className="row">
                    <div className="col-12 col-lg-4 col-greeting">
                        <h4 className="my-5">Welcome to</h4>
                        <h1>Task<span>IT</span></h1>
                        <h4 className="mt-5 mb-4">Hande your task with ease</h4>
                        <h6>TaskIt is a platform built to make your life easier. <br/> Focus on your work, let us hande your plan.</h6>
                    </div>
                    <div className="col-12 col-lg-8 col-register">
                        <div className="register-wrapper">
                            <form className="register-form" onSubmit={this.onSubmit}>
                                { this.state.errorMessage && <span className="text-danger">{this.state.errorMessage}</span> }
                                <div className="form-group">
                                    <input type="text" name="name" id="name" placeholder="Name" className="form-control" onChange={this.onInputChange} required/>
                                </div>
                                <div className="form-group">
                                    <input  type="number" name="age" id="age" placeholder="Age" className="form-control" onChange={this.onInputChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="email" name="email" id="email" placeholder="Email" className="form-control" onChange={this.onInputChange} required/>
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" id="password" placeholder="Password" className="form-control" onChange={this.onInputChange} required/>
                                </div>
                                <button className="btn btn-primary" >Register</button>
                                <Link to="/login">Already have an account?</Link>
                            </form>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            </>
        )
    }
}