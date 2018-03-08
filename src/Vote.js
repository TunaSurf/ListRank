import React, { Component } from 'react';
import './Vote.css';

class Vote extends Component {
  render() {
    const options = Array.from(this.props.options);
    let dropdown = [];
    for (let i = 1; i <= options.length; i++) {
      dropdown.push(
        <option value={i} key={i}>{i}</option>
      );
    };
    const optionsList = options.map((option, i) => (
      <div className="list optionsList" key={i}>
        <label htmlFor={`voteOption${i}`}>{option}</label>
        <select 
          id={`voteOption${i}`} 
          type="dropdown" 
          name={i} 
          onChange={this.props.voteOptionChange} 
          value={this.props.optionRanks[i] ? this.props.optionRanks[i] : "0"} //if optionRanks[i] is undefined (ex: on next) set value to 0
        >
          <option value="0">-</option>
          {dropdown}
        </select>
      </div>
    ));
    let submitButton = <button className="button" type="button" onClick={this.props.handleNext}>Next</button>;
    if(this.props.currentVoter === this.props.voters) {
      submitButton = <button className="button" type="button" onClick={this.props.handleNext}>Finish</button>
    }

    return (
      <div className="Vote">
        <div className="title">
          <h2>Voter <span>{this.props.currentVoter}</span> of {this.props.voters}</h2>
          <p>Give each option a unique score (higher scores are better)</p>
        </div>
        <form>
          {optionsList}
        </form>
        {submitButton}
      </div>
    )
  }
}

export default Vote;