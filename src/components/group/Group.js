import React from 'react';
import moment from 'moment';
import './Group.css'

function Match({home_team, away_team, home_result, away_result, date, stadium}) {
  return (
    <div>
      <div>
        {moment(date).format('Do MMM, hh:mm a')}
      </div>
      <div>
      @ {stadium.name} ({stadium.city})
      </div>
      <div>
        {home_team.name} vs {away_team.name}
      </div>
      <div>
        {home_result === null ? "" : home_result + " : " + away_result}
      </div>
      <p>{"_"}</p>
    </div>
  )
}

function Group({name, matches}) {
  const games = matches.map(match => {
    return (
      <Match key={match.name} {...match}/>
    )
  })
  return (
    <div className="group-container">
      <h3>{name}</h3>
      {games}
    </div>
  )
}

export default Group;