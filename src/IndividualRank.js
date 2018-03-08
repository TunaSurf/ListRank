import React, { Component } from 'react';

class IndividualRank extends Component {
  render() {
    let voterRanks = [...this.props.options].map((option, i) => ({ option: option, score: this.props.voterRanks[i]}));
    voterRanks.sort((a, b) => b.score - a.score);
    const displayRanks = voterRanks.map((option, i) => (
      <div className="list" key={i}>
        <p>{option.option}</p>
        <p>{option.score}</p>
      </div>
    ));

    return (
      <div className="IndividualRank">
        <h3 className="voterLabel">Voter <span>{this.props.voter}</span></h3>
        {displayRanks}
      </div>
    )
  }
}

export default IndividualRank;