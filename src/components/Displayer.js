import React from "react";
import Resulter from "./Resulter"

class Displayer extends React.Component {
    getStyle = () => {
        return {
            height : "250px",
            width : "20%",
            
        }
    }
  render() {

    let toDisplay;

    if (this.props.selectedDisplayer === "results"){
      toDisplay = <Resulter data = {this.props.data}/>;
      
    }else{
      toDisplay = <p>plop</p>;  
    }
        return (
        <div>
          {toDisplay}
        </div>
        )
  }
}

export default Displayer;