import React from "react";

class PlayerExplorer extends React.Component {
    
  getClass = () => {
    const {index, playersSelected} = this.props;
    if  (playersSelected.includes(index)){
        return "bg-secondary text-light";
    } else {
        return "";
    }
  }


  render () {
    
    const{playerName, playerResult, updatePlayers, index, playerFaction} = this.props;
    return (
      <tr className={this.getClass()} style={{cursor: "pointer"}} onClick={() => updatePlayers(index)}>
        <td></td>
        <td></td>
        <td></td>
        <td colSpan="7">{playerName}</td>
        <td colSpan="2">{playerFaction}</td>
        <td>{playerResult==="DNP" ? "DNP" : "Went "+playerResult+" - "+(6-playerResult)}</td>
        <td></td>
      </tr>
    )
  }
}
export default PlayerExplorer;