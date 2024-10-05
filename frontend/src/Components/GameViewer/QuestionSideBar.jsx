import React from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import NavigationButton from './NavigationButton.jsx';

const QuestionSideBar = ({ game, index, handleSaveGame, handleAddQuestion, handleIndexChange }) => {

  return (
    <div className="question-sidebar block">
      <div>
        <div className="submit-btn btn" onClick={() => console.log("to do")}>Launch Game</div>
        <div className="submit-btn btn" onClick={handleSaveGame}>Save Game</div>
        <div className="submit-btn btn" onClick={handleAddQuestion}>Add Question</div>

        <NavigationButton
          game={game}
          index={index}
          handleIndexChange={handleIndexChange}
        />
      </div>
    </div>
  );
};

export default QuestionSideBar;
