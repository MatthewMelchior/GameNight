import React from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import DurationEditor from './DurationEditor.jsx';
import QuestionTypeEditor from './QuestionTypeEditor.jsx';

const QuestionSideBar = ({ game, index, handleSaveGame, handleAddQuestion, handleChangeDuration, handleChangeQuestionType }) => {

  return (
    <div className="question-sidebar">
      <div>
        <div className="submit-btn btn" onClick={handleAddQuestion}>Add Question</div>
        <DurationEditor
          handleChangeDuration={handleChangeDuration}
          duration={game.questions[index]?.duration}
        />
        <QuestionTypeEditor
          handleChangeQuestionType={handleChangeQuestionType}
          questionType={game.questions[index]?.questionType}
        />
        <div className="submit-btn btn" onClick={handleSaveGame}>Save Game</div>
        <div className="submit-btn btn" onClick={() => console.log("to do")}>Launch Game</div>
      </div>
    </div>
  );
};

export default QuestionSideBar;
