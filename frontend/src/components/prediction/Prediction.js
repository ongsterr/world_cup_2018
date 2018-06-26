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
    winner: null,
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

  submitPrediction = async (event) => {
    event.preventDefault();
    const form = event.target;
    const user = form.user.value;
    const game = form.homeResult.id;
    const homeResult = form.homeResult.value;
    const awayResult = form.awayResult.value;

    const prediction = {
      user,
      game,
      homeResult,
      awayResult,
      winner: homeResult > awayResult ? "Home" : (awayResult > homeResult ? "Away" : "Draw"),
    }
    // TODO: Post and save to database
    event.persist();
    await this.postPrediction(prediction)
      .then(data => {
        console.log(data);
        console.log(prediction);
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

export default Prediction;