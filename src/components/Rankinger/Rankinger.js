import React from "react";
import Selector from "../Selector/Selector";
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Flag from 'react-world-flags';

class Rankinger extends React.Component {

  componentDidMount() {
    this.checkUrl();
  }

  checkUrl= () => {
    const expectedParams = ["teams","countries","faction","players","lists","casters","themes"];
    const {typeSelected, changeType} = this.props;
    const params = this.props.match.params.type;

    if (typeSelected && (!params)){
      this.props.history.push("/rankings/"+ typeSelected);
    }
    else if ((params) && typeSelected === params){

    }else if (expectedParams.includes(params)){
      changeType(params);
    }
    else if(typeSelected !== "0"){
      
    }else{
      changeType("teams");
    }
  }

  sortResults = (results, sortBy) => {
    return results.sort(function(a,b){

      if (a[sortBy] > b[sortBy]) return -1;
      if (a[sortBy] < b[sortBy]) return 1;
      if (a[a.secondSorter] > b[a.secondSorter]) return -1;
      if (a[a.secondSorter] < b[a.secondSorter]) return 1;
    })
  }

  render() {

    const SelectButtons = {
      teams:"Teams",
      countries:"Countries",
      faction:"Faction",
      players:"Players",
      lists:"Lists",
      casters:"Casters",
      themes:"Themes"
    }
    
    const { data, typeSelected, changeType, results, sortBy, changeSort} = this.props;
    console.log(sortBy);
      return(
        <div className="d-flex justify-content-between" style={{width:"90%"}}>
          <Selector 
            title ={"Rank by :"}
            selectButtons ={SelectButtons} 
            buttonSelected ={typeSelected}
            changeItems ={changeType}
            link={"/rankings/ "}
          />
          <Table className={""} hover style={{width:"80%"}}>
          <thead>
            <tr>
                <th style={{width:"5%"}}>Rank</th>
                <th style={{width:"5%", color:"white"}}>Flag flag flag</th>
                <th style={{width:"30%"}}></th>
                <th onClick={()=>changeSort("wins")} style={{width:"10%", cursor:"pointer"}}>Total Wins</th>
              {["countries","lists","casters","themes","factions"].includes(typeSelected)&&
                <th style={{width:"10%", cursor:"pointer"}}>Times Played</th>
              }
              {["countries","lists","casters","themes","factions"].includes(typeSelected)&&
                <th style={{width:"10%", cursor:"pointer"}}>Wins Ponderated</th>
              }
                <th onClick={()=>changeSort("teamSos")} style={{width:"10%", cursor:"pointer"}}>SOS (teams)</th>
              {["countries","lists","casters","themes","factions"].includes(typeSelected)&&
                <th style={{width:"10%", cursor:"pointer"}}>SOS Ponderated (teams)</th> 
              }
              {["players","lists","casters","themes","factions"].includes(typeSelected)&&
                <th onClick={()=>changeSort("playerSos")} style={{width:"10%", cursor:"pointer"}}>SOS (players)</th>
              }
              {["lists","casters","themes","factions"].includes(typeSelected)&&
               <th style={{width:"10%", cursor:"pointer"}}>SOS Ponderated (players)</th>
              }
              {!(["countries","lists","casters","themes","factions"].includes(typeSelected))&&
                <th style={{width:"10%"}}></th>
              }
              {!(["countries","lists","casters","themes","factions"].includes(typeSelected))&&
                <th style={{width:"10%"}}></th>
              }
              {!(["countries","lists","casters","themes","factions"].includes(typeSelected))&&
                <th style={{width:"10%"}}></th>
              }
              {!(["players","lists","casters","themes","factions"].includes(typeSelected))&&
                <th style={{width:"10%"}}></th>
              }
              {!(["lists","casters","themes","factions"].includes(typeSelected))&&
                <th style={{width:"10%"}}></th>
              }
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
            </tr>
          </thead>
           <tbody>
             {this.sortResults(results, sortBy).map((result, rank) => (
               <tr>
                 <th scope="row">{rank+1}</th>
                 <td className="d-flex justify-content-center">
                  <Flag 
                      style={{textAlign: "center"}} 
                      code={result.flag} 
                      height="16"/>
                 </td>
                 <td>{result.name}</td>
                 <td>{result.wins}</td>
                 <td>{result.teamSos}</td>
                 {["players","lists","casters","themes","factions"].includes(typeSelected)&&
                 <td>{result.playerSos}</td>

                 }
               </tr>
             ))}
              
           </tbody>
          </Table>
        </div>
      )
    }
}

export default withRouter(Rankinger);

