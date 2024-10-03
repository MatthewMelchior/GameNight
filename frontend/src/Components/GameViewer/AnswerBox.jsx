import React, { useState } from 'react';
import AnswerItem from './AnswerItem';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const AnswerBox = ({ answers, handleRemoveAnswer, handleChangeAnswerCorrectness, handleChangeAnswerContent }) => {

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
    </div>
  );
};

export default AnswerBox;
