import React from "react";
import { Table } from 'reactstrap';
import TeamExplorer from "./TeamExplorer";
import PlayerExplorer from "./PlayerExplorer";
import ListExplorer from "./ListExplorer";
import CountryExplorer from "./CountryExplorer";

class Explorer extends React.Component {
    

  render () {
     
    const {data, updateCountries, updateTeams, updatePlayers, updateLists, countriesSelected, teamsSelected, playersSelected, listsSelected} = this.props;

    return (
      <div style={{width:"100%"}} className={"d-flex justify-content-center"}>

        <Table hover style={{width:"90%"}}>
          <thead>
            <tr>
              <th style={{width:"5%"}}></th>
              <th style={{width:"3%"}}></th>
              <th style={{width:"3%"}}></th>
              <th style={{width:"3%"}}></th>
              <th style={{width:"3%"}}></th>
              <th style={{width:"3%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
              <th style={{width:"10%"}}></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.countries).sort((a, b) => (data.countries[a].name > data.countries[b].name) ? 1 : -1).map(countryId => {
              let countryName = data.countries[countryId].name;
              let numberOfTeams = data.countries[countryId].teams.length;
              let flag = countryId;
              return (
                <React.Fragment>
                  <CountryExplorer
                    flag={flag}
                    countryName={countryName}
                    teams={numberOfTeams}
                    updateCountries={updateCountries}
                    key={countryId}
                    index={countryId}
                    countriesSelected={countriesSelected}
                    />
                    {countriesSelected.includes(countryId) && data.countries[countryId].teams.map(teamId => {
                      let teamName = data.teams[teamId].name;
                      let teamResult = Object.keys(data.teams[teamId].results).map(roundId => data.teams[teamId].results[roundId].win).reduce((a,b) => a+b);
                      return(
                        <React.Fragment>
                          <TeamExplorer
                            teamName={teamName}
                            updateTeams={updateTeams}
                            key={teamId}
                            index={teamId}
                            teamResult={teamResult}
                            teamsSelected={teamsSelected}
                          />
                          {teamsSelected.includes(teamId) && data.teams[teamId].playersId.map(playerId => {
                            let playerName = data.players[playerId].name;
                            let playerResult = data.players[playerId].results ? Object.keys(data.players[playerId].results).map(roundId => data.players[playerId].results[roundId].win).reduce((a,b) => a+b) : "DNP";
                            let playerFaction = data.players[playerId].faction;
                            return(
                              <React.Fragment>
                                <PlayerExplorer
                                  playerName={playerName}
                                  updatePlayers={updatePlayers}
                                  key={playerId}
                                  index={playerId}
                                  playerResult={playerResult}
                                  playersSelected={playersSelected}
                                  playerFaction={playerFaction}
                                />
                                {playersSelected.includes(playerId) && data.players[playerId].listsId.map(listId => {
                                  let listCaster = data.lists[listId].caster;
                                  let listTheme = data.lists[listId].theme;
                              
                                  return(
                                    <React.Fragment>
                                      <ListExplorer
                                        listCaster={listCaster}
                                        listTheme={listTheme}
                                        index={listId}
                                        key={listId}
                                        listsSelected={listsSelected}
                                        updateLists={updateLists}                                                                       
                                      />
                                      {listsSelected.includes(listId) && 
                                      <tr>
                                        <td colSpan="14"><div style={{whiteSpace:"pre"}}>{data.lists[listId].listdetail}</div></td>
                                      </tr>
                                      }
                                    </React.Fragment>
                                  )
                                })
                                }
                              </React.Fragment>
                            )
                          })
                          }
                        </React.Fragment>
                      )
                    })
                    }
                </React.Fragment>
              )
            })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
export default Explorer;