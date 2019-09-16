import React from 'react';
import firebase from 'firebase';
import {firebaseApp} from "./../base";
import { Header } from "./Header";
import Navbarplop from "./Navbar";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {

    firebase.database().ref("yummyData/").once("value").then(snapshot => {
      let firebaseData = snapshot.val();
  
        this.setState({
          data: firebaseData
        });
    })
  }

  render(){
    return (
      <React.Fragment>
        <Navbarplop/>
        <Header />
      </React.Fragment>
      );
  }
}

export default App;
