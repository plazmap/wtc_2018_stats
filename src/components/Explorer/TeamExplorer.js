import React from "react";


class TeamExplorer extends React.Component {
    
  getClass = () => {
    const {index, teamsSelected} = this.props;
    if  (teamsSelected.includes(index)){
        return "bg-info text-light";
    } else {
        return "";
    }
  }

  render () {
    
    const{teamName, teamResult, updateTeams, index} = this.props;
    return (
      <tr className = {this.getClass()} style={{cursor: "pointer"}} onClick={() => updateTeams(index)}>
        <td></td>
        <td></td>
        <td style={{fontWeight:"bold"}} colSpan="7">{teamName}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>Went {teamResult} - {6-teamResult}</td>
        <td></td>
      </tr>
    )
  }
}
export default TeamExplorer;