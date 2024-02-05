import React, { useEffect, useState } from 'react';

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Set up the timer only if timeRemaining is above 0.
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      // Cleanup function to clear the timer.
      return () => clearTimeout(timer);
    } else {
      // When timeRemaining hits 0, call onAnswered with false.
      onAnswered(false);
      // Reset timeRemaining for the next question.
      setTimeRemaining(10);
    }
  }, [timeRemaining, onAnswered]); // Depend on timeRemaining and onAnswered to re-run the effect.

  // Handler for when a user selects an answer.
  function handleAnswer(isCorrect) {
    // Clear the current timer and reset timeRemaining for the next question.
    setTimeRemaining(10);
    // Notify App component about the answer.
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
