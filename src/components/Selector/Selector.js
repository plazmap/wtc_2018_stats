import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'reactstrap';
import SelectButton from "./SelectButton";

class Selector extends React.Component {

    render(){
        const {selectButtons, buttonSelected, changeItems, title, link} = this.props;
        return (
            <Table hover style={{width:"10%"}}>
            <thead>
              <tr><th>{title}</th></tr>
            </thead>
            <tbody>
              {Object.keys(selectButtons).map(key => 
                <SelectButton 
                    classChecker={buttonSelected} 
                    key ={key} 
                    linkParam={key} 
                    content={selectButtons[key]} 
                    click={changeItems}
                    link={link}    
                />     
              )}
            </tbody>
          </Table>
        )
    }
}

export default withRouter (Selector);
