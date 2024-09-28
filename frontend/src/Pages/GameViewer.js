import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import { getUserGame } from '../Api/Game'
import { useParams } from 'react-router-dom';
import FileUpload from '../Components/FileUpload';
import GameTitle from '../Components/GameViewer/GameTitle'
import GameInfo from '../Components/GameViewer/GameInfo'
import QuestionViewer from '../Components/GameViewer/QuestionViewer'
import QuestionSideBar from '../Components/GameViewer/QuestionSideBar'
import '../Styles/Grid.css'

function GameViewer() {

  const [game, setGame] = useState();
  const { gameId } = useParams();
  const [gameTitle, setGameTitle] = useState(); // Editable game title
  const [questions, setQuestions] = useState(); // Game questions
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setGameTitle(e.target.value);
  };

  const handleTitleSave = () => {
    // Function to save the updated title to the backend
    setIsEditingTitle(false);
  };

  const handleAddQuestion = () => {
    // Function to add a new question
    const newQuestion = {
      id: Date.now(), // temporary id
      questionText: '',
      image: null,
      answers: [],
      duration: 30,
      questionType: 'multiple-choice',
    };
    setQuestions([...questions, newQuestion]);
  };

  // Fetch user's games if not provided (i.e., created game)
  useEffect(() => {
    // Fetch user data based on the username
    getUserGame(gameId).then((data) => {
      setGame(data.game);
      setGameTitle(data.game.name);
      setQuestions([])
    });
  }, []);

  return (
    <div>
      <Banner
        title="Trivia Night"
      />
      <Subbanner />
      <FileUpload />
      <div className="grid-container">
        <GameTitle
          isEditingTitle={isEditingTitle}
          gameTitle={gameTitle}
          handleTitleChange={handleTitleChange}
          handleTitleSave={handleTitleSave}
          handleTitleEdit={handleTitleEdit}
        />
        <GameInfo
          game={game}
        />
        <QuestionViewer
          questions={questions}
        />
        <QuestionSideBar
          game={game}
        />
      </div>
      <div>
        {/* Carousel of Questions */}
        <div className="carousel">
          <h3>Other Questions</h3>
          <div style={{ display: 'flex', overflowX: 'scroll' }}>
            {questions?.map((question, index) => (
              <div key={question.id} style={{ margin: '0 10px' }}>
                <p>{question.questionText || 'Untitled'}</p>
              </div>
            ))}
            <button onClick={handleAddQuestion}>Add Question</button>
          </div>
        </div>

        {/* Launch Game Button */}
        <button onClick={() => alert('Launch game functionality to be implemented!')}>
          Launch Game
        </button>
      </div>

    </div>
  )
}

export default GameViewer;
