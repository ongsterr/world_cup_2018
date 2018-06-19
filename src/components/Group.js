import React from 'react';
import moment from 'moment';

function Match({home_team, away_team}) {
  return (
    <div>
      {home_team.name} vs {away_team.name}
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
    <div>
      <h3>{name}</h3>
      {games}
    </div>
  )
}

export default Group;