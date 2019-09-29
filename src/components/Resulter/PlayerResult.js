import React from 'react';

class PlayerResult extends React.Component {
    constructor(){
        super();
        this.state = {
            isHovered: false
        }
    }

    handleHover = () => {
        let newIsHovered = !(this.state.isHovered);
        this.setState({
            isHovered: newIsHovered
        })
    }


    render(){
        const Class = this.state.isHovered ? "bg-light" : "bg-white";
        const {index, player1Name, player2Name, result, faction1, faction2, list1, list2, theme1, theme2, caster1, caster2, playersSelected, key, updatePlayers} = this.props;

        return (
            <React.Fragment> 
                <tr className={Class} 
                    style={{cursor: "pointer"}} 
                    onClick={() => updatePlayers(index)}
                    onMouseEnter={this.handleHover}
                    onMouseLeave={this.handleHover}
                >
                    <th></th>
                    <td style={{fontWeight: "bold"}} colSpan="2">{player1Name}</td>
                    <td style={{fontStyle: "italic"}}>{caster1}</td>
                    <td style={{textAlign: "center", fontWeight: "bold"}}>{result}</td>
                    <td style={{textAlign: "right", fontStyle: "italic"}}>{caster2}</td>
                    <td colSpan="2" style={{textAlign: "right", fontWeight: "bold"}}>{player2Name}</td>
                </tr>
                {playersSelected.includes(index) &&
                <tr className={"bg-white"} style={{fontStyle: "italic"}} >
                    <th></th>
                    <td colSpan="2">{faction1}</td>
                    <td>{theme1}</td>
                    <td style={{textAlign: "center"}}></td>
                    <td style={{textAlign: "right"}}>{theme2}</td>
                    <td colSpan="2" style={{textAlign: "right"}}>{faction2}</td>
                </tr> 
                }
            </React.Fragment>
            
        )
    }
}

export default PlayerResult;
