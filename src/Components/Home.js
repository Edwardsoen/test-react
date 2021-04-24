
import React, {Component} from 'react'; 
import Result from './Result';


class Home extends React.Component{
    constructor(props){
        super(props)
        this.props = props; 
        this.state = {
          websocket_data : "",
          webSocket :""
          // websocket: ""
        }
        this.sendDatatoSocket = this.sendDatatoSocket.bind(this); 
        
    }; 

    componentDidMount(){ 

          var url = 'ws://localhost:8000/api/socket';
          var webSocket = new WebSocket(url);
          webSocket.onopen = function(event){
              webSocket.send("Sent");
          };
          this.setState({webSocket: webSocket}); 


          webSocket.onmessage = function(event){
              this.setState({websocket_data:event.data});
          }.bind(this);
    };


    sendDatatoSocket(){
      this.state.webSocket.send("Send");
    };


  

    carousel = () => {
        return(  
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel"style = {{height:"600px", overflow: "visible"}} >
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner" style = {{height:"600px"}}>
          <div class="carousel-item active" >
            <img src="https://wallpaperaccess.com/full/3452280.jpg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
                {/* image needs to be wide  */}
              {/* <h2>Browse thousands of high-res images</h2>  */}
              {/* <p>all links are straight from original sources</p> */}
            </div>
          </div>
          <div class="carousel-item" style = {{height:"600px"}}>
            <img src="https://wallup.net/wp-content/uploads/2017/11/23/433378-ultra-wide-cyberpunk.jpg" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              {/* <h2>Batch Download</h2> */}
              {/* <p>Bulk download with one button</p> */}
            </div>
          </div>
          <div class="carousel-item"style = {{height:"600px"}}>
            <img src="https://c.wallhere.com/photos/1b/3b/Cyberpunk_2077_cyberpunk_ultra_wide_Ultra_Settings_video_game_art_in_game_ultrawide_screen_shot-1971205.jpg!d" class="d-block w-100" alt="..."/>
            <div class="carousel-caption d-none d-md-block">
              {/* <h2>Follow artist from various sites</h2> */}
              {/* <p>Keep track of their works regardless of platform</p> */}
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
);
    };
    

    render(){
        return(<div>
            {this.state.clickTimes}
            {this.carousel()}
            <div  style  = {{height:"100px", width: "100%", textAlign: "center", textalign: "middle"}}><h2 style = {{paddingTop:"30px"}}> WebSocket Testing: {this.state.websocket_data} </h2></div>
            <button onClick = {this.sendDatatoSocket} style = {{marginLeft:"42%", marginRight: "40%", backgroundColor: "grey"}}> CLICK ME TO UPDATE SERVER'S LCOAL TIME </button>
            <Result></Result>
       


          </div>
        ); 
    };    
}; 

export default Home; 