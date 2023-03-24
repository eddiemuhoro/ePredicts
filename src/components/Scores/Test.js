import { useState } from "react";

function Test() {
    //an array of objects with the scores of each matchday. use 10 for testing
    const [score, setScore] = useState([
      {
        team1: {
          teamName: "Arsenal",
          teamScore: 1
        },
        team2: {
          teamName: "Chelsea",
          teamScore: 2
        }
      },
      {
        team1: {
          teamName: "Liverpool",
          teamScore: 3
        },
        team2: {
          teamName: "Manchester City",
          teamScore: 1
        }
      },
      {
        team1: {
          teamName: "Manchester United",
          teamScore: 2
        },
        team2: {
          teamName: "Tottenham",
          teamScore: 1
        }
      },
      {
        team1: {
          teamName: "Leicester",
          teamScore: 1
        },
        team2: {
          teamName: "West Ham",
          teamScore: 1
        }
      },
    ]
    )
  
    //an array of objects with the predictions of each matchday. use 10 for testing
    const [prediction, setPrediction] = useState([
      {
        team1: {
          teamName: "Arsenal",
          teamScore: 1
        },
        team2: {
          teamName: "Chelsea",
          teamScore: 2
        }
      },
      {
        team1: {
          teamName: "Liverpool",
          teamScore: 2
        },
        team2: {
          teamName: "Manchester City",
          teamScore: 1
        }
      },
      {
        team1: {
          teamName: "Leicester",
          teamScore: 1
        },
        team2: {
          teamName: "West Ham",
          teamScore: 2
        }
      },
      {
        team1: {
          teamName: "Manchester United",
          teamScore: 2
        },
        team2: {
          teamName: "Tottenham",
          teamScore: 2
        }
      },
     
      
    ]
    )
  
  
    //loop through the score array and compare the score with the prediction
  
    for (let i = 0; i < score.length; i++) {
      if (score[i].team1.teamScore === prediction[i].team1.teamScore && score[i].team2.teamScore === prediction[i].team2.teamScore) {
        console.log("You got it right!")
      } else {
        console.log("You got it wrong!")
      }
    }
  
    //function to calculate the points
    function calculatePoints() {
      let points = 0;
      for (let i = 0; i < score.length; i++) {
        if (score[i].team1.teamScore === prediction[i].team1.teamScore && score[i].team2.teamScore === prediction[i].team2.teamScore) {
          points += 3;
        } else if (score[i].team1.teamScore > score[i].team2.teamScore && prediction[i].team1.teamScore > prediction[i].team2.teamScore) {
          points += 1;
        } else if (score[i].team1.teamScore < score[i].team2.teamScore && prediction[i].team1.teamScore < prediction[i].team2.teamScore) {
          points += 1;
        } else if (score[i].team1.teamScore === score[i].team2.teamScore && prediction[i].team1.teamScore === prediction[i].team2.teamScore) {
          points += 1;
        }
      }
      return points;
    }
  
    
  
  
    return (
      <div>
        <h1>Matchday 1</h1>
       actual scores and predictions comparison
       {
        score.map((score, index) => (
          <div key={index}>
            <div>{score.team1.teamName} {score.team1.teamScore} - {score.team2.teamScore} {score.team2.teamName}</div>
            <div>{prediction[index].team1.teamName} {prediction[index].team1.teamScore} - {prediction[index].team2.teamScore} {prediction[index].team2.teamName}</div>
          </div>
        ))
  
       }
  
        <h1>Points: {calculatePoints()}</h1>
  
  
  
  
  
      </div>
    )
  }


    export default Test