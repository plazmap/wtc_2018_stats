import React from 'react';
import Flag from 'react-world-flags';

class TeamResult extends React.Component {

    getClass = () => {
        const {zone, zonesSelected} = this.props;
        if  (zonesSelected && zonesSelected.includes(zone)){

            return "bg-warning text-light";
        } else {
            return "";
        }
    }
    render(){
        const { zone, winnerTeam, loserTeam, victoryType, updateZones} = this.props; 

        return (
        <tr 
            className={this.getClass()}
            style={{cursor: "pointer"}} 
            onClick={() => updateZones(zone)}
        >
            <th scope="row">{zone}</th>
            <td className="d-flex justify-content-center">
                <Flag 
                    style={{textAlign: "center"}} 
                    code={winnerTeam.flag} 
                    height="16"/>
            </td>
            <td colSpan="2">{winnerTeam.name}</td>
            <td style={{fontFamily: "Rye", textAlign: "center"}}>{victoryType}</td>
            <td colSpan="2" style={{textAlign: "right"}}>{loserTeam.name}</td>
            <td className="d-flex justify-content-center">
                <Flag 
                    style={{textAlign: "center"}}
                    code={loserTeam.flag} 
                    height="16"/>
            </td>
        </tr>
        )
    }
}

export default TeamResult;
