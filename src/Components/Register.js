import { render } from '@testing-library/react';
import React, {Component} from 'react'; 
import './mdc-style.scss'


class Register extends React.Component{
    render() {
        return (
            <div className = "mdc-dialog" id = "registerDialog">
                <div className = "mdc-dialog__container">
                    <div className = "mdc-dialog__surface" >
                        <div className = "mdc-dialog__content">
                            <div> 
                            <form>
                                <div className= "mb-3">
                                    <label className= "form-label" for = "username">Username</label>
                                    <input id = "username" className = "form-control"></input>
                                </div>
                                <div className = "mb-3">
                                    <label className= "form-label" for = "password">Password</label>
                                    <input type = "password" name = "password" id= "password" className = "form-control"></input> 
                                    <input type = "password" name = "password" id= "passwordConfirm" placeholder = "Re-enter Password" className = "form-control"></input> 
                                </div>
                                    <input type = "commit" value = "Register" className = "btn btn-primary"  style = {{width : "100%"}}></input>

                            </form>
                            </div>
                            <div className = "mdc-dialog__actions">
                            <button data-mdc-dialog-action = "Cancel" class = "btn btn-outline-seconday"> Cancel </button>  
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
