import Rankinger from "./components/Rankinger/Rankinger";

export function indexTeams(teams){
    let teamsIndex = {};
    Object.keys(teams).forEach(team => {
        teamsIndex[teams[team].name] = teams[team].id;
      })
    return teamsIndex;

}
export function indexPlayers(players){
    let playersIndex= {};
    Object.keys(players).forEach(player => {
        playersIndex[players[player].name] = players[player].id;
      })
    return playersIndex;

}
export function indexLists(lists){
    let listsIndex= {};
    Object.keys(lists).forEach(list => {
        if (!listsIndex[lists[list].caster]) {
          listsIndex[lists[list].caster] = []
          listsIndex[lists[list].caster].push(lists[list].id);
        }else{
          listsIndex[lists[list].caster].push(lists[list].id);              
        }
      })
    return listsIndex;
}

export function indexCountries(){

}

export function createRankingerData(data){
  let teams = Object.keys(data.teams).map(teamKey => {
    let team = {};
    let opponentsId = Object.keys(data.teams[teamKey].results).map(resultKey => data.teams[teamKey].results[resultKey].opponentId);
    team["teamSos"] = opponentsId.map(opponentId => Object.keys(data.teams[opponentId].results).map(resultKey => data.teams[opponentId].results[resultKey].win).reduce((a,b)=> a+b)).reduce((a,b)=> a+b);
    team["name"] = data.teams[teamKey].name;
    team["wins"] = Object.keys(data.teams[teamKey].results).map(roundKey => data.teams[teamKey].results[roundKey].win).reduce((a,b) => a+b);
    team["id"] = teamKey;
    team["secondSorter"] = "teamSos";
    team["flag"] = data.teams[teamKey].flag;
    return team;
  });

  let players = Object.keys(data.players).filter(playerId => data.players[playerId].results).map(playerKey => {
    let player = {};
    let opponentsId = Object.keys(data.players[playerKey].results).map(resultKey => data.players[playerKey].results[resultKey].opponentId);
    player["playerSos"] = opponentsId.map(opponentId => Object.keys(data.players[opponentId].results).map(resultKey => data.players[opponentId].results[resultKey].win).reduce((a,b)=> a+b)).reduce((a,b)=> a+b);;
    player["name"] = data.players[playerKey].name;
    player["wins"] = Object.keys(data.players[playerKey].results).map(roundKey => data.players[playerKey].results[roundKey].win).reduce((a,b) => a+b);
    player["secondSorter"] = "playerSos";
    player["teamSos"] = teams.filter(team => team.id == data.players[playerKey].teamId)[0].teamSos;
    player["flag"] = data.teams[data.players[playerKey].teamId].flag;
    return player;
  })


  let rankingerData = {};
  rankingerData.teams = teams;
  rankingerData.players = players;
  return rankingerData;
}


export function createFactions(data){
  
  let list = {};
  Object.keys(data.players).forEach(playerId => {
      if (!(list[data.players[playerId].faction])) {
        list[data.players[playerId].faction] = [];
      }
      list[data.players[playerId].faction].push(playerId)
    })
  
    return list;

  }
  
  export function createThemes(data){
    let list = {};
    Object.keys(data.lists).forEach(listId => {
      if (!(list[data.lists[listId].theme])) {
        list[data.lists[listId].theme] = [];
      }
      list[data.lists[listId].theme].push(listId)
    })
    return list;
}

export function createCasters(data){
  let list = {};
  Object.keys(data.lists).forEach(listId => {
    if (!(list[data.lists[listId].caster])) {
      list[data.lists[listId].caster] = [];
    }
    list[data.lists[listId].caster].push(listId)
  })
  return list;
}
export function createCountries(data){
  let list = {};
  Object.keys(data.teams).forEach(teamId => {
    if (!(list[data.teams[teamId].flag])){
      list[data.teams[teamId].flag] = [];
    }
    list[data.teams[teamId].flag].push(teamId);
  })
  return list;
}

export function createFlagTags(teams){

    teams[1439].flag = "124";
    teams[1441].flag = "036";
    teams[1442].flag = "036";
    teams[1443].flag = "036";
    teams[1444].flag = "040";
    teams[1445].flag = "040";
    teams[1446].flag = "056";
    teams[1447].flag = "056";
    teams[1448].flag = "056";
    teams[1449].flag = "124";
    teams[1450].flag = "124";
    teams[1451].flag = "203";
    teams[1452].flag = "203";
    teams[1453].flag = "208";
    teams[1454].flag = "208";
    teams[1455].flag = "826";
    teams[1456].flag = "826";
    teams[1457].flag = "826";
    teams[1458].flag = "233";
    teams[1459].flag = "246";
    teams[1460].flag = "246";
    teams[1461].flag = "250";
    teams[1462].flag = "250";
    teams[1463].flag = "250";
    teams[1464].flag = "276";
    teams[1465].flag = "276";
    teams[1466].flag = "276";
    teams[1467].flag = "300";
    teams[1468].flag = "300";
    teams[1469].flag = "348";
    teams[1470].flag = "372";
    teams[1471].flag = "372";
    teams[1472].flag = "380";
    teams[1473].flag = "380";
    teams[1474].flag = "380";
    teams[1475].flag = "554";
    teams[1476].flag = "578";
    teams[1477].flag = "578";
    teams[1478].flag = "578";
    teams[1479].flag = "616";
    teams[1480].flag = "616";
    teams[1481].flag = "616";
    teams[1482].flag = "620";
    teams[1483].flag = "620";
    teams[1484].flag = "643";
    teams[1485].flag = "643";
    teams[1486].flag = "643";
    teams[1487].flag = "826";
    teams[1488].flag = "826";
    teams[1489].flag = "705";
    teams[1490].flag = "724";
    teams[1491].flag = "724";
    teams[1492].flag = "752";
    teams[1493].flag = "752";
    teams[1494].flag = "752";
    teams[1495].flag = "756";
    teams[1496].flag = "756";
    teams[1497].flag = "804";
    teams[1498].flag = "840";
    teams[1499].flag = "840";
    teams[1500].flag = "840";
    teams[1501].flag = "826";
    teams[1502].flag = "826";
    teams[1503].flag = "528";
}