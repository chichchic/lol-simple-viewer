import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'underscore';

import './ProgressBar.scss';

export default function ProgressBar({ totalTime, curTime, loadingTime }) {
  const [isHover, setIsHover] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [progressRate, setProgressRate] = useState(0);
  const [loadingRate, setLoadingRate] = useState(0);
  const [hoverRate, setHoverRate] = useState(0);

  function moveMouse(e) {
    const parentWidth = e.target.offsetWidth;
    const curWidth = e.clientX - e.target.getBoundingClientRect().left;
    const curRate = curWidth / parentWidth;
    setHoverRate(curRate);
    // if (isMouseDown) {
    //   setProgressRate(curRate);
    // }
  }

  useEffect(() => {
    setProgressRate(curTime / totalTime);
  }, [totalTime, curTime]);

  useEffect(() => {
    setLoadingRate(loadingTime / totalTime);
  }, [totalTime, loadingTime]);
  return (
    <div
      className="progress-bar"
      onMouseEnter={() => setIsHover(true)}
      onMouseMove={(e) => moveMouse(e)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => {
        setIsMouseDown(true);
        moveMouse(e);
      }}
      onMouseUp={(e) => setIsMouseDown(false)}
      style={{ height: isHover ? '12px' : '10px' }}
    >
      <div
        className="progress"
        style={{ transform: `scaleX(${progressRate})` }}
      ></div>
      {isHover && (
        <div
          className="hover"
          style={{ transform: `scaleX(${hoverRate})` }}
        ></div>
      )}
      <div
        className="loading"
        style={{ transform: `scaleX(${loadingRate})` }}
      ></div>
      {isHover && (
        <div
          className="indicator"
          style={{
            left: `${progressRate * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      )}
    </div>
  );
}

ProgressBar.propTypes = {
  totalTime: PropTypes.number.isRequired,
  curTime: PropTypes.number.isRequired,
  loadingTime: PropTypes.number.isRequired,
};
