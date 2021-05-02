import React, {Component} from 'react'; 


class Menu extends React.Component{
    constructor(props){
        super(props); 
        this.state = { 
            isLoggedOut : false
        }; 
        this.props = props; 
        this.handleLogout = this.handleLogout.bind(this); 
        this.handleAccount = this.handleAccount.bind(this); 
    }

  
    generateSession = () =>{
        var link =  "http://localhost:8000/api/sesion";
        fetch(link, {
          credentials: 'include'
        });  
      };





    handleLogout(){
        this.generateSession();
    }; 

    handleAccount(){
        this.props.isClicked(true); 
    };



    render(){
        return(

            <div class="mdc-menu mdc-menu-surface" style = {{overflow: "auto"}} >
             
                <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                    <li class="mdc-list-item" role="menuitem" onClick = {this.handleAccount}>
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">Account</span>
                    </li>
                    <a href = '/' style = {{color: "black", textDecoration: "none"}}>
                    <li class="mdc-list-item" role="menuitem" onClick = {this.handleLogout}>
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">Logout</span>
                    </li>
                    </a>
                </ul>
            </div>
        );
    };
};


export default Menu; 