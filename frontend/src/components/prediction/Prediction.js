import React, { Component } from 'react';
import moment from 'moment';
import './Prediction.css';

function Match(props) {
  return (
    <div>
      <div>
        {moment(props.date).format('Do MMM, hh:mm a')}
      </div>
      <div>
        @ {props.stadium.name} ({props.stadium.city})
      </div>
      <div>
        {props.home_team.name} vs {props.away_team.name}
      </div>

      <form className="form" onSubmit={props.submitHandler}>
        <div className="input">
          <label>
            User:
          </label>
          <div>
            <input type="text" name="user" value={props.user} onChange={props.changeHandler} />
          </div>
        </div>
        <div className="input">
          <label>
            {props.home_team.name}
          </label>
          <div>
            <input type="number" name="homeResult" value={props.homeResult} onChange={props.changeHandler} id={props.name} />
          </div>
        </div>
        <div className="input">
          <label>
            {props.away_team.name}
          </label>
          <input type="number" name="awayResult" value={props.awayResult} onChange={props.changeHandler} id={props.name} />
        </div>
        <input type="submit" value="Predict" onClick={props.update} />
      </form>
    </div>
  )
}

class Prediction extends Component {
  state = {
    user: null,
    game: null,
    homeResult: null,
    awayResult: null,
    predictionArr: [],
  }

  addPrediction = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const game = target.id;

    this.setState({
      game,
      [name]: value,
    })
  }

  submitPrediction = (event) => {
    event.preventDefault();

    const prediction = {
      user: this.state.user,
      game: this.state.game,
      homeResult: this.state.homeResult,
      awayResult: this.state.awayResult,
    }
    // TODO: Post and save to database
    event.persist();
    this.postPrediction(prediction)
      .then(data => {
        event.target.reset();
      })
      .catch(err => {
        console.error(err)
      })
  }

  postPrediction = async (prediction) => {
    const uri = 'https://fifa-world-cup-2018.herokuapp.com' || 'http://localhost:5000';
    const url = uri + '/api/prediction';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(prediction)
    };
    const response = await fetch(url, options);
    const newPrediction = await response.json();
    return newPrediction;
  }

  render() {
    const matchesData = this.props.matches;
    const futureGames = [];
    for (let match of matchesData) {
      if (Date.parse(match.date) > Date.now()) {
        futureGames.push(<Match key={match.name} prediction={this.state} {...match} changeHandler={this.addPrediction} submitHandler={this.submitPrediction} update={this.props.update} />)
      }
    }

    return (
      <div className="prediction-container">
        <h3>{this.props.name}</h3>
        {futureGames}
      </div>
    )

  }
}

// function Prediction(props) {
//   console.log(props)
//   const futureGames = [];
//   for (let match of props.matches) {
//     if (Date.parse(match.date) > Date.now()) {
//       futureGames.push(<Match key={match.name} {...match} onChange={props.addPrediction} onSubmit={props.submitPrediction} />)
//     }
//   }
//   return (
//     <div className="prediction-container">
//       <h3>{props.name}</h3>
//       {futureGames}
//     </div>
//   )
// }

export default Prediction;