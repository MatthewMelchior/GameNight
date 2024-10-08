import React, { useState, useEffect } from 'react';
import '../../Styles/Grid.css'
import '../../Styles/GameViewer.css'
import arrow from '../../Assets/arrow256.png'

const NavigationButton = ({ game, index, handleIndexChange }) => {

  const [prevIndex, setPrevIndex] = useState(index); // Keep track of previous index for animation

  // Update the state to reflect the new index
  useEffect(() => {
    setPrevIndex(index);
  }, [index]);

  const incrementIndex = () => {
    handleIndexChange("increment");
  }

  const decrementIndex = () => {
    handleIndexChange("decrement");
  }

  const goToIndex = (newIndex) => {
    handleIndexChange(newIndex);
  };

  // Logic to calculate which indexes to show
  const getVisibleIndices = () => {
    const totalQuestions = game.questions.length;
    let indices = [];

    // Display up to 5 indices centered on the current index
    const start = Math.max(index - 2, 0);
    const end = Math.min(index + 2, totalQuestions - 1);

    for (let i = start; i <= end; i++) {
      indices.push(i);
    }

    if (indices.length === 2) {
      if (indices.indexOf(index) === 0) {
        //index is on left, insert on left
        indices.unshift(-1); // Add invisible index to the left
      }
      else {
        //index is on right, insert on right
        indices.push(-1); // Add invisible index to the right
      }
    } else if (indices.length === 3) {
      if (indices.indexOf(index) === 0) {
        //index is on left, insert on left
        indices.unshift(-1); // Add two invisible index to the left
        indices.unshift(-2);
      }
      else if (indices.indexOf(index) === 2) {
        //index is on right, insert on right
        indices.push(-1); // Add two invisible index to the right
        indices.push(-2);
      }
    } else if (indices.length === 4) {
      if (indices.indexOf(index) === 1) {
        //index is on left, insert on left
        indices.unshift(-1); // Add invisible index to the left
      }
      else if (indices.indexOf(index) === 2) {
        //index is on right, insert on right
        indices.push(-1); // Add invisible index to the right
      }
    }

    return indices;
  };

  return (
    <div className="nav-btn-container">
      <img src={arrow} className="upload-image index-btn" alt="Decrease index" onClick={decrementIndex}></img>

      {/* Display the indices */}
      <div className={`index-numbers ${index > prevIndex ? 'slide-left' : 'slide-right'}`}>
        {getVisibleIndices().map((idx) => (
          idx >= 0 ? (
            <span
              key={idx}
              className={`index-number ${idx === index ? 'current-index' : ''}`}
              onClick={() => goToIndex(idx)}
            >
              {idx + 1}
            </span>
          ) : (
            <span
              key={idx}
              className={`invisible-index  index-number ${idx === index ? 'current-index' : ''}`}
            >
              {idx + 1}
            </span>
          )
        ))}
      </div>


      <img src={arrow} className="upload-image index-btn mirror-img" alt="Increase index" onClick={incrementIndex}></img>
    </div>
  );
};

export default NavigationButton;
