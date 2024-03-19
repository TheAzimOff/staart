import Link from 'next/link';
import React from 'react';
import { FaHackerrank } from 'react-icons/fa';
import {
  LuFilm,
  LuHome,
  LuImage,
  LuNewspaper,
  LuSettings,
} from 'react-icons/lu';

const Sidebar = () => {
  return (
    <nav className='text-3xl h-screen fixed top-0 left-0 flex justify-between flex-col py-8 px-4'>
      <div className='home '>
        <Link href='/'>
          <LuHome />
        </Link>
      </div>
      <ul className='flex flex-col gap-12'>
        <li className='menuItem '>
          <Link href='/news'>
            <LuNewspaper />
          </Link>
        </li>
        <li className='menuItem'>
          <Link href='/hackerrank'>
            <FaHackerrank />
          </Link>
        </li>
        <li className='menuItem'>
          <Link href='/movies'>
            <LuFilm />
          </Link>
        </li>
        <li className='menuItem'>
          <Link href='/images'>
            <LuImage />
          </Link>
        </li>
      </ul>
      <div className='settings cursor-pointer'>
        <LuSettings />
      </div>
    </nav>
  );
};

export default Sidebar;
