import { FC, useState, useEffect, useCallback } from 'react';

import { getRemainingTimeUntilMsTimestamp } from '../../utils/TimerUtils';

import './Timer.scss';

const defaultRemainingTime = {
  seconds: '00',
  minutes: '00',
  hours: '00',
};

export const Timer: FC = () => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  const updateRemainingTime = useCallback(() => {
    setRemainingTime(getRemainingTimeUntilMsTimestamp());
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime();
    }, 1000);
    return () => clearInterval(intervalId);
  }, [updateRemainingTime]);

  return (
    <div className="countdown-timer">
      <span className="two-numbers">{remainingTime.hours}</span>
      <span>:</span>
      <span className="two-numbers">{remainingTime.minutes}</span>
      <span>:</span>
      <span className="two-numbers">{remainingTime.seconds}</span>
    </div>
  );
};
