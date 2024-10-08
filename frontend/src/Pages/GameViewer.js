import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getGameInfo, saveGame } from '../Api/Game'
import { uploadImageArray } from '../Api/Image'

import { questionTypes } from '../utils/GameViewerUtils'
import { useAuth } from '../utils/AuthContext';

import GameTitle from '../Components/GameViewer/GameTitle'
import QuestionViewer from '../Components/GameViewer/QuestionViewer'
import QuestionSideBar from '../Components/GameViewer/QuestionSideBar'
import Banner from '../Components/Banner'
import Subbanner from '../Components/Subbanner';
import NavigationButton from '../Components/GameViewer/NavigationButton';

import placeholder from '../Assets/imagePrompt256.png'

import '../Styles/GameViewer.css'
import '../Styles/Grid.css'

function GameViewer() {

  const { gameId } = useParams();
  const [game, setGame] = useState();
  const [index, setIndex] = useState(0);
  const [images, setImages] = useState(new Map());
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const dirtyForm = () => {
    if (!isDirty) {
      setIsDirty(true);
    }
  }

  //#region Game-Handlers
  const handleTitleChange = (e) => {
    let newGameState = { ...game };
    newGameState.name = e.target.value
    setGame(newGameState);
    dirtyForm();
  };
  //#endregion Game-Name-Handlers

  //#region Question-Handlers

  const getImage = () => {
    if (images.has(index) && images.get(index)) return URL.createObjectURL(images.get(index));
    if (game.questions && game.questions[index] && game.questions[index].image) return `http://localhost:5000/api/images/${game.questions[index].image}`; // TODO don't hardcode this
    else return placeholder;
  }

  const handleQuestionNameChange = (e) => {
    let newGameState = { ...game };
    newGameState.questions[index].content = e.target.value;
    setGame(newGameState);
    dirtyForm();
  }

  const handleImageChange = (e) => {

    const newImages = new Map(images)
    const file = e.target.files[0];
    // TODO: some additional validation logic here (i.e., correct type & size)
    newImages.set(index, file)
    setImages(newImages); // Update the image to the uploaded file
    // ALSO TODO: if this was the 10th image set, we are forced to autosave since we can only upload 10 images at a time. 
    dirtyForm();
  };

  const handleAddQuestion = () => {
    let newGameState = { ...game };
    const newQuestion = {
      id: `Question ${newGameState.questions.length + 1}`,
      content: `New Question ${newGameState.questions.length + 1}`,
      questionId: 1,
      duration: 60,
      gameId: game.id,
      image: null,
      answers: []
    }
    newGameState.questions = [...newGameState.questions, newQuestion];
    setGame(newGameState); // update state
    setIndex(newGameState.questions.length - 1) // and set index to new question
    dirtyForm();
  }

  const handleChangeDuration = (action) => {
    let newGameState = { ...game };

    if (action === "increment" && newGameState.questions[index].duration < 120) {
      newGameState.questions[index].duration += 15;
    }
    else if (action === "decrement" && newGameState.questions[index].duration > 15) {
      newGameState.questions[index].duration -= 15;
    }

    setGame(newGameState); // update state
    dirtyForm();
  }

  const handleChangeQuestionType = (action) => {
    let newGameState = { ...game };
    const length = questionTypes.length;
    let idx = game.questions[index]?.questionType - 1;

    if (action === "left") {
      idx = (idx - 1 + length) % length
    } else if (action === "right") {
      idx = (idx + 1) % length
    }

    newGameState.questions[index].questionType = idx + 1;

    setGame(newGameState);
    dirtyForm();
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
    dirtyForm();
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
    dirtyForm();
  };

  const handleAddAnswer = () => {
    let newGameState = { ...game };
    const newAnswer = {
      id: `New Answer ${newGameState.questions[index].answers?.length + 1}`,
      content: `New Answer ${newGameState.questions[index].answers?.length + 1}`,
      isCorrect: false,
      questionId: game.questions[index].id,
    }
    newGameState.questions[index].answers = [...newGameState.questions[index].answers, newAnswer];
    setGame(newGameState);
    dirtyForm();
  };

  // Handler to remove an answer by ID
  const handleRemoveAnswer = (id) => {
    let newGameState = { ...game };
    newGameState.questions[index].answers = newGameState.questions[index].answers.filter((x) => x.id !== id);
    setGame(newGameState);
    dirtyForm();
  };

  //#endregion

  //#region Meta-Handles

  const handleIndexChange = (action) => {
    if (action === "increment") {
      if (index < game?.questions.length - 1) setIndex(index + 1);
    }
    else if (action === "decrement") {
      if (index > 0) setIndex(index - 1);
    }
    else { // This is probably the number of an index
      setIndex(action);
    }
  }

  const handleSaveGame = () => {
    if (isDirty) {
      setIsLoading(true);
      uploadImageArray(images).then(async (res) => {

        let newGameState = { ...game };
        if (res && res.fileNames) {
          const fileNames = res.fileNames;
          const minLength = Math.min(fileNames?.length, images.size); // To avoid overflow if sizes differ
          let mapIterator = images.entries(); // Get an iterator for the Map

          for (let i = 0; i < minLength; i++) {
            const imageName = fileNames[i]; // Array element
            const [key, value] = mapIterator.next().value; // Map key-value pair
            newGameState.questions[index].image = imageName;
          }
        }

        await saveGame(newGameState);
        setImages(new Map()); // Clear map
        setIsDirty(false); // Clean the dirty flag
        setGame(newGameState); // and set new game state for client
      });
      setIsLoading(false);
    }
  }
  //#endregion

  // Fetch user's game
  useEffect(() => {
    // Fetch user data based on the username
    getGameInfo(gameId).then((data) => {
      setGame(data.game);
    });
  }, []);

  return (
    <div>
      <Subbanner
        isAuthenticated={isAuthenticated}
      />

      {game &&
        <div className="grid-container">
          <GameTitle
            game={game}
            handleTitleChange={handleTitleChange}
          />
          <QuestionViewer
            question={game?.questions[index]}
            handleQuestionNameChange={handleQuestionNameChange}
            handleAddAnswer={handleAddAnswer}
            handleRemoveAnswer={handleRemoveAnswer}
            handleChangeAnswerCorrectness={handleChangeAnswerCorrectness}
            handleChangeAnswerContent={handleChangeAnswerContent}
            handleImageChange={handleImageChange}
            image={getImage()}
          />

          <NavigationButton
            game={game}
            index={index}
            handleIndexChange={handleIndexChange}
          />

          <QuestionSideBar
            game={game}
            index={index}
            handleSaveGame={handleSaveGame}
            handleAddQuestion={handleAddQuestion}
            handleIndexChange={handleIndexChange}
            handleChangeDuration={handleChangeDuration}
            handleChangeQuestionType={handleChangeQuestionType}
          />
        </div>
      }

      <button onClick={() => (console.log(game))}> debug </button>
    </div>
  )
}

export default GameViewer;
