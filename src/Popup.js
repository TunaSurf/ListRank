import React, { Component } from 'react';
import './Popup.css';

class Popup extends Component {
  render() {
    const error = this.props.error;
    const errorMessages = {
      1: "Please select the number of voters",
      2: "Please select the number of options",
      3: "Please fill out all options",
      4: "All numbers must be used exactly once"
    }
    let style = {display: 'none'}
    let message = "Error"


    if(error) {
      style = {display: 'block'};
      message = errorMessages[error];
    }

    return (
      <div className="Popup" style={style}>
        <div className="errorContainer">
          <h3>{message}</h3>
          <button type="button" className="returnButton" onClick={this.props.handleReturn}>Return</button>
        </div>
      </div>
    )
  }
}

export default Popup;