import React, { Component } from 'react';
import './App.css';
import Start from "./Start";
import Vote from "./Vote";
import Results from "./Results";
import Popup from "./Popup";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voters: 0,
      currentVoter: 1,
      numOptions: 0,
      options: [],
      optionRanks: [],
      rankHolder: [],
      view: 0,
      error: 0
    }
    this.numOptionsChange = this.numOptionsChange.bind(this);
    this.numVotersChange = this.numVotersChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleVoteOptionChange = this.handleVoteOptionChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  numOptionsChange(e) {
    this.setState({  
      numOptions: Number(e.target.value) ,
      options: new Array(Number(e.target.value)),
      optionRanks: new Array(Number(e.target.value))
    });
  }

  numVotersChange(e) {
    this.setState({ voters: Number(e.target.value) });
  }

  handleOptionChange(e) {
    const index = Number(e.target.name) - 1;
    const options = Array.from(this.state.options);
    options[index] = e.target.value;
    this.setState({ options });
  }

  handleStart() {
    const options = Array.from(this.state.options);
    const voters = this.state.voters;
    let optionsPassed = options.every(option => option);
    if(voters) {
      if (options.length > 0) {
        if (optionsPassed) {
            this.setState({ view: 1 });
        } else {
          this.setState({ error: 3 });
        }
      } else {
        this.setState({ error: 2 });
      }
    } else {
      this.setState({ error: 1 });
    }
  }

  handleVoteOptionChange(e) {
    const index = Number(e.target.name);
    const optionRanks = Array.from(this.state.optionRanks);
    optionRanks[index] = Number(e.target.value);
    this.setState({ optionRanks })
  }

  handleNext() {
    const optionRanks = Array.from(this.state.optionRanks);
    const ranksGiven = optionRanks.every(rank => rank);
    const ranksUnique = isUnique(optionRanks);
    if(ranksGiven) {
      if(ranksUnique) {
        if (this.state.currentVoter === this.state.voters) {
          this.setState({
            rankHolder: [...this.state.rankHolder, optionRanks],
            view: 2
          });
        } else {
          const newOptionRanksArray = new Array(this.state.numOptions);
          this.setState(prevState => {
            return {
              rankHolder: [...this.state.rankHolder, optionRanks],
              currentVoter: prevState.currentVoter + 1,
              optionRanks: newOptionRanksArray
            }
          });
        }
      } else {
        this.setState({error: 4});
      }
    } else {
      this.setState({error: 3});
    }

    //Function to determine that no options were given the same rank
    function isUnique(ranks) {
      let count = [];
      for (let i = 0; i <= ranks.length; i++) {
        if (count[ranks[i]] === undefined) {
          count[ranks[i]] = 1;
        } else {
          return false;
        }
      }
      return true;
    }
  }

  handleReturn() {
    this.setState({error: 0});
  }

  render() {
    let view = <div>Loading...</div>
    if(this.state.view === 0) {
      view = <Start
        numOptions={this.state.numOptions}
        numOptionsChange={this.numOptionsChange}
        voters={this.state.voters}
        numVotersChange={this.numVotersChange}
        optionChange={this.handleOptionChange}
        handleStart={this.handleStart}
      />
    } else if(this.state.view === 1) {
      view = <Vote 
        voters={this.state.voters}
        currentVoter={this.state.currentVoter}
        options={this.state.options}
        optionRanks={this.state.optionRanks}
        voteOptionChange={this.handleVoteOptionChange}
        handleNext={this.handleNext}
        handleFinish={this.handleFinish}
      />
    } else if(this.state.view === 2) {
      view = <Results 
        options={this.state.options}
        ranks={this.state.rankHolder}
      />
    }

    return (
      <div className="App">
        <div className="headColor"></div>
        <Popup
          error={this.state.error} 
          handleReturn={this.handleReturn} 
        />
        {view}
      </div>
    );
  }
}

export default App;
