import React, {Component} from 'react'; 
import {MDCTabBar} from '@material/tab-bar'; 
import { ContactsOutlined } from '@material-ui/icons';


class Tabs extends React.Component{
    constructor(props){
        super(props)
        this.props = props; 
        this.state = { 
            sitesList:[
            ], 
            isLoaded:false, 
            selectedTab:0, 
            isInitialized: ""
        }
        this.updateSitesList = this.updateSitesList.bind(this);
    }

    getSitesList(){
        const link = "http://localhost:8000/";  
        const url = `${link}api/tabs`;
        const fetch =require('node-fetch');
        fetch(url).then(res => res.json()).then(data=> 
            JSON.parse(JSON.stringify(data))["tabs"]).then(sites => this.setState({sitesList:sites})).then(this.updateSitesList); //JSON TO KEYS LIST
        };

    componentDidUpdate(){
        if(this.state.isInitialized == false && document.querySelectorAll('.mdc-tab').length > 0 ){
            try {
                let tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
                let tabs  = document.querySelectorAll('.mdc-tab');
                tabBar.listen('MDCTabBar:activated', function(event) {
                    let tab = tabs[event.detail.index];
                    this.setState({slectedTab:event.detail.index});
                    this.props.isChanged(event.detail.index); 
                }.bind(this));
                this.setState({isInitialized:true});
                }catch(e){
                    console.log(e)
                }
            };
    };

  


    createTab(title, isActive){
        if (isActive)
        {
            var s = "mdc-tab mdc-tab--active";
            var s2 = "mdc-tab-indicator mdc-tab-indicator--active";
        }else {
            var s = "mdc-tab mdc-tab";
            var s2 = "mdc-tab-indicator mdc-tab-indicator"
        }
        return (   
            <button className={s} key= {title} >
            <span className="mdc-tab__content" >
              <span className="mdc-tab__text-label" style = {{color:"white"}}>{title}</span>
            </span>
            <span className={s2} >
              <span className="mdc-tab-indicator__content mdc-tab-indicator__content--underline "></span>
            </span>
            <span className="mdc-tab__ripple"></span>
          </button>

        );
    }
    componentDidMount(){
        this.getSitesList(); 
    };

    updateSitesList(){
        this.props.siteslist(this.state.sitesList); 
    };


    render(){
        return (
            <div>
                   <div className = "mdc-tab-bar" role = "tablist">
                <div className = "mdc-tab-scroller" >
                    <div className = "mdc-tab-scroller__scroll-area">
                        <div className = "mdc-tab-scroller__scroll-content" >                     
                            {this.state.sitesList.map((v, i) => {
                              return this.createTab(v, false)
                            })
                            } 
                        </div>
                    </div>
                </div>
            </div>  
            </div>
        )
    }
}


export default Tabs; 