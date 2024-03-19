'use client';

import { useEffect, useState } from 'react';
import { formatTime } from '@/app/helpers/timeFormatter';
import { formatDate } from '../helpers/dateFormatter';

const Statusbar = () => {
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(formatTime(now));
      setCurrentDate(formatDate(now));
    }, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
    };
  }, []);

  return (
    <div className='text-lg'>
      <span>Hello user!</span>
      <div className='text-4xl font-bold'>{currentTime}</div>
      <div className='date'>{currentDate}</div>
    </div>
  );
};

export default Statusbar;
