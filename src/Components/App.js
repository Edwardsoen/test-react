
import React, {Component} from 'react'; 
import Navbar from './navbar';
import Home from './Home';
import Result from './Result';
import Login from './Login';
import Register from './Register';
import Modal from 'bootstrap/js/dist/modal'; 
import Profile from './profile';



class App extends React.Component{
    constructor(props){
        super(props); 
        this.state = { 
            inputValue: '', 
            loginStatus: false, //TODO: convert to boolean ><<<
            username:'', 
            componentToBeRendered: ""
        }; 
        this.props = props; 
        this.handleLoginStatus = this.handleLoginStatus.bind(this); 
        this.handleUsername = this.handleUsername.bind(this); 
        this.handleLeftButtonClick = this.handleLeftButtonClick.bind(this); 
        this.unMountComponent = this.unMountComponent.bind(this); 
        this.handleRightButtonClick = this.handleRightButtonClick.bind(this); 
        this.parseResponse = this.parseResponse.bind(this); 
        this.handleAccountClick = this.handleAccountClick.bind(this); 
    };

    
  renderResult(e){
    if(window.location.href.toString().includes("search")){ //FIX THISSSS  
      return <Result></Result>
    }
    else{
      return <Home></Home>; 
    } 
  }; 

  componentDidMount(){
    this.checkSession();
    this.testing();
  };
 
  testing = () => {
      console.log("testing arrow function");
  };




  checkSession(){
    const link = "http://localhost:8000/"; 
    const url = `${link}api/login`;
    const fetch = require('node-fetch'); 
    fetch(url, {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        credentials: 'include', 
        // body: JSON.stringify({"":""})
    }, 
    ).then( data => data.json()).then(d => this.parseResponse(d)); 
  };


  parseResponse(data){
    data = JSON.parse(JSON.stringify(data)); 
    if("username" in data) { 
     this.setState({loginStatus: true});
     this.setState({username: data["username"]}) 
    };
   
  };

  handleUsername(e){
    this.setState({username:e});
  }; 


    renderComponent = () => { 
    var d = { 
        "register": <Register  isClosed = {this.unMountComponent}></Register>,  
        "login":<Login isClosed = {this.unMountComponent} 
                loginStatus = {this.handleLoginStatus} 
                username = {this.handleUsername} ></Login>,
        "profile":<Profile isClosed = {this.unMountComponent}></Profile>
    };
    return(
        d[this.state.componentToBeRendered]
    );
    };



    handleLoginStatus = (e) => {
        this.setState({loginStatus:e});
        console.log(e);
    };

    unMountComponent = () => { 
        this.setState({componentToBeRendered:""});
    };

    handleLeftButtonClick = () =>{
        this.setState({componentToBeRendered: "login"});
    };
    handleAccountClick= () => {
        let m = document.getElementById('staticBackdrop');
        let myModal = new Modal(m, {});
        myModal.show(); 
    };

    handleRightButtonClick = () =>{
        this.setState({componentToBeRendered: "register"});
    };





    render(){
        return (
            <div> 
                <Navbar leftButtonisClicked = {this.handleLeftButtonClick} 
                rightButtonisClicked = {this.handleRightButtonClick} 
                loginStatus = {this.state.loginStatus} 
                username = {this.state.username} 
                isClicked = {this.handleAccountClick}></Navbar>
                {this.renderComponent()}
                {this.renderResult()}
                <Profile></Profile>
               
            </div>
            
        );
    };

};




export default App;
