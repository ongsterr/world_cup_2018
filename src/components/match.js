import React from 'react';
import moment from 'moment';

function Matches(props) {
  const matchDisplay = [];
  const matches = props.matches;
  for (let match of matches) {
    const results = match.home_result != null ? `(${match.home_result} : ${match.away_result})` : ''
    matchDisplay.push(
      (
        <div>
          <div className="ui relaxed divided list">
            <div className="item">
              <div className="content">
                <div className="header">{match.home_team.name} {match.home_team.emojiString} vs {match.away_team.name} {match.away_team.emojiString} {results}</div>
                <div className="description">@ {match.stadium.name} ({match.stadium.city})</div>
                <div className="description">{moment(match.date).format('MMMM Do YYYY h:mm a')}</div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
  return matchDisplay;
}

export default Matches;