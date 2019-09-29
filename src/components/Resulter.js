import React from "react";
import TeamResult from "./TeamResult";
import { Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import Selector from "./Selector";
import PlayerResult from "./PlayerResult";

class Resulter extends React.Component {

  componentDidMount() {
    this.checkUrl();
  }

  checkUrl= () => {
    const expectedParams = ["Round1","Round2","Round3","Round4","Round5","Round6"];
    const {roundSelected, changeRound, history} = this.props;
    const params = this.props.match.params.round;

    if (roundSelected && (!params)){
      history.push("/results/Round"+roundSelected);
    }
    else if (params && roundSelected.includes(params.slice(-1))){

    }else if (expectedParams.includes(params)){
      changeRound(params.slice(-1));
    }
    else if(roundSelected != "0"){
      
    }else{
      changeRound("6");
    }
  }

  victoryType = (data, zone, round) => {
    let wins = data.teams[data.results[round][zone].winner].playersId.filter(playerId => data.players[playerId].results && data.players[playerId].results[round].win).length;
    let victory = {
        3:"Defeated",
        4:"Crushed",
        5:"Obliterated"
    }
    return victory[wins];
}

  render() {

    const { data, roundSelected, changeRound, zonesSelected, updateZones, playersSelected, updatePlayers } = this.props;
    
    const SelectButtons = {
      1:"first",
      2:"second",
      3:"third",
      4:"fourth",
      5:"fifth",
      6:"sixth"
  }

  const round = "Round "+ roundSelected;
  
    return(
      <div className="d-flex justify-content-between" style={{width:"90%"}}>
        <Selector 
          title ={"Round"}
          selectButtons ={SelectButtons} 
          buttonSelected ={roundSelected}
          changeItems ={changeRound}
          link={"/results/Round "}
        />
      
        <Table className={""} hover style={{width:"80%"}}>
          <thead>
            <tr>
              <th style={{width:"2%"}}>Zone</th>
              <th style={{width:"4%"}}></th>
              <th style={{width:"20%"}}>Winner</th>
              <th style={{width:"20%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"20%"}}></th>
              <th style={{width:"20%", textAlign: "right"}}>Loser</th>
              <th style={{width:"4%"}}></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.results[round]).filter(key => key != "round").map(key => {
              let winnerTeam = data.teams[data.results[round][key].winner];
              let loserTeam = data.teams[data.results[round][key].loser];
              let zone = data.results[round][key].zone;
              
              return (
              <React.Fragment>
                <TeamResult 
                  zone={zone} 
                  key={key}
                  winnerTeam={winnerTeam}
                  loserTeam={loserTeam}
                  victoryType={this.victoryType(data,zone,round)}
                  updateZones={updateZones}
                  zonesSelected={zonesSelected}
                />
                {zonesSelected.includes(zone) && 
                  winnerTeam.playersId.filter(playerId => data.players[playerId].results).map(playerId => {
                    let player1 = data.players[playerId];
                    let player2 = data.players[player1.results[round].opponentId];
                    let player1Name = player1.name;
                    let player2Name = player2.name;
                    let result = player1.results[round].win ? "Won over" : "Lost to";
                    let list1 = player1.results[round].listPlayedId;
                    let list2 = player2.results[round].listPlayedId;
                    let caster1 = data.lists[list1].caster;
                    let caster2 = data.lists[list2].caster;
                    let faction1 = player1.faction;
                    let faction2 = player2.faction;
                    let theme1 = data.lists[list1].theme;
                    let theme2 = data.lists[list2].theme;
  
                    return(
                      <PlayerResult
                        player1Name={player1Name}
                        player2Name={player2Name}
                        caster1={caster1}
                        caster2={caster2}
                        faction1={faction1}
                        faction2={faction2}
                        list1={list1}
                        list2={list2}
                        theme1={theme1}
                        theme2={theme2}
                        result ={result}
                        index={playerId}
                        key ={playerId}
                        playersSelected={playersSelected}
                        updatePlayers={updatePlayers}
                      /> 
                    )
                  })
                }
              </React.Fragment>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
  
export default withRouter (Resulter);



