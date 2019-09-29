import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import firebase from 'firebase';
import {firebaseApp} from "./../base";
import Home from "./Home/Home";
import NotFound from "./NotFound";
import Resulter from "./Resulter/Resulter";
import Explorer from "./Explorer/Explorer";
import Navbarplop from "./Navbarplop";
import {createFlagTags, indexLists, indexPlayers, indexTeams, createRankingerData, createFactions, createThemes, createCasters, createCountries} from "./../DataHandlers";
import Waiter from "./Waiter";
import Rankinger from "./Rankinger/Rankinger";

class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        data: {},
        indexes:{},
        listings:{},
        resulter:{
          roundSelected:"6",
          zonesSelected:[],
          playersSelected:[]
        },
        rankinger:{
          typeSelected:"teams",
          sortBy:"wins",
          data:{}
        },
        loadingDone: false
      }
    }
    componentDidMount() {
        firebase.database().ref("yummyData/").once("value").then(snapshot => {
          let data = snapshot.val();
            
          let {teams, players, lists} = data;
          
          createFlagTags(teams); 

          
          let factionsList = createFactions(data);
          let themesList = createThemes(data);
          let castersList = createCasters(data);
          let countriesList = createCountries(data);
          
          let teamsIndex = indexTeams(teams);
          let playersIndex= indexPlayers(players);
          let listsIndex= indexLists(lists);
          
          let rankingerData = createRankingerData(data);
                    
          let rankinger = {...this.state.rankinger};
          rankinger.data = rankingerData;

          let indexes={...this.state.indexes};
          indexes.lists = listsIndex;
          indexes.players = playersIndex;
          indexes.teams = teamsIndex;

          let listings={...this.state.listings}
          listings.faction = factionsList;
          listings.theme = themesList;
          listings.caster = castersList;
          listings.country = countriesList;

          let loadingDone =true;
          this.setState({
            data,
            rankinger,
            indexes,
            listings,
            loadingDone
          });
        })
      }

    changeResulterRound = round => {
      let resulter = {...this.state.resulter};
      resulter.roundSelected = round;
      resulter.zonesSelected = [];
      resulter.playersSelected = [];
      this.setState({resulter})
    }

    updateResulterZones = zone => {
      let resulter = {...this.state.resulter};
      if (resulter.zonesSelected.includes(zone)){
        resulter.zonesSelected = resulter.zonesSelected.filter(index => index != zone);
      }else{
        resulter.zonesSelected.push(zone);
      }
      this.setState({resulter});
    }

    updateResulterPlayers = key => {
      let resulter = {...this.state.resulter};
      if (resulter.playersSelected.includes(key)){
        resulter.playersSelected = resulter.playersSelected.filter(index => index != key);
      }else{
        resulter.playersSelected.push(key);
      }
      this.setState({resulter});
    }

    changeRankingerType = type => {
      let rankinger = {...this.state.rankinger};
      rankinger.typeSelected = type;
      rankinger.sortBy = "wins";
      this.setState({rankinger})
    }

    changeRankingerSortBy = sortBy => {
      let rankinger = {...this.state.rankinger};
      rankinger.sortBy = sortBy;
      this.setState({rankinger})
    }

    render(){

      if (this.state.loadingDone){

        const{roundSelected, zonesSelected, playersSelected} = this.state.resulter;
        const resulter = () => (
            <Resulter 
              data={this.state.data} 
              roundSelected={roundSelected}
              zonesSelected={zonesSelected}
              playersSelected={playersSelected}
              changeRound={this.changeResulterRound}
              updateZones={this.updateResulterZones}
              updatePlayers={this.updateResulterPlayers}
            />
        )
        const{typeSelected, sortBy} = this.state.rankinger;

        const rankinger = () => (
          <Rankinger
            data={this.state.data} 
            typeSelected={typeSelected}
            changeType={this.changeRankingerType}
            results={this.state.rankinger.data[typeSelected]}
            sortBy={sortBy}
            changeSort ={this.changeRankingerSortBy}
          />

        )
          return (
              <BrowserRouter>
                  <Navbarplop/>    
                  <Switch>
                      <Route 
                        exact path="/" 
                        component={Home}
                      />
                      <Route 
                        exact path="/results" 
                        render ={resulter}
                      />
                      <Route 
                        path="/results/:round" 
                        render ={resulter}
                      />
                      <Route 
                        exact path="/rankings" 
                        render={rankinger}
                      />
                      <Route 
                        path="/rankings/:type" 
                        render={rankinger}
                      />
                      <Route 
                        exact path="/explorer" 
                        component={Explorer}
                      />
                      <Route 
                        component={NotFound}
                      />
                  </Switch> 
              </BrowserRouter>
          ) 

      }else{
        return(
          <BrowserRouter>
            <React.Fragment>
              <Navbarplop/> 
              <Waiter/>
            </React.Fragment>
          </BrowserRouter>
        )
      }
    }
}

export default App;
