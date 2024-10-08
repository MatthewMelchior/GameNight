import React from 'react';
import arrow from '../../Assets/arrow256.png'
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import { questionTypeMapper } from '../../utils/GameViewerUtils';

const QuestionTypeEditor = ({ handleChangeQuestionType, questionType }) => {

  const scrollLeft = () => {
    handleChangeQuestionType("left");
  }

  const scrollRight = () => {
    handleChangeQuestionType("right");
  }

  return (
    <div className="col-container">
      <span className="centered"> Question Type </span>
      <div className="question-prop-container">
        <img src={arrow} className="upload-image duration-btn" alt="Decrease index" onClick={scrollLeft}></img>

        <div className="index-numbers"> {questionTypeMapper(questionType)} </div>

        <img src={arrow} className="upload-image duration-btn mirror-img" alt="Increase index" onClick={scrollRight}></img>
      </div>
    </div>
  );
};

export default QuestionTypeEditor;
