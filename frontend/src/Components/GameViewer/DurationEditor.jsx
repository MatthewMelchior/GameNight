import React from 'react';
import arrow from '../../Assets/arrow256.png'
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'

const DurationEditor = ({ handleChangeDuration, duration }) => {

  const decrementDuration = () => {
    handleChangeDuration("decrement");
  }

  const incrementDuration = () => {
    handleChangeDuration("increment");
  }

  return (
    <div className="col-container">
      <span className="centered"> Question Duration </span>
      <div className="question-prop-container">
        <img src={arrow} className="upload-image duration-btn" alt="Decrease index" onClick={decrementDuration}></img>

        <div className="index-numbers"> {duration} </div>

        <img src={arrow} className="upload-image duration-btn mirror-img" alt="Increase index" onClick={incrementDuration}></img>
      </div>
    </div>
  );
};

export default DurationEditor;
