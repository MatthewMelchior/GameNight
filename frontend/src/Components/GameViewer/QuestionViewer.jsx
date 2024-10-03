import React, { useState } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import placeholder from '../../Assets/imagePrompt256.png'
import AnswerBox from './AnswerBox';


const QuestionViewer = ({ question, handleQuestionNameChange, handleAddAnswer, handleRemoveAnswer, handleChangeAnswerCorrectness, handleChangeAnswerContent }) => {

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [image, setImage] = useState(placeholder);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Update the image to the uploaded file
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div className="question-container block">
      {question &&
        <div>
          {isEditingTitle ? (
            <div>
              <input
                type="text"
                className="editable-title"
                value={question.content}
                onChange={e => handleQuestionNameChange(e)}
                onBlur={handleTitleSave} // Save on blur
                autoFocus
              />
            </div>
          ) : (
            <div>
              <h1 className="editable-title" onClick={handleTitleEdit}>{question?.content}</h1>
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
            onAnswerClick={(() => (console.log("hi")))}
          />
          <button onClick={handleAddAnswer}>Add New Answer</button>
        </div>
      }
      <button onClick={() => console.log(question)}>debug log</button>
    </div>
  );
};

export default QuestionViewer;
