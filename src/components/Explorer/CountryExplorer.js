import React from "react";
import Flag from 'react-world-flags';


class CountryExplorer extends React.Component {
  
  getClass = () => {
    const {index, countriesSelected} = this.props;
    if  (countriesSelected.includes(index)){
        return "bg-warning text-light";
    } else {
        return "";
    }
  }

  render () {
    const{flag, countryName, teams, updateCountries, index} = this.props;
    return (
      <tr className={this.getClass()} style={{cursor: "pointer"}} onClick={() => updateCountries(index)}>
        <td>
          <Flag 
            style={{textAlign: "center"}}
            code={flag} 
            height="16"/>
        </td>
        <td colSpan="7" style={{fontWeight:"bold"}}>{countryName}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>{teams} teams</td>
        
      </tr>
    )
  }
}
export default CountryExplorer;