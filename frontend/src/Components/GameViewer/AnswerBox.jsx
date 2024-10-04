import React from 'react';
import AnswerItem from './AnswerItem';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const AnswerBox = ({ answers, handleRemoveAnswer, handleChangeAnswerCorrectness, handleChangeAnswerContent, handleAddAnswer }) => {

  return (
    <div className='answer-box'>
      {answers && answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          handleRemoveAnswer={handleRemoveAnswer}
          handleChangeAnswerCorrectness={handleChangeAnswerCorrectness}
          handleChangeAnswerContent={handleChangeAnswerContent}
        />
      ))}
      <div className="answer-item btn" onClick={handleAddAnswer}>Add New Answer</div>
    </div>
  );
};

export default AnswerBox;
