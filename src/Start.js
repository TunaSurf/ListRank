import React, { Component } from 'react';
import './Start.css';

class Start extends Component {
  render() {
    const numOptions = this.props.numOptions;
    const optionForm = [];
    for(let i=1; i <= numOptions; i++) {
      optionForm.push(
        <li key={i}>
          <label htmlFor={`Option${i}`}></label>
          <input 
            type="text" 
            name={i} 
            className="list"
            id={`option${i}`}
            placeholder={`Option ${i}`} 
            onChange={this.props.optionChange}
          />
        </li>
      );
    }
    
    return (
      <div className="Start">
        <div className="startOptions">
          <div className="title">
            <div className="circle"></div>
            <h1 >ListRank</h1>
          </div>
          <form>
            <div className="sliderLabel">
              <label htmlFor="voters">How many voters?</label>
              <p className="slideNumPicked">{this.props.voters}</p>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              defaultValue="0"
              list="voterLabel"
              onChange={this.props.numVotersChange}
            />
            <div className="sliderLabel">
              <p className="sliderMarking">0</p>
              <p className="sliderMarking">8</p>
            </div>
          </form>
          <form>
            <div className="sliderLabel">
              <label htmlFor="numOptions">How many options?</label>
              <p className="slideNumPicked">{this.props.numOptions}</p>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              defaultValue="0"
              list="optionLabel"
              onChange={this.props.numOptionsChange}
            />
            <div className="sliderLabel">
              <p className="sliderMarking">0</p>
              <p className="sliderMarking">12</p>
            </div>
          </form>
          <ul>
            {optionForm}
          </ul>
        </div>
        <button className="button" type="button" onClick={this.props.handleStart}>Start</button>
      </div>
    );
  }
}

export default Start;