import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
}

const Timer = ({ timeLeft, totalTime }: TimerProps) => {
  const percentage = (timeLeft / totalTime) * 100;
  
  return (
    <div className="w-16 h-16">
      <CircularProgressbar
        value={percentage}
        text={`${timeLeft}`}
        styles={buildStyles({
          textSize: '2rem',
          pathColor: percentage > 20 ? '#4F46E5' : '#EF4444',
          textColor: percentage > 20 ? '#4F46E5' : '#EF4444',
          trailColor: '#E5E7EB',
        })}
      />
    </div>
  );
};

export default Timer;