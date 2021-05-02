
import React, {Component} from 'react'; 
import '../style/style.css'


class Buttons extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            data : []
        };
        this.props = props; 
    };

    getButtonList(){
        const link = "http://localhost:8000/"; 
        const url = `${link}api/buttons`;
        const fetch = require('node-fetch'); 
        fetch(url).then(data => data.json()).then(d => this.setState({data: d["data"]})); 
    };

    componentDidMount(){
        this.getButtonList();
    };



    createButton(){ 
        var data = []; 

        for( var [index, value] of this.state.data.entries()){
            data.push(this.buttonJSX(value["title"], value["url"]))
        }
        return data; 
        
    };




    buttonJSX = (title, url) => {
        return(<li>
            <form method = "GET" action = "search">
              {/* <buttoin id = "Search" name = "q" value = "landscape" type = "submit" ></input> */}
              <button type = "submit" className = "buttons" name = "q" value = {title} style = {{backgroundImage:`url(${url})`}}>
                {title}
            </button>
            </form>
            </li>
            );
    };






//CSS TESTING FILE 
    render(){
        return(
            <div className = "main">
                <div className = "Buttonlist">
                    <ul>
                    {this.createButton()}


                    </ul> 
                </div>
            </div>



        );


    };




}


export default Buttons; 