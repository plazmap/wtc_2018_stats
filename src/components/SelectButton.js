import React from 'react';
import { withRouter } from 'react-router-dom';

class SelectButton extends React.Component {

    getClass =() => {
        const {linkParam, classChecker} = this.props;
        if (linkParam == classChecker){
            return "bg-warning text-light";
        }else{
            return"";
        }
    }

    render(){
        const { click, link, content, linkParam } = this.props;
        return (
            <tr>
                <td 
                style={{cursor: "pointer"}}
                className={this.getClass()}
                onClick={() => {
                    click(linkParam);
                    this.props.history.push(link+linkParam);
                }}
                >
                    {content}
                </td>
            </tr>
        )
    }
}

export default withRouter (SelectButton);
