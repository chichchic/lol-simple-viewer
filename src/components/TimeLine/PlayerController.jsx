import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import ProgressBar from './ProgressBar';
import ControllerButton from './ControllerButton';

function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}

export default function PlayerController({ totalTime, curTime, setCurTime }) {
  //NOTE: curTime 실험을 위해 curTime 으로 사용중
  const [controllerState, setControllerState] = useState(0);
  const [delay, setDelay] = useState(10);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      setCurTime((prevTime) => {
        let nextTime = prevTime + 1000;
        if (nextTime >= totalTime) {
          nextTime = totalTime;
          setDelay(null);
          setControllerState(2);
        }
        return nextTime;
      });
    },
    isRunning ? delay : null,
  );

  return (
    <div className="player-controller">
      <ProgressBar
        totalTime={totalTime}
        curTime={curTime}
        loadingTime={75}
        curTimeController={function curTimeController(time) {
          if (controllerState === 2) {
            setDelay(10);
            setControllerState(0);
          }
          setCurTime(time);
        }}
        setIsRunning={setIsRunning}
      />
      <ControllerButton
        controllerState={controllerState}
        onClickControllerButton={function onClickControllerButton() {
          setControllerState((oldVal) => {
            if (oldVal === 0) {
              setIsRunning(false);
              return 1;
            }
            if (oldVal === 2) {
              setCurTime(0);
            }
            setIsRunning(true);
            return 0;
          });
        }}
      />
    </div>
  );
}

PlayerController.propTypes = {
  totalTime: PropTypes.number.isRequired,
  curTime: PropTypes.number.isRequired,
  setCurTime: PropTypes.func.isRequired,
};
