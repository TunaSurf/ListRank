import React, { Component } from 'react';
import IndividualRank from "./IndividualRank";
import './Results.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      individualRanksShown: false
    }
    this.showIndividualRanks = this.showIndividualRanks.bind(this);
  }

  showIndividualRanks() {
    const shown = this.state.individualRanksShown;
    this.setState({individualRanksShown: !shown})
  }

  render() {
    const options = this.props.options;
    const allRanks = this.props.ranks;
    let totalRanks = [...options].map(() => ({ option: "", score: 0 }));
    let totalsList = [];
    let winner = {};

    for(let i=0; i< options.length; i++) {
      totalRanks[i].option = options[i];
    }

    for(let i=0; i<allRanks.length; i++) {
      for(let j=0; j<allRanks[i].length; j++) {
        totalRanks[j].score += allRanks[i][j];
      }
    }

    totalRanks.sort((a,b) => b.score - a.score);

    for(let i=0; i<options.length; i++) {
      if(i === 0) {
        winner = { boxShadow: '0 1px 12px 1px rgba(96,42,60,0.14), 0 3px 1px -2px rgba(241,106,150,0.8)'};
      }
      totalsList.push(
        <div className="list" style={winner} key={i}>
          <p>{totalRanks[i].option}</p>
          <p>{totalRanks[i].score}</p>
        </div>
      )
      winner = {};
    }

    let individualRanks = null;
    if (this.state.individualRanksShown) {
      individualRanks = allRanks.map((voterRanks, i) => (
        <IndividualRank
          voter={i + 1}
          voterRanks={voterRanks}
          options={options}
          key={i}
        />
      ));
    }

    return (
      <div className="Results">
        <div className="title">
          <h2>Results</h2>
        </div>
        {totalsList}
        <div className="viewIndividuals">
          <a onClick={this.showIndividualRanks}>View individual rankings</a>
        </div>
        {individualRanks}
      </div>
    )
  }
}

export default Results;