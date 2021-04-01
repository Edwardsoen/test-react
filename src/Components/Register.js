import { render } from '@testing-library/react';
import React, {Component} from 'react'; 


class Register extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            password: "", 
            confirmPassword: "", 
            username:"", 
            email:""
        };
        this.props = props;    
        this.checkPassword = this.checkPassword.bind(this); 
        this.usernameOnChange = this.usernameOnChange.bind(this); 
        this.registerUser = this.registerUser.bind(this); 
        this.passwordOnChange = this.passwordOnChange.bind(this); 
    }
    

    registerUser(){
        const link = "http://localhost:8000/"; 
        const url = `${link}api/register`;
        const fetch = require('node-fetch'); 
        var data = {username : this.state.username, password: this.state.password, email: this.state.email}; 
        fetch(url, 
            {
            credentials: 'include',
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }, 
        )
    };

    checkPassword(e){ //check if password == confirmpassword 
        
    }

    usernameOnChange(e){
        this.setState({username:e.target.value}); 
    }; 

    passwordOnChange(e){
        this.setState({password: e.target.value});
    }; 


    render() {
        return (
            <div className = "mdc-dialog" id = "registerDialog">
                <div className = "mdc-dialog__container">
                    <div className = "mdc-dialog__surface" >
                        <div className = "mdc-dialog__content">
                            <div> 
                            <form >
                                <div className= "mb-3">
                                    <label className= "form-label" htmlFor= "username" >Username</label>
                                    <input id = "RegisterUsername" className = "form-control" onChange = {this.usernameOnChange}></input>
                                </div>
                                <div className = "mb-3">
                                    <label className= "form-label" htmlFor= "password">Password</label>
                                    <input type = "password"  id= "RegisterPassword" className = "form-control"  onChange= {this.passwordOnChange}></input> 
                                    <input type = "password" id= "passwordConfirm" placeholder = "Re-enter Password" className = "form-control"></input> 
                                </div>
                                    <input type = "commit" defaultValue = "Register" className = "btn btn-primary"  style = {{width : "100%"}} onClick ={this.registerUser} ></input>

                            </form>
                            </div>
                            <div className = "mdc-dialog__actions">
                            <button data-mdc-dialog-action = "Cancel" className = "btn btn-outline-seconday"> Cancel </button>  
                               </div> 
                        </div>
                        </div> 
                </div>
                <div className = "mdc-dialog__scrim"></div>
            </div>
                //TODO: CANCEL BUTTON NOT CORNER 


        ); 


    }


}

export default Register
