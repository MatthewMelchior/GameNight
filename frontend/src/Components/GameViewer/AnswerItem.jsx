import React, { useState } from 'react';
import checkmarkIcon from '../../Assets/checked32.png'
import xIcon from '../../Assets/cancel32.png'
import deleteIcon from '../../Assets/delete32.png'
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const AnswerItem = ({ answer, handleRemoveAnswer, handleChangeAnswerCorrectness, handleChangeAnswerContent }) => {
  return (
    <div className='answer-item'>
      {answer &&
        <div className="">
          <img
            className='icon'
            src={answer.isCorrect ? checkmarkIcon : xIcon}
            alt={answer.isCorrect ? "Correct" : "Incorrect"}
            onClick={() => handleChangeAnswerCorrectness(answer.id, answer.isCorrect)} // Toggle correct/incorrect status
          />
          <input
            className='input'
            type="text"
            value={answer.content}
            onChange={(e) => handleChangeAnswerContent(answer.id, e.target.value)}
          />
          <img
            className='delete-icon'
            src={deleteIcon}
            alt="Delete"
            onClick={() => handleRemoveAnswer(answer.id)} // Handle delete action
          />
        </div>
      }
    </div>
  );
};

export default AnswerItem;
