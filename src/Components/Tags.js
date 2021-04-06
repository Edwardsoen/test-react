import React, {Component} from 'react'; 
import {MDCChipSet} from '@material/chips';






class Tags extends React.Component{
    constructor(props){
        super(props)
        this.props = props;
        this.state = { 
            tagList:[],            
            isInitialized:false, 
            tagStatus:{} //TAGID: ISCHECKED (BOOLEAN)
        }; 
    }



    componentDidMount(){
        this.getTagsList(); 
    }
    componentDidUpdate(){
      if(!this.state.isInitialized){
        try { 
          const chipSet = new MDCChipSet(document.querySelector('.mdc-chip-set'));
          var i;
          var chipData = {}; 
          var chipId = {}
          for(i =0; i<= chipSet.chips.length -1 ; i ++){
             //check if chip is checekd
             var isTrueSet = (chipSet.chips[i]["primaryAction_"]["ariaChecked"] == 'true'); //string to boolean
            // chipData[chipSet.chips[i]["id"]] = isTrueSet;
            // chipData[this.state.tagList[i]] = isTrueSet;
            chipData[i] = isTrueSet;
            chipId[chipSet.chips[i]["id"]] =  i
          };
          this.setState({tagStatus:chipData}); 


          chipSet.listen('MDCChip:selection', function(event){
            console.log(event.detail);
            let d = this.state.tagStatus;
            // d[event.detail["chipId"]] = event.detail["selected"];
            d[chipId[event.detail["chipId"]]] = event.detail["selected"];
            this.setState({tagStatus:d}); 
            console.log(event.detail)
            this.props.tagHash(this.state.tagStatus); 
          }.bind(this)); 



          this.setState({isInitialized: true}); 

      }catch(e) {
          console.log(e);
      }
      } 
    };

    
    


    getTagsList(){
      // const link = "http://192.168.43.176:3000/"; 
      const link = "http://localhost:8000/"; 
        const url = `${link}api/tags`;
        const fetch =require('node-fetch');
        fetch(url, { 
          credentials: 'include' //change this
        }).then(res => res.json()).then(data => JSON.parse(JSON.stringify(data))["tags"]).then(d => this.setState({tagList:d}));
      }
      

    createChip(title, isSelected){
        if(isSelected){
            var s = "mdc-chip mdc-chip--selected";
        }else {
            var s = "mdc-chip";
        }
        return(
          <li key = {title} style = {{listStyle:"none"}}>
            <div className={s} role="row" style = {{background:"grey"}}>
            <div className="mdc-chip__ripple"></div>
            <span className="mdc-chip__checkmark" >
              <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                <path className="mdc-chip__checkmark-path" fill="none" stroke="black"
                      d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
              </svg>
            </span>
            <span role="gridcell">
              <span role="checkbox" aria-checked="false" className="mdc-chip__primary-action">
                <span className="mdc-chip__text"><span style={{color:"white"}}>{title}</span></span>
              </span>
            </span>
          </div>
          </li>
        );


    }
    
    createChipSet(chipList){
        var jsx =[];
        if (chipList.length ==0) { //if ajax return null 
          return null;
        } 
        else // if data is received
        { let i ; 
          for(i = 0; i <= chipList.length -1; i++){
            jsx.push(this.createChip(chipList[i], true)); 
          }
  
          // return jsx; 
          return(
            <div className="mdc-chip-set mdc-chip-set--filter" role="grid">
            {jsx}
            </div>
          );
        }; 
    }; 

    render(){
        return(
            <div>
                {this.createChipSet(this.state.tagList)}
            </div>
        

        )
    }
    
}


export default Tags; 