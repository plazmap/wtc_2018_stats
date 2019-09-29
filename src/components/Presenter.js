import React from "react";
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Presenter extends React.Component {

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

  getStyle = () => {
    return {
        boxSizing: "border-box",
        cursor: "pointer",
        height : "300px",
        width : "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",

    }
  }

  getClass = () => {
    return this.state.isHovered ? "border border-warning bg-light" : "bg-light";
  }

  link = () => {
    const {history, link} = this.props;    
    history.push(link);
  }

  render() {
    const {title, content, image} = this.props;
    return (
      <div 
        className={this.getClass()} 
        style={this.getStyle()} 
        onClick={this.link}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
      >
          <h3 className={"text-warning"} style={{textAlign: "center"}}>{title}</h3>
          <br/>
          <FontAwesomeIcon icon={image} size="3x"/>
          <br/>
          <p style={{width: "90%"}}>{content}</p>
      </div>
      
    )
  }
}

export default withRouter (Presenter);