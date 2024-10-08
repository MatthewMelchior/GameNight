import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import AnswerBox from './AnswerBox';


const QuestionViewer = ({ question, handleQuestionNameChange, handleAddAnswer, handleRemoveAnswer, handleChangeAnswerCorrectness, handleChangeAnswerContent, handleImageChange, image }) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleImageClick = () => {
    document.getElementById('fileInput').click(); // Trigger click on hidden file input
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    // Function to save the updated title to the backend
    setIsEditingTitle(false);
  }

  return (
    <div className="question-container">
      {question &&
        <div>
          {isEditingTitle ? (
            <div className="title-container">
              <input
                type="text"
                className="editable-title "
                value={question.content}
                onChange={e => handleQuestionNameChange(e)}
                onBlur={handleTitleSave} // Save on blur
                autoFocus
              />
            </div>
          ) : (
            <div className="title-container">
              <div className="editable-title" onClick={handleTitleEdit}>{question?.content}</div>
            </div>
          )}
          <div className="image-upload-container">
            <img
              src={image}
              alt="Click to upload"
              onClick={handleImageClick}
              className="upload-image"
            />
            <input
              type="file"
              id="fileInput"
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: 'none' }} // Hide the file input
            />
          </div>
          <AnswerBox
            answers={question.answers}
            handleRemoveAnswer={handleRemoveAnswer}
            handleChangeAnswerCorrectness={handleChangeAnswerCorrectness}
            handleChangeAnswerContent={handleChangeAnswerContent}
            handleAddAnswer={handleAddAnswer}
          />
        </div>
      }
    </div>
  );
};

export default QuestionViewer;
