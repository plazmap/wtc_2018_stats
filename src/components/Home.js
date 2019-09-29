import React from 'react';
import { Header } from "./Header";
import Presenter from "./Presenter";
import { faSitemap, faBiohazard, faChartBar, faChessKing } from "@fortawesome/free-solid-svg-icons";

class Home extends React.Component {

  render(){
    return (
      <React.Fragment>
        <Header />
        <br/>
        <br/>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <Presenter 
            image={faChessKing} 
            title={"Results!"}
            content={"Get all tournament results. So you can mock your WTC friends who lost against some British team"} 
            link={"/results"}
          />
          <Presenter 
            image={faChartBar} 
            title={"Rankings"}
            content={"Check all rankings : teams duh, but players as well, coz teamplay is overated. Check out lists results, so you can see which neckDeck won better"} 
            link={"/rankings"}
          />
          <Presenter 
            image={faSitemap} 
            title={"Explorer"}
            content={"Explore team composition, players' lists, and crawl deep into creepy comparisons !"} 
            link={"/explorer"}
          />
          <Presenter 
            image={faBiohazard} 
            title={"Coin!"}
            content={"Coincoinc oicnoic ncoicnco icncoicnc coiic oinc oincoco oi oic ncoicn coin. COIN"} 
            link={"/biohazard"}
          />
        </div> 
      </React.Fragment>
      );
  }
}

export default Home;
