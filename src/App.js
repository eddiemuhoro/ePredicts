import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import Questionnaire from './components/questionnare/Qslides.js';
import Test from './components/Scores/Test';

// have an array of items in a single matchday using this api endpoint,    url: 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague',
//     params: {matchday: '30'}, How do I display each of the array items on web using reactjs
function App() {

  const [matchdays, setMatchdays] = useState([]);
  const [selectedMatchday, setSelectedMatchday] = useState(1);
  const [scores, setScores] = useState([]);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const [prediction, setPrediction] = useState([
    {
      team1: {
        teamName: "Crystal Palace",
        teamScore: 1
      },
      team2: {
        teamName: "Arsenal",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Fulham",
        teamScore: 2
      },
      team2: {
        teamName: "Liverpool",
        teamScore: 1
      }
    },
    {
      team1: {
        teamName: "Bournemouth",
        teamScore: 1
      },
      team2: {
        teamName: "Aston Villa",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Leeds",
        teamScore: 2
      },
      team2: {
        teamName: "Wolverhampton",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Newcastle",
        teamScore: 1
      },
      team2: {
        teamName: "Nottingham Forest",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Tottenham",
        teamScore: 2
      },
      team2: {
        teamName: "Southampton",
        teamScore: 1
      }
    },
    {
      team1: {
        teamName: "Everton",
        teamScore: 1
      },
      team2: {
        teamName: "Chelsea",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Manchester United",
        teamScore: 2
      },
      team2: {
        teamName: "Brighton",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "Leicester",
        teamScore: 1
      },
      team2: {
        teamName: "Brentford",
        teamScore: 2
      }
    },
    {
      team1: {
        teamName: "West Ham",
        teamScore: 2
      },
      team2: {
        teamName: "Manchester City",
        teamScore: 2
      }
    },
    
  ]
  )

  useEffect(() => {
    // Fetch list of matchdays
    const matchdays = [];
    for (let i = 1; i <= 38; i++) {
      matchdays.push(i);
    }
    setMatchdays(matchdays);

    // Fetch scores for initial matchday
  }, []);

  useEffect(() => {
    axios.get('https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague', {
      params: { matchday: selectedMatchday },
      headers: {
        'x-rapidapi-key': '08fb8027b9msh18e199bdf4a22edp1017ddjsn620175d1ed80',
        'x-rapidapi-host': 'heisenbug-premier-league-live-scores-v1.p.rapidapi.com'
      }
    })
      .then((response) => {
        setScores(response.data.matches);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedMatchday]);

  function handleMatchdayClick(matchday) {
    setSelectedMatchday(matchday);
  }

  console.log(selectedMatchday);


  const handlePrediction = (e, fixture) => {
    e.preventDefault();
    const homeTeamScore = e.target.homeTeamScore.value;
    const awayTeamScore = e.target.awayTeamScore.value;
    alert(`You predicted a ${homeTeamScore}-${awayTeamScore} result for ${fixture.homeTeam} vs ${fixture.awayTeam}`);
  }
  const handlePredictionSubmit = (event, fixture) => {
    event.preventDefault();
    axios.post('/predictions', {
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      homeTeamName: fixture.team1.teamName,
      awayTeamName: fixture.team2.teamName,
      time: fixture.when
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <div className="container">
      <h1 className="title">Premier League Scores</h1>
    <ul className="score-list">
      {scores.map((match, index) => (
        <>
        <li key={index} className="score-item">
          <div className="home-team">{match.team1.teamName}</div>
          <div className="score">{match.team1.teamScore}</div>
          <div className="score">{match.team2.teamScore}</div>
          <div className="away-team">{match.team2.teamName}</div>
        </li>
        <li>{prediction[index].team1.teamName} {prediction[index].team1.teamScore} - {prediction[index].team2.teamScore} {prediction[index].team2.teamName}</li>
        </>
      ))}
    </ul>
    <div className="matchday-buttons">
      {[...Array(38)].map((_, i) => (
        <button key={i} className={matchdays === i+1 ? 'active' : ''} value={i+1} onClick={()=>handleMatchdayClick(i+1)}>
          Matchday {i+1}
        </button>
      ))}
    </div>
    <ul className="score-list">
        {scores.map((fixture, index) => (
          <li key={index} className="score-item">
            {fixture.when}
            <form onSubmit={(e) => handlePredictionSubmit(e, fixture)}>
              <label>
                 {fixture.team1.teamName}:
                <input type="number" name="homeTeamScore"   value={homeTeam} onChange={(event) => setHomeTeam(event.target.value)}  />
              </label>
              <label>
              <input type="number" name="awayTeamScore"  value={awayTeam} onChange={(event) => setAwayTeam(event.target.value)} />
                 {fixture.team2.teamName}:
              </label>
              <button type="submit">Submit</button>
            </form>
          </li>
          
        ))}
      </ul>

      <Test />
    </div>
  );
}

export default App;



//{score.team1.teamName} {score.team1.teamScore} - {score.team2.teamScore} {score.team2.teamName}

// method: 'GET',
// url: 'https://heisenbug-premier-league-live-scores-v1.p.rapidapi.com/api/premierleague',
// params: { matchday: '22' },
// headers: {
//   'x-rapidapi-key': '08fb8027b9msh18e199bdf4a22edp1017ddjsn620175d1ed80',
//   'x-rapidapi-host': 'heisenbug-premier-league-live-scores-v1.p.rapidapi.com'
// }
// };