
import React, {Component} from 'react'; 
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tags from './Tags'; 
import Tabs from './Tabs';
import '../style/index.css'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cookies from 'js-cookie';
import { map } from 'jquery';
import Buttons from './Buttons';



class Result extends React.Component{
    constructor(props) {
        super(props)
        this.props = props; 
        this.state = { 
          siteslist:[], 
          selectedTab: "0", //default
          imagesData: [], 
          currentPage:1,  //number of images requested....  will reset onTabChange //artstation max == 50, dev == 
          tagStatus:null, 
          isOnHomePage: false, 
          searchItem:"landscape", 
         }; 
        this.handleTabChange = this.handleTabChange.bind(this); 
        this.appendSitesList = this.appendSitesList.bind(this); 
        this.grabDataOnTabChange = this.grabDataOnTabChange.bind(this); 
        this.scrollAction = this.scrollAction.bind(this); 
        this.handleTagChange = this.handleTagChange.bind(this); 
        this.renderTagsAndTabs = this.renderTagsAndTabs.bind(this); 
        this.getCheckedTagList = this.getCheckedTagList.bind(this); 
      }


    getImageData(search, tabCode, page){
          //sitesCide = site code from sitseList sitesList data [0] == all
      // const link = "http://192.168.43.176:3000/"; 
      const link = "http://localhost:8000/"; 
      this.controller = new AbortController();
      var signal = this.controller.signal;
      var s = `search=${search}`; 
      

      var taglist = "&tag=" + this.getCheckedTagList();
      if(!tabCode){
        var site = ""; 
      }else {
        var site = `&sort=${tabCode}`;
      }
      var a =  `&page=${page}`; 
      const url = `${link}search?${s}${site}${a}${taglist}`;    //${link}/search/all?search=${search}&sites=${tabCode}&page=${page}; 
      const fetch = require('node-fetch'); 


      fetch(url, {signal: signal, 
        credentials: 'include', 
      }).then(res => res.json())
        .then(data => JSON.parse(JSON.stringify(data))["data"])
        .then(d => this.setState({imagesData:this.state.imagesData.concat(d)}))
        .then(console.log("FETCH DONE"))
        .catch(error => {console.log(error)}); 
    };
      

    
    componentDidMount(){
      var searchItem = new URLSearchParams(window.location.search).get("q"); 
      if(searchItem == null){
        this.setState({isOnHomePage:true});
        this.getImageData(this.state.searchItem, "", this.state.currentPage); 
      }else {
        this.setState({searchItem:searchItem});
        this.getImageData(searchItem,"", this.state.currentPage);
      };
    };

    componentDidUpdate(){
      this.getCheckedTagList()
    }


    
    getCheckedTagList(){
      var a = [];
      var b = this.state.tagStatus
      try { 
     Object.keys(b).forEach(function(key){
       if(b[key]){
         a.push(key)
       };
       
     });
    }
    catch(err){
      console.log(err)
    }
    
    finally {
      return a.toString();
    }
   };



    
    createTabView(){
      try {
      var data = this.state.imagesData;
      var JsXview = [];  
      data.forEach((value, i)  => {//fix this
        let url = data[i]['url'];
        let icon = data[i]["icon"]
        console.log(url); 
          JsXview.push(
                    <GridListTile style = {{borderRadius: "10%", overflow:"hidden"}} key = {`list${i}`}>
                      <a href = {url }><img src= {icon} height = "300" width = "300" style = {{objectFit:"cover"}}/></a>
                    </GridListTile>
        )
      })

      return JsXview; 
    }catch(e){
        return null; 
      };
    };
    
    handleTabChange(e){
      this.controller.abort(); 
      this.setState({currentPage:1}); 
      this.setState({imagesData:[]}); 
      this.setState({selectedTab:e});
      this.grabDataOnTabChange(); 
    };

    appendSitesList(e){
      this.setState({siteslist: e});
    };

    grabDataOnTabChange() { // new data onTabChange 
      this.getImageData(this.state.searchItem ,this.state.selectedTab ,this.state.currentPage);
    };




    scrollAction(){
      this.setState({currentPage:this.state.currentPage + 1});
      this.getImageData(this.state.searchItem,"", this.state.currentPage); 
      // this.setState({imagesData:this.state.imagesData.concat(this.state.imagesData)});
      console.log("is scrolled");
    };

    handleTagChange(e){

      this.controller.abort(); 
      this.setState({currentPage:1}); 
      this.setState({imagesData:[]}); 
      this.setState({tagStatus:e});
      this.getImageData(this.state.searchItem ,this.state.selectedTab ,this.state.currentPage);
    }

    renderTagsAndTabs(){
      if (this.state.isOnHomePage){
        return null;
      }
      else {
        return(   
          <div>
            <Buttons></Buttons>
        <Tags tagHash = {this.handleTagChange}></Tags>
        <Tabs isChanged = {this.handleTabChange} siteslist = {this.appendSitesList}></Tabs>   
        </div>
      );
      };
    };
   

    render(){
        return( 
            <div>
              
              {this.renderTagsAndTabs()}
          
               <InfiniteScroll
                dataLength={this.state.imagesData.length}
                next={this.scrollAction}
                hasMore={true}
                initialLoad = {true}
                loader={<div className="loader" key={0}>Loading ...</div>}
                >
               <GridList cellHeight={300} cols={6} style ={{maxWidth:"100%", maxHeight:"100%", overflow:"hidden", margin:"0", height:"100%"}}>                     
               {this.createTabView()}   
               </GridList>  


              </InfiniteScroll> 


        </div>
        )
    }
};


export default Result; 