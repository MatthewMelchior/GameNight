import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import placeholder from '../../Assets/image512.png'


const QuestionViewer = ({ questions }) => {

  const [question, setQuestion] = useState(questions ? questions[0] : null);

  return (
    <div className="question-container block">
      <div>
        <h2>{question?.questionText || 'Untitled Question'}</h2>
        <img src={question?.image ?? placeholder} alt="Question Image" />
        <div>
          answer box goes here
        </div>
      </div>
    </div>
  );
};

export default QuestionViewer;
