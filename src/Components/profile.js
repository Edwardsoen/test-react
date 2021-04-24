import React, {Component} from 'react'; 

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
          newPassword : "", 
          oldPassword : "", 
          ConfirmNewPassword : "", 
          isSuccesfullyChanged: ""
          
        };
        this.props = props; 
        this.onOldPasswordChange = this.onOldPasswordChange.bind(this);  
        this.onConfirmPasswordChange  = this.onConfirmPasswordChange.bind(this); 
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this); 
        this.ConfirmClick = this.ConfirmClick.bind(this); 
        this.changepassword = this.changepassword.bind(this); 
    }
    componentDidMount(){
        // let m = document.getElementById('staticBackdrop')
        // let myModal = new Modal(m, {})
        // myModal.show(); 
    };

    createInputForm(){
      return(
        <div>
        <label  class="form-label" style = {{color: 'black'}} >New Password</label>
            <input type="password" class="form-control" aria-describedby="passwordHelpBlock" onChange = {this.onNewPasswordChange}></input>
            

          <label  class="form-label" style = {{color: 'black'}} >Confirm New Password</label>
            <input type="password"  class="form-control" aria-describedby="passwordHelpBlock" onChange = {this.onConfirmPasswordChange}></input>


          <label  class="form-label" style = {{color: 'black'}} >Old Password</label>
            <input type="password"  class="form-control" aria-describedby="passwordHelpBlock" onChange = {this.onOldPasswordChange}></input>

            <input type = "commit"  defaultValue = "Confirm" className = "btn btn-primary" style = {{width : "100%", marginTop:"20px"}} onClick = {this.ConfirmClick}></input>

        </div>
      
      );
    };

    onNewPasswordChange(e){
      console.log("is Changed");
      this.setState({newPassword:e.target.value});
    }

    onConfirmPasswordChange(e){
      console.log("is Changed");
      this.setState({ConfirmNewPassword:e.target.value});
    }

    onOldPasswordChange(e){
      console.log("is Changed");
      this.setState({oldPassword:e.target.value});
    }

    ConfirmClick(){
      if(this.state.ConfirmNewPassword != this.state.newPassword){ 
        alert("New passwords didn’t match. Try again.");
      }else { 
        this.changepassword();
        console.log("Doneee");
        // if(this.state.isSuccesfullyChanged == "true") {
        //   alert("Success")
        // }else { 
        //   alert("Error")
        // }
      };

    };


    changepassword(){
      const link = "http://localhost:8000/"; 
      const url = `${link}api/changepassword`;
      const fetch = require('node-fetch'); 
      var data = {oldPassword : this.state.oldPassword ,  newPassword: this.state.newPassword}; 
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
      ).then(data => data.json()).then(d => this.setState({isSuccesfullyChanged:d["passwordIsChanged"]})).
      then(d => {if(this.state.isSuccesfullyChanged == "true")
      {alert("Succesfull");
       window.location.reload()}
      else { 
        alert("error");
      };
      
      });
    };

    

    render(){ 
        return(
         <div class="modal fade  " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">test</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                  <div class="d-flex align-items-start">
                    <div class="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <button class="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Password</button>
                            {/* <button class="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</button> */}
                            {/* <button class="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Messages</button> */}
                            {/* <button class="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</button> */}
                        </div>
                        <div class="tab-content" id="v-pills-tabContent">
                            <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">{this.createInputForm()}</div>
                            {/* <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><h1>profile</h1></div> */}
                            {/* <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><h1>messeges</h1></div> */}
                            {/* <div class="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab"><h1>settings</h1></div> */}
                        </div>
                    </div>
                  </div>
                  {/* <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Understood</button>
                  </div> */}
                </div>
              </div>
            </div>





        )
    };

};

export default Profile; 