import Navbar from "./navbar";
import React, {Component} from 'react'; 
import {$,data,jQuery, type} from 'jquery';
import {MDCTabBar} from '@material/tab-bar'; 
import { chips, menu, tab } from "material-components-web";
import {MDCMenu} from '@material/menu';
import {MDCChipSet} from '@material/chips';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import './mdc-style.scss'



class Result extends React.Component{
    constructor(props) {
        super(props)
        this.props = props; 
        this.state = { 
          sitesList: [], 
          imagesData: [],
          tagList: [], 
          slectedTab: 0, 
          t : ''
        }; 
    }


    getSitesList(){
      const url = "http://192.168.111.128:3000/api/sites";
      const fetch =require('node-fetch');
      fetch(url).then(res => res.json()).then(data=> this.setState({sitesList:Object.keys(JSON.parse(JSON.stringify(data)))})); //JSON TO KEYS LIST
    };

    getTagsList(){
      const url = "http://192.168.111.128:3000/api/tags";
      const fetch =require('node-fetch');
      fetch(url).then(res => res.json()).then(data => JSON.parse(JSON.stringify(data))["tags"]).then(d => this.setState({tagList:d}));
    }

    
    getImageData(search, siteCode, amount){
          //sitesCide = site code from sitseList JSON  
      const url = `http://192.168.111.128:3000/search/all?search=${search}&sites=${siteCode}&amount=${amount}`;  
      const fetch = require('node-fetch'); 
      fetch(url,{
        credentials: 'same-origin'
      }).then(res => res.json())
          .then(data => this.setState({imagesData:JSON.parse(JSON.stringify(data))})); 
    }


    componentDidUpdate(){ //reinitaite material design compoentn
        try {
        const chipSetEl = document.querySelector('.mdc-chip-set');
        const chipSet = new MDCChipSet(chipSetEl);
        }catch(e) {
          console.log(e);
        }
        try {
          const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
        }catch(e){
          console.log(e)
        }

    }

    componentDidMount(){
        this.getSitesList(); 
        this.getImageData(this.props.searchItem, "0", 20); 
        this.getTagsList(); 
        // alert(this.props.searchItem); 
    }

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
            <button class={s} tabindex="0" >
            <span class="mdc-tab__content" >
              <span class="mdc-tab__text-label" style = {{color:"white"}}>{title}</span>
            </span>
            <span class={s2} >
              <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline "></span>
            </span>
            <span class="mdc-tab__ripple"></span>
          </button>
        );
    }

    createChips(title, isSelected){
        if(isSelected){
            var s = "mdc-chip mdc-chip--selected";
        }else {
            var s = "mdc-chip";
        }
        return(
            <div class={s} role="row" style = {{background:"grey"}}>
            <div class="mdc-chip__ripple"></div>
            <span class="mdc-chip__checkmark" >
              <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                <path class="mdc-chip__checkmark-path" fill="none" stroke="black"
                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
              </svg>
            </span>
            <span role="gridcell">
              <span role="checkbox" tabindex="0" aria-checked="false" class="mdc-chip__primary-action">
                <span class="mdc-chip__text"><span style={{color:"white"}}>{title}</span></span>
              </span>
            </span>
          </div>
        );


    }

    createImageItem(src){
        return(
            <li class="mdc-image-list__item">
            <div class="mdc-image-list__image">
              <img class="mdc-image-list__image" src={src}/>
            </div>
          </li>
        ); 
    }

    craeteChipsSet(chipList){
      var jsx =[]
      if (chipList.length ==0) {
        return null;
      } 
      else 
      { let i ; 
        for(i = 0; i <= chipList.length -1; i++){
          jsx.push(this.createChips(chipList[i], false)); 
        }
        // return jsx; 
        return(
          <div class="mdc-chip-set mdc-chip-set--filter" role="grid">
          {jsx}
          </div>
        );


      }; 
       
    
    }

    parseImageData(tabIndex){
      if (tabIndex ==0 ){ //if all tab selected, merge and flatten list
        var nestedListData =[]; 
        var i;
        var keys = Object.keys(this.state.imagesData);  
        for(i =0; i <= keys.length; i ++){
            var d = this.state.imagesData[keys[i]]
            nestedListData.push(d)
          }
          return [].concat.apply([], nestedListData); //return flatten list 
        }
      else{
        return this.state.imagesData[this.state.sitesList[tabIndex]]; 
        //grab data from specitific sitse 
      }
    }


     

    render(){
        return( 

            <div>
           
            {this.parseImageData(1)}
            {this.craeteChipsSet(this.state.tagList)}
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

            <div >
        

          <ul class="mdc-image-list mdc-image-list--masonry my-masonry-image-list">
          <li class="mdc-image-list__item">
            <img class="mdc-image-list__image" src= "https://it-s.com/wp-content/uploads/2020/07/concept-art.jpg"/>
            <div class="mdc-image-list__supporting">
              <span class="mdc-image-list__label">Text label</span>
            </div>
          </li>
          <li class="mdc-image-list__item">
            <img class="mdc-image-list__image" src= "https://cdna.artstation.com/p/assets/images/images/002/342/932/large/daeho-cha-.jpg?1460522296"/>
            <div class="mdc-image-list__supporting">
              <span class="mdc-image-list__label">Text label</span>
            </div>
          </li>

        </ul>








                {/* <GridList cellHeight='150'   cols="3">
                    <GridListTile>
                      <img src= "https://it-s.com/wp-content/uploads/2020/07/concept-art.jpg"/>
                    </GridListTile>
                    <GridListTile>
                      <img src= "https://www.clipstudio.net/wp-content/uploads/2019/09/0034_001-1.jpg"/>
                    </GridListTile>
                 
                    <GridListTile>
                      <img src= "https://cdna.artstation.com/p/assets/images/images/002/342/932/large/daeho-cha-.jpg?1460522296"/>
                    </GridListTile>
                </GridList>  */}



          </div>
        </div>
        )
    }
}


export default Result; 