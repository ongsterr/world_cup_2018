// What's the goal? What do we want to have on the screen?

import React, { Component } from 'react';
import './App.css';
import Group from './components/group/Group';
import Prediction from './components/prediction/Prediction';

class App extends Component {

  state = {
    groups: null,
    teams: null,
    stadiums: null,
    predictions: null,
    posted: false,
  }

  componentDidMount() {
    this.fetchGroupMatches()
      .catch(err => console.error(err))

    this.fetchPredictions()
      .then(data => {
        this.setState({
          predictions: data,
        })
      })
      .catch(err => console.error(err))
    
  }

  async fetchGroupMatches() {
    const url = 'https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json'
    const response = await fetch(url)
    const data = await response.json()

    const groupList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const teams = data.teams;
    const stadiums = data.stadiums;
    const groups = data.groups;
    for (let i = 0; i < groupList.length; i++) {
      const matches = data.groups[groupList[i]].matches;

      matches.forEach(match => {
        const homeTeam = match.home_team
        const awayTeam = match.away_team
        const matchStadium = match.stadium

        match.home_team = teams.find(team => homeTeam === team.id)
        match.away_team = teams.find(team => awayTeam === team.id)
        match.stadium = stadiums.find(stadium => matchStadium === stadium.id)
      })
    }

    const groupArr = [];
    for (let group in groups) {
      groupArr.push(groups[group]);
    }
    console.log(groupArr)
    this.setState({
      groups: groupArr,
      teams: teams,
      stadiums: stadiums
    })
  }

  fetchPredictions = async () => {
    const uri = 'http://localhost:5000';
    const url = uri + '/api/prediction';
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(url, options);
    const predictionData = await response.json();
    return predictionData;
  }
  
  render() {
    const {groups} = this.state
    
    if(!groups) {
      return <div className="App">Loading...</div>
    }
    
    const games = groups.map(group => {
      return <Group key={group.name} {...group} predictions={this.state.predictions} />
    })

    const futureGames = groups.map(group => {
      return <Prediction key={group.name} {...group} posted={this.state.posted} />
    })

    return (
      <div className="App">
        <h2>World Cup 2018</h2>
        <div className="page-container">
          <h3>Group Stage Matches</h3>
          <div className="groups">
            {games}
          </div>
          <div className="prediction">
            {futureGames}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
