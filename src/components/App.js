import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import firebase from 'firebase';
import {firebaseApp} from "./../base";
import Home from "./Home/Home";
import NotFound from "./NotFound";
import Resulter from "./Resulter/Resulter";
import Explorer from "./Explorer/Explorer";
import Navbarplop from "./Navbarplop";
import {createFlagTags, createDataCountries, indexLists, indexPlayers, indexTeams, createRankingerData, createFactions, createThemes, createCasters, createCountries} from "./../DataHandlers";
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
        explorer:{
          countriesSelected:[],
          teamsSelected:[],
          playersSelected:[],
          listsSelected:[]
        },
        loadingDone: false
      }
    }
    componentDidMount() {
        firebase.database().ref("yummyData/").once("value").then(snapshot => {
          let data = snapshot.val();
            
          let {teams, players, lists} = data;
          
          createFlagTags(teams); 
          data["countries"] = createDataCountries(data);
          
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

          let loadingDone = true;
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
        resulter.zonesSelected = resulter.zonesSelected.filter(index => index !== zone);
      }else{
        resulter.zonesSelected.push(zone);
      }
      this.setState({resulter});
    }

    updateResulterPlayers = key => {
      let resulter = {...this.state.resulter};
      if (resulter.playersSelected.includes(key)){
        resulter.playersSelected = resulter.playersSelected.filter(index => index !== key);
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

    updateExplorerCountries = country => {
      let explorer = {...this.state.explorer};
      if (explorer.countriesSelected.includes(country)){
        explorer.countriesSelected = explorer.countriesSelected.filter(index => index !== country);
      }else{
        explorer.countriesSelected.push(country);
      }
      this.setState({explorer});
    }
    
    updateExplorerTeams = team => {
      let explorer = {...this.state.explorer};
      if (explorer.teamsSelected.includes(team)){
        explorer.teamsSelected = explorer.teamsSelected.filter(index => index !== team);
      }else{
        explorer.teamsSelected.push(team);
      }
      this.setState({explorer});
    }

    updateExplorerPlayers = player => {
       let explorer = {...this.state.explorer};
      if (explorer.playersSelected.includes(player)){
        explorer.playersSelected = explorer.playersSelected.filter(index => index !== player);
      }else{
        explorer.playersSelected.push(player);
      }
      this.setState({explorer});
    }

    updateExplorerLists = list => {
       let explorer = {...this.state.explorer};
      if (explorer.listsSelected.includes(list)){
        explorer.listsSelected = explorer.listsSelected.filter(index => index !== list);
      }else{
        explorer.listsSelected.push(list);
      }
      this.setState({explorer});
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
        
        const rankinger = () => {
          const{typeSelected, sortBy} = this.state.rankinger;
          return <Rankinger
            data={this.state.data} 
            typeSelected={typeSelected}
            changeType={this.changeRankingerType}
            results={this.state.rankinger.data[typeSelected]}
            sortBy={sortBy}
            changeSort ={this.changeRankingerSortBy}
          />
        }

        const explorer = () => {

          const{countriesSelected, teamsSelected, playersSelected, listsSelected} = this.state.explorer;
          
          return <Explorer
            data = {this.state.data} 
            updateCountries = {this.updateExplorerCountries}
            updateTeams = {this.updateExplorerTeams}
            updatePlayers = {this.updateExplorerPlayers}
            updateLists = {this.updateExplorerLists}
            countriesSelected = {countriesSelected}
            teamsSelected ={teamsSelected}
            playersSelected ={playersSelected}
            listsSelected ={listsSelected}
          />
        }

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
                        render={explorer}
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
