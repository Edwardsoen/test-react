import React, {Component} from 'react'; 
import {MDCMenu} from '@material/menu';


class Menu extends React.Component{
    constructor(props){
        super(props); 
        this.state = { 
            isLoggedOut : false
        }; 
        this.props = props; 
        this.handleLogout = this.handleLogout.bind(this); 
    }

    componentDidMount(){
        let menu = new MDCMenu(document.querySelector('.mdc-menu'));
        // menu.open = true;
    }

    generateSession(){
        var link =  "http://localhost:8000/api/sesion";
        fetch(link, {
          credentials: 'include'
        });  
      }


    handleLogout(){
        
        this.props.isLoggedOut("false"); 
        this.generateSession()
        document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }; 



    render(){
        return(
            <div class="mdc-menu mdc-menu-surface">
                <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                    <li class="mdc-list-item" role="menuitem">
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">Account</span>
                    </li>
                    <li class="mdc-list-item" role="menuitem" onClick = {this.handleLogout}>
                    <span class="mdc-list-item__ripple"></span>
                    <span class="mdc-list-item__text">Logout</span>
                    </li>
                </ul>
            </div>
        );
    };
};


export default Menu; 