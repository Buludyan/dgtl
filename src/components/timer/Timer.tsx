import { useState, useEffect, useCallback } from 'react';
import './Timer.scss';
import { getRemainingTimeUntilMsTimestamp } from './TimerUtils';


const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
}

type TimerProps = {
    countdownTimestampMs: number
}

export const Timer: React.FC<TimerProps> = ({ countdownTimestampMs }) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    const updateRemainingTime = useCallback(
        (countdown: number) => {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
        }, []
    )

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs, updateRemainingTime]);

    return (
        <div className="countdown-timer">
            <span className="two-numbers">{remainingTime.hours}</span>
            <span>:</span>
            <span className="two-numbers">{remainingTime.minutes}</span>
            <span>:</span>
            <span className="two-numbers">{remainingTime.seconds}</span>
        </div>
    );
}