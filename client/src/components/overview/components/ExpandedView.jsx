/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import {
  IoIosArrowBack, IoIosArrowForward,
} from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import ImageMagnifier from './Zoom.jsx';
import {
  ExpandedViewModalContent,
  CloseModalButton,
} from '../../../lib/styledComponents';

const ExpandedView = ({
  setDisplay,
  gallery,
  expandedMain,
  setExpandedMain,
  currentExpandedIndex,
  setCurrentExpandedIndex,
}) => {
  let newIndex = 0;

  const renderExpandedMain = () => {
    return (
      <div id="expanded-img-container">
        <ImageMagnifier id="expanded-main-img" src={`${expandedMain}`} alt="expanded image" />
      </div>
    );
  };

  const handleClick = (event) => {
    const index = event.target.getAttribute('name');
    setExpandedMain(gallery[Number(index)]);
    setCurrentExpandedIndex(Number(index));
  };

  const handleLeftClick = (event) => {
    newIndex = currentExpandedIndex === 0 ? gallery.length - 1 : currentExpandedIndex - 1;
    setExpandedMain(gallery[newIndex]);
    setCurrentExpandedIndex(newIndex);
  };

  const handleRightClick = (event) => {
    newIndex = currentExpandedIndex === gallery.length - 1 ? 0 : currentExpandedIndex + 1;
    setExpandedMain(gallery[newIndex]);
    setCurrentExpandedIndex(newIndex);
  };

  const renderDots = () => {
    return (
      <div id="dot-render">
        {gallery.map((image, index) => {
          if (index === currentExpandedIndex) {
            return (
              <div id="filled-dot" name={index} onClick={(event) => { handleClick(event); }} style={{ fontSize: '2.5em' }} key={Math.random(index * 54) * 10}>
                ●
              </div>
            );
          }
          return (
            <div id="empty-dot" name={index} onClick={(event) => { handleClick(event); }} style={{ fontSize: '2.5em' }} key={Math.random(index * 54) * 10}>
              ○
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <ExpandedViewModalContent>
      <CloseModalButton className="close-btn" onClick={() => setDisplay(false)}>
        <IoCloseOutline />
      </CloseModalButton>
      <div id="expanded-arrows-container">
        <IoIosArrowBack onClick={(event) => { handleLeftClick(event); }} style={{ color: 'white', fontSize: '2.5em' }} />
        {expandedMain?.length > 0 ? renderExpandedMain() : null}
        {renderDots()}
        <IoIosArrowForward onClick={(event) => { handleRightClick(event); }} style={{ color: 'white', fontSize: '2.5em' }} />
      </div>
    </ExpandedViewModalContent>
  );
};

export default ExpandedView;