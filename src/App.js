// What's the goal? What do we want to have on the screen?

import React, { Component } from 'react';
import Matches from './components/match';
import './App.css';

class App extends Component {

  state = {
    matches: {
      groupA: null,
      groupB: null,
      groupC: null,
      groupD: null,
      groupE: null,
      groupF: null,
      groupG: null,
      groupH: null,
    },
    stadiums: null,
    teams: null,
  }

  componentDidMount() {
    this.fetchMatches()
      .catch(err => console.error(err))
  }

  handleChanges = (value) => {
    const message = value
    this.setState( () => {
      return {
        message,
      }
    })
  }

  async fetchMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json';
    const response = await fetch(url);
    const data = await response.json();

    const groupData = data.groups;
    const groupMatches = [];
    for (let group in groupData) {
      groupMatches.push(groupData[group])
    }
    console.log(groupMatches);

    const teams = data.teams;
    const stadiums = data.stadiums;
    for (let h = 0; h < groupMatches.length; h++) {
      const allMatches = groupMatches[h].matches;
      for (let match of allMatches) {
        let homeTeam = match.home_team;
        let awayTeam = match.away_team;
        let matchStadium = match.stadium;

        match.home_team = teams.find(team => {
          return homeTeam === team.id
        });
        match.away_team = teams.find(team => {
          return awayTeam === team.id
        });
        match.stadium = stadiums.find(stadium => {
          return matchStadium === stadium.id
        });
      }
    }

    console.log(groupMatches);

    this.setState({
      matches: {
        groupA: groupMatches[0],
        groupB: groupMatches[1],
        groupC: groupMatches[2],
        groupD: groupMatches[3],
        groupE: groupMatches[4],
        groupF: groupMatches[5],
        groupG: groupMatches[6],
        groupH: groupMatches[7],
      },
      stadiums,
      teams,
    })
  }

  render() {
    const {matches, stadiums, teams} = this.state;
    
    if (!matches.groupA) {
      return <div>Loading...</div>
    }

    const gamesArr = [];
    for (let match in matches) {
      gamesArr.push(matches[match])
    }
    
    const games = gamesArr.map( match => {
      return (
        <div className="group-container">
          <h1>{match.name}</h1>
          <Matches key={match.name} {...match} />
        </div>
      )
    })

    return (
      <div className="App">
        <div className="ui container group">
          {games}
        </div>
      </div>
    );
  }
}

export default App;
