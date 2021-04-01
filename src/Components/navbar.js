
import React, {Component} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Register from './Register';
import Result from './Result'
import {MDCDialog} from '@material/dialog';
import {MDCMenu} from '@material/menu'
import Home from './Home';
import Menu from './Menu';
import { ThreeDRotation } from '@material-ui/icons';


class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '', 
      openResult:false,
      loginStatus:"false", //TODO: convert to boolean ><<<
      username:'', 
      registerIsClicked: false
    };
    this.props = props; 
    this.handleChange = this.handleChange.bind(this); 
    this.handleLoginStatus = this.handleLoginStatus.bind(this); 
    this.handleUsername = this.handleUsername.bind(this); 
    this.handleRegisterClick = this.handleRegisterClick.bind(this); 
    this.handleLogout = this.handleLogout.bind(this); 
  }




  handleChange(e) {
    this.setState({ inputValue: e.target.value});
  }
 
  componentDidMount(){
  }

    

  handleLoginClick(){
    let d = new MDCDialog(document.querySelector('#loginDialog')); 
    d.open();      
  };

  handleRegisterClick(){
    if(this.state.loginStatus == "true"){
      console.log("istrue")
      let menu = new MDCMenu(document.querySelector('.mdc-menu'));
      menu.open = true;
    }else {
      console.log("false")
      let d = new MDCDialog(document.querySelector('#registerDialog'));
      d.open();
    }
  }

  renderResult(e){
    if(window.location.href.toString().includes("search")){ //FIX THISSSS rtyytrhsdh53426hbhe5trgdf 
      return <Result></Result>
    }
    else{
      return <Home></Home>; 
    } 
  }; 

  handleLoginStatus(e){
    this.setState({loginStatus:e})
    console.log(e)
    if(e == "true"){
      let d = new MDCDialog(document.querySelector('#loginDialog')); 
      console.log(d.isOpen); //fix this
      d.open();
      d.close();
    }
  };
  
  handleUsername(e){
    this.setState({username:e})
  }; 

  checkLoggedIn(){//TODO: Convert to boolean //Paramter if Logged in
    var s = {}
    if(this.state.loginStatus == "false"){
      s["left"] = "Login"; 
      s["right"] = "Register";  
      s["button"] = "btn btn-outline-dark"; 
    }
    else { 
      s["left"] = this.state.username; 
      s["right"] = "Menu"; 
      s["button"] = "btn btn-outline-dark disabled"; 
    }
    return s;
  }

  handleLogout(e){
    this.setState({loginStatus :  "false"}); 
  }; 



    render(){
        return (
            <div>
             
            <nav className="navbar navbar-expand-lg navbar-dark" style ={{position:"relative", backgroundColor: "black"}} aria-hidden = "true" >
            <div className="container-fluid"  > 
              <a className="navbar-brand" href="/">Home</a>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                
                <ul className="navbar-nav me-auto mb-2 mb-lg-0"style ={{width:"150%"}}>
                <form className="d-flex" style ={{width:"100%"}}  method = "GET" action = "search">
                    <input className="form-control me-2" type="search" placeholder="Search" id="Search" style={{backgroundColor:'black', borderColor:"grey", color:'white'}} onChange = {this.handleChange} name = "q" ></input>
                    <button className="btn btn-outline-success" type="submit" style={{color:'white', border:"none"}}> Search</button>
                </form>
                </ul>
                <Login loginStatus = {this.handleLoginStatus} username = {this.handleUsername}></Login>
                <Register></Register>
              
                <a className={this.checkLoggedIn()["button"]} style={{color:'white',border:'none' }} onClick = {this.handleLoginClick} >{this.checkLoggedIn()["left"]}</a>
                <a className="btn btn-outline-dark"  style={{color:'white',border:'none'}} onClick = {this.handleRegisterClick}>{this.checkLoggedIn()["right"]}
                <div class = "toolbar mdc-menu-surface--anchor">
                <Menu isLoggedOut = {this.handleLogout}></Menu>
                </div>
                </a>
                </div>
            </div>
          </nav>
          {this.renderResult()}
          
    
            </div>
        ); 
    }
}



export default Navbar; 