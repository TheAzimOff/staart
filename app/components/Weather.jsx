'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import icon from '@/public/icons/01d.svg';
import { FiMapPin } from 'react-icons/fi';
import { IoChevronDownOutline } from 'react-icons/io5';

const Weather = () => {
  const cityRef = useRef();
  const [city, setCity] = useState('');

  const [isDisabled, setIsDisabled] = useState(true);

  // const handleFetch = () => {
  //   fetch("https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}")
  // };

  return (
    <div className='flex justify-center items-center'>
      <div className='weather-icon p-8'>
        <Image src={icon} alt='sunny' width={125} />
      </div>
      <div className=' details flex flex-col'>
        <div className='top flex justify-between items-center pb-4'>
          <input
            ref={cityRef}
            disabled={isDisabled}
            value={city}
            onChange={e => setCity(e.target.value)}
            className='city-name text-2xl uppercase font-semibold border rounded border-black disabled:border-none w-40'
          />
          <div
            onClick={() => setIsDisabled(false)}
            className='flex cursor-pointer '
          >
            <FiMapPin />
            <IoChevronDownOutline />
          </div>
        </div>
        <div className='temp'>
          <span className='relative text-5xl after:content-["°"] after:text-2xl after:absolute after:top-0 after:-right-1'>
            19
          </span>
          <span className='text-lg uppercase'>Rainy</span>
          <span className='pl-4'>19°/10°</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
