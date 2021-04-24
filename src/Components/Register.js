
import React, {Component} from 'react'; 
import {MDCDialog} from '@material/dialog';


class Register extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            password: "", 
            confirmPassword: "", 
            username:"", 
            email:"", 
            passwordBorderColor: "", 
            RegisterStatus: "", 
            usernameBorderColor :""
        };
        this.props = props;    
        this.checkPassword = this.checkPassword.bind(this); 
        this.usernameOnChange = this.usernameOnChange.bind(this); 
        this.registerUser = this.registerUser.bind(this); 
        this.ConfirmpasswordOnChange = this.ConfirmpasswordOnChange.bind(this); 
        this.passwordOnChange = this.passwordOnChange.bind(this); 
        this.getErrorMsg = this.getErrorMsg.bind(this); 
        this.getUsernameErrorMsg = this.getUsernameErrorMsg.bind(this);
    }
    

    registerUser(){
        if(this.checkPassword() == true) {
        console.log("is same");
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
        ).then(d => d.json()).then(data => this.setState({RegisterStatus:data["registered"]}));
    }
        else { 
            this.setState({passwordBorderColor:"red"})
        };
    };




    componentDidMount(){
        const d = new MDCDialog(document.querySelector('.mdc-dialog')); 
        d.open();
        d.listen('MDCDialog:closed', function(event){
          this.props.isClosed("closed");
        }.bind(this)); 
    }; 

    checkPassword(e){ //check if password == confirmpassword 
        if (this.state.confirmPassword !=  this.state.password){ 
            return false;
        }
        else { 
            return true;
        }
    };

    usernameOnChange(e){
        this.setState({username:e.target.value}); 
    }; 

    passwordOnChange(e){
        this.setState({password: e.target.value});
    }; 

    ConfirmpasswordOnChange(e){
        this.setState({confirmPassword: e.target.value});
    }; 
    
    
    getErrorMsg(){
        if(this.state.passwordBorderColor == "red"){ 
            return <div id="passwordHelpBlock" class="form-text" style = {{color:"red"}}>
            Those passwords didn’t match. Try again.
          </div>
        }
        else {
            return ""
        };
    };
    
    getUsernameErrorMsg(){
        if(this.state.RegisterStatus == "false"){
            return <div id="passwordHelpBlock" class="form-text" style = {{color:"red"}}>
            Username Taken
          </div>
        }
        else if (this.state.RegisterStatus == "true") {
            alert("Registered"); 
            window.location.reload(); 
        }
        else {
            return ""
        };
    };

    borderColor(){
        if(this.state.RegisterStatus == "false"){
            return "red"
        }
        else {
            return ""
        };
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
                                    <label className= "form-label" htmlFor= "username" style = {{borderColor:this.state.usernameBorderColor}}>Username</label>
                                    <input id = "RegisterUsername" className = "form-control" onChange = {this.usernameOnChange} style = {{borderColor:this.borderColor()}}></input>
                                    {this.getUsernameErrorMsg()}
                                </div>
                                <div className = "mb-3">
                                    <label className= "form-label" htmlFor= "password">Password</label>
                                    <input type = "password"  id= "RegisterPassword" className = "form-control"  onChange= {this.passwordOnChange} style  = {{borderColor:this.state.passwordBorderColor}}></input> 
                                    <input type = "password" id= "passwordConfirm" placeholder = "Re-enter Password" className = "form-control" style  = {{borderColor:this.state.passwordBorderColor}} onChange = {this.ConfirmpasswordOnChange}></input> 
                                    {this.getErrorMsg()}
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
};

export default Register
