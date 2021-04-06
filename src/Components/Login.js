import React, {Component} from 'react'
import {MDCDialog} from '@material/dialog';
import { InvertColorsOffRounded } from '@material-ui/icons';



class Login extends React.Component{
    constructor(props){
      super(props); 
      this.state = {
        username:"", 
        password: "", 
        isChecked: false, 
        isLoggedIn: false, 
        isRegistered: "",
      }; 
      this.props = props; 
      this.handlePasswordChange = this.handlePasswordChange.bind(this); 
      this.handleUsernameChange = this.handleUsernameChange.bind(this); 
      this.handleCheckbox = this.handleCheckbox.bind(this); 
      this.loginUser = this.loginUser.bind(this);
      this.parseResponse = this.parseResponse.bind(this); 
    }; 


    handleCheckbox(e){ 
      var b = this.state.isChecked = !this.state.isChecked; 
      this.setState({isChecked:b })
    };

    handleUsernameChange(e){
      this.setState({username: e.target.value}); 
    };
    handlePasswordChange(e){
      this.setState({password: e.target.value}); 
    };  
    
    parseResponse(data){
      data = JSON.parse(JSON.stringify(data)); 
      this.setState({isLoggedIn: data["isLoggedIn"]}); 
      // this.setState({isRegistered:data["isRegistered"]}); 
      // this.props.loginStatus(this.state.isLoggedIn); 
      // this.props.username()
      if(data["isLoggedIn"]){ //if loggeed in 
        this.props.loginStatus(this.state.isLoggedIn); 
        this.props.username(this.state.username);
        const d = new MDCDialog(document.querySelector('.mdc-dialog')); 
        d.open();
        d.close();
      }

    }


    loginUser(){
      const link = "http://localhost:8000/"; 
      const url = `${link}api/login`;
      const fetch = require('node-fetch'); 
      var data = {username : this.state.username ,  password: this.state.password, rememberMe: this.state.isChecked}; 
      fetch(url, {
          method: "POST", 
          headers: {
              'Content-Type': 'application/json',
              "Accept": "application/json"
          },
          credentials: 'include', 
          // credentials: 'include', 
          body: JSON.stringify(data)
      }, 
      ).then( data => data.json()).then(d => this.parseResponse(d)); 
    };
    
  

    componentDidMount(){
        const d = new MDCDialog(document.querySelector('.mdc-dialog')); 
        d.open();
        d.listen('MDCDialog:closed', function(event){
          this.props.isClosed("closed")
        }.bind(this)); 
    };

    handleLoggedIn(){
      if(this.state.isLoggedIn){
        const d = new MDCDialog(document.querySelector('.mdc-dialog')); 
        d.open();
        d.close()
      }
    }

    handleForgotPassword(){
      alert("too badddd ")
    }


    render(){
        return(
            <div className = "mdc-dialog" id = "loginDialog" style = {{position: "fixed"}}>
            <div className = "mdc-dialog__container">
              <div className = "mdc-dialog__surface">  
                <div className = "mdc-dialog__content">
                  <div>
            <form>
                <div className= "mb-3">
                    <label className= "form-label" htmlFor = "username">Username</label>
                    <input id = "LoginUsername" className = "form-control" onChange = {this.handleUsernameChange}></input>
                </div>
                <div className = "mb-3">
                    <label className= "form-label" htmlFor = "password">Password</label>
                    <input type = "password" id= "LoginPassword" className = "form-control" onChange = {this.handlePasswordChange}></input>
                    <input type = "checkbox" onClick = {this.handleCheckbox}></input> 
                    <label htmlFor = "rememberMe" style = {{margin:'3px'}}> Remember me </label>
                    <hr style = {{borderStyle: "none"}}></hr>
                     <input type = "commit"  defaultValue = "Login" className = "btn btn-primary" style = {{width : "100%"}} onClick = {this.loginUser} ></input>
                </div>
            </form>
                  </div>
                </div>
              <div className = "mdc-dialog__actions">
              <a href = '/' name = "forgotPassword" style = {{paddingRight:"50px"}} onClick = {this.handleForgotPassword}>Forgot password?</a>
                <button data-mdc-dialog-action = "Cancel" className = "btn btn-outline-seconday"> Cancel </button>  
                </div> 
              </div>
              </div>  
              <div className="mdc-dialog__scrim"></div>
          </div>
        //TODO: CHANGE CANCEL BUTTON TO X MARK 
        ); 
    }

}

export default Login