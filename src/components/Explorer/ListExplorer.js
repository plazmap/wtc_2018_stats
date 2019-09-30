import React from "react";

class ListExplorer extends React.Component {
  getClass = () => {
    const {index, listsSelected} = this.props;
    if  (listsSelected.includes(index)){
        return "bg-primary text-light";
    } else {
        return "";
    }
  }

  
  render () {
    const{listCaster, listTheme, index, updateLists} = this.props;
    return (
      <tr className={this.getClass()} style={{cursor: "pointer"}} onClick={() => updateLists(index)}>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td colSpan="4">{listCaster}</td>
        <td colSpan="4">{listTheme}</td>
        <td></td>
        <td></td>
      </tr>
    )
  }
}
export default ListExplorer;