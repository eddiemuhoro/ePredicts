import React, { useState } from "react";
import "./Questionnaire.css";
//questions are imported from questions.js


const questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5",
  "Question 6",
  "Question 7",
  "Question 8",
  "Question 9",
  "Question 10",
  "Question 11",
  "Question 12",
  "Question 13",
  "Question 14",
  "Question 15",
  "Question 16",
  "Question 17",
  "Question 18",
  "Question 19",
  "Question 20"
];

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [filledBars, setFilledBars] = useState(0);
  

  const handleNextQuestion = () => {
     // Check if we're on the last question
    if (currentQuestion === questions.length - 1) return;
      // Increment the current question index
    setCurrentQuestion(currentQuestion + 1);
    // Check if we need to fill in another bar in the progress bar
    if ((currentQuestion + 1) % 4 === 0) {
      setFilledBars(filledBars + 1);
    }
  };
  
  const handlePreviousQuestion = () => {
    // Check if we're on the first question
    if (currentQuestion === 0) return;
    // Decrement the current question index
    setCurrentQuestion(currentQuestion - 1);
    // Check if we need to remove a bar from the progress bar
    if (currentQuestion % 4 === 0) {
      setFilledBars(filledBars - 1);
    }
  };
  

  const progressBar = [];
  for (let i = 0; i < 5; i++) {
    const barClass =
      i <= filledBars ? "progress-bar filled" : "progress-bar";
    progressBar.push(<div className={barClass} key={i} />);
  }

  return (
    <div className="App">
            <div className="progress-bar-container">{progressBar}</div>

      <div className="questionnaire-container">
        <div className="question-container">
          <h2>{questions[currentQuestion]}</h2>
        </div>
        <div style={{display:'flex',justifyContent:'space-between', width:'100%'}}>
        <button onClick={handlePreviousQuestion}>Previous</button>
        <button onClick={handleNextQuestion}>Next</button>
        </div>
      </div>
    </div>
  );
}
