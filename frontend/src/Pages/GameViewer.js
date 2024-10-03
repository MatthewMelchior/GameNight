import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import { getGameInfo } from '../Api/Game'
import { useParams } from 'react-router-dom';
import FileUpload from '../Components/FileUpload';
import GameTitle from '../Components/GameViewer/GameTitle'
import QuestionViewer from '../Components/GameViewer/QuestionViewer'
import QuestionSideBar from '../Components/GameViewer/QuestionSideBar'
import '../Styles/Grid.css'

function GameViewer() {

  const { gameId } = useParams();
  const [game, setGame] = useState();
  const [index, setIndex] = useState(0);

  //#region Game-Name-Handlers
  const handleTitleChange = (e) => {
    let newGameState = { ...game };
    newGameState.name = e.target.value
    setGame(newGameState);
  };
  //#endregion Game-Name-Handlers

  //#region Game-Duration
  //#endregion

  //#region Question-Handlers

  const handleQuestionNameChange = (e) => {
    let newGameState = { ...game };
    newGameState.questions[index].content = e.target.value;
    setGame(newGameState);
  }

  //#endregion

  //#region Answer-Handlers

  const handleChangeAnswerContent = (id, newContent) => {
    let newGameState = { ...game };
    newGameState.questions[index].answers = newGameState.questions[index].answers.map((x) => {
      if (x.id === id) {
        x.content = newContent;
        return x;
      } else {
        return x;
      }
    })
    setGame(newGameState);
  };

  const handleChangeAnswerCorrectness = (id, oldCorrectness) => {
    let newGameState = { ...game };
    newGameState.questions[index].answers = newGameState.questions[index].answers.map((x) => {
      if (x.id === id) {
        x.isCorrect = !oldCorrectness;
        return x;
      }
      else {
        return x;
      }
    })
    setGame(newGameState);
  };

  const handleAddAnswer = () => {
    let newGameState = { ...game };
    const newAnswer = {
      id: `New Answer ${newGameState.questions[index].answers.length + 1}`,
      content: `New Answer ${newGameState.questions[index].answers.length + 1}`,
      isCorrect: "false",
      questionId: game.questions[index].id,
    }
    newGameState.questions[index].answers = [...newGameState.questions[index].answers, newAnswer];
    setGame(newGameState);
  };

  // Handler to remove an answer by ID
  const handleRemoveAnswer = (id) => {
    let newGameState = { ...game };
    newGameState.questions[index].answers = newGameState.questions[index].answers.filter((x) => x.id !== id);
    setGame(newGameState);
  };

  //#endregion

  const handleIndexChange = (action) => {
    if (action === "increment") {
      if (index < game?.questions.length) setIndex(index + 1);
    }
    else if (action === "decrement") {
      if (index > 0) setIndex(index - 1);
    }
  }

  // Fetch user's game
  useEffect(() => {
    // Fetch user data based on the username
    getGameInfo(gameId).then((data) => {
      setGame(data.game);
    });
  }, []);

  return (
    <div>
      {JSON.stringify(game)}
      <Banner
        title="Trivia Night"
      />
      <Subbanner />
      <FileUpload />

      {game &&
        <div className="grid-container">
          <GameTitle
            game={game}
            handleTitleChange={handleTitleChange}
          />
          <QuestionViewer
            question={game?.questions[0]}
            handleQuestionNameChange={handleQuestionNameChange}
            handleAddAnswer={handleAddAnswer}
            handleRemoveAnswer={handleRemoveAnswer}
            handleChangeAnswerCorrectness={handleChangeAnswerCorrectness}
            handleChangeAnswerContent={handleChangeAnswerContent}
          />

          <QuestionSideBar
            game={game}
            index={index}
          />
        </div>
      }

    </div>
  )
}

export default GameViewer;
