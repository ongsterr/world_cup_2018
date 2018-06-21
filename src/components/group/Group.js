import React from 'react';
import moment from 'moment';
import './Group.css';

function Match(props) {
  const predictionsArr = props.predictions;
  const predictionArr = [];
  let predictions = [];
  if (Array.isArray(predictionsArr) && predictionsArr.length > 0) {
    for (let i = 0; i < predictionsArr.length; i++) {
      if (predictionsArr[i].game == props.name) {
        predictionArr.push(predictionsArr[i]);
      }
    }
    predictions = predictionArr.map((prediction, index) => {
      return (
        <div>
          <div><strong>{index === 0 ? 'Predictions:' : ''}</strong></div>
          <div className="predictions">{props.home_team.name} vs {props.away_team.name} ({prediction.homeResult} : {prediction.awayResult})</div>
        </div>
      )
    })
  }
  
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
      <div>
        {props.home_result === null ? "" : props.home_result + " : " + props.away_result}
      </div>
      <div>{predictions}</div>
      <p>{"_"}</p>
    </div>
  )
}

function Group(props) {
  const games = props.matches.map(match => {
    return (
      <Match key={match.name} {...match} predictions={props.predictions}/>
    )
  })
  return (
    <div className="group-container">
      <h3>{props.name}</h3>
      {games}
    </div>
  )
}

export default Group;