import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import './ProgressBar.scss';

export default function ProgressBar({
  totalTime,
  curTime,
  loadingTime,
  curTimeController,
  setIsRunning,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [progressRate, setProgressRate] = useState(0);
  const [loadingRate, setLoadingRate] = useState(0);
  const [hoverRate, setHoverRate] = useState(0);

  const bar = useRef();
  function calcCurRate(e) {
    const curX = e.clientX;
    const barInfo = bar.current.getBoundingClientRect();
    const parentWidth = barInfo.width;
    let curWidth = curX - barInfo.left;
    if (curWidth < 0) {
      curWidth = 0;
    }
    if (curWidth > parentWidth) {
      curWidth = parentWidth;
    }
    return curWidth / parentWidth;
  }

  function windowMouseMove(e) {
    const curRate = calcCurRate(e);
    curTimeController(Math.round(totalTime * curRate));
    setHoverRate(curRate);
  }

  function mouseHoverMove(e) {
    if (isClicked) {
      return;
    }
    const curRate = calcCurRate(e);
    setHoverRate(curRate);
  }
  useEffect(() => {
    setProgressRate(curTime / totalTime);
  }, [totalTime, curTime]);

  useEffect(() => {
    setLoadingRate(loadingTime / totalTime);
  }, [totalTime, loadingTime]);
  return (
    <div
      ref={bar}
      className="progress-bar"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseMove={(e) => mouseHoverMove(e)}
      onMouseDown={(e) => {
        let prevRunningState;
        setIsClicked(true);
        setIsRunning((prevState) => {
          prevRunningState = prevState;
          return false;
        });
        curTimeController(Math.round(totalTime * hoverRate));
        window.addEventListener(
          'mouseup',
          () => {
            setIsRunning(prevRunningState);
            window.removeEventListener('mousemove', windowMouseMove, false);
            setIsClicked(false);
          },
          { once: true },
        );
        window.addEventListener('mousemove', windowMouseMove, false);
      }}
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
      {(isHover || isClicked) && (
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
  curTimeController: PropTypes.func.isRequired,
  setIsRunning: PropTypes.func.isRequired,
};
