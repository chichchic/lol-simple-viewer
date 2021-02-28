import React from 'react';

function playButton() {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function pauseButton() {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      height="24"
      viewBox="0 0 24 24"
      width="24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

function replayButton() {
  return (
    <svg
      xmlns="https://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="18px"
      height="18px"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
    </svg>
  );
}

export default function ControllerButton({
  controllerState,
  onClickControllerButton,
}) {
  return (
    <button onClick={() => onClickControllerButton()}>
      {controllerState === 0 && pauseButton()}
      {controllerState === 1 && playButton()}
      {controllerState === 2 && replayButton()}
    </button>
  );
}
