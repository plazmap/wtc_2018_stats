import React from "react";
import { Jumbotron } from "reactstrap";


export function Header() {
  return (
    <Jumbotron className="bg-warning" style={{borderRadius: "0"}}>
      <h1 className="display-3 text-light">WTC 2018 Stats Analysis</h1>
      <p className="lead text-light">Great source of knowledge below</p>
      <hr />
      <p className="lead text-light">(Proceed with care)</p>
    </Jumbotron>
  );
}
