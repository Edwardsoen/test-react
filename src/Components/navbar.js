
import React, {Component} from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {MDCMenu} from '@material/menu'
import Menu from './Menu';


class Navbar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '', 
      loginStatus: this.props.loginStatus, //TODO: convert to boolean ><<<
      username:this.props.username, 
    };
    this.props = props; 
    this.handleRightButtonClick = this.handleRightButtonClick.bind(this); 
    this.handleleftButtonClick = this.handleleftButtonClick.bind(this); 
    this.handleAccountClick = this.handleAccountClick.bind(this); 
   };

  componentDidUpdate(){
    if (this.props.loginStatus != this.state.loginStatus){
      this.setState({loginStatus: this.props.loginStatus});
    };
    if(this.props.username != this.state.username){
      this.setState({username: this.props.username});
    };
  };


  handleleftButtonClick(e){ // handle login button click
    this.props.leftButtonisClicked(true);
  };

  handleRightButtonClick(e){// handle register click 
    if(this.state.loginStatus){
      let menu = new MDCMenu(document.querySelector('.mdc-menu'));
        menu.open = true;
    }else { 
      this.props.rightButtonisClicked(true);
    };
  };


  checkLoggedIn(){//TODO: Convert to boolean //Paramter if Logged in
    var s = {}
    if(this.state.loginStatus == false || this.state.loginStatus == "false" ){//FIX THIS 
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


  handleAccountClick(){
    this.props.isClicked(true);
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
                <a className={this.checkLoggedIn()["button"]} style={{color:'white',border:'none' }} onClick = {this.handleleftButtonClick} >{this.checkLoggedIn()["left"]}</a>
                <a className="btn btn-outline-dark"  style={{color:'white',border:'none'}} onClick = {this.handleRightButtonClick}>{this.checkLoggedIn()["right"]}
                <div class = "toolbar mdc-menu-surface--anchor">
                  <Menu isClicked ={this.handleAccountClick}></Menu>
                </div>
                </a>
                </div>
            </div>
          </nav>
            </div>
        ); 
    }
};



export default Navbar; 