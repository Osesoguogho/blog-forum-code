import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className='flex flex-col min-h-screen justify-center items-center p-3 light text-black dark:text-black about-page font-bold'>
      <p className='text-2xl mb-6'> This is a Forum website where users can post, and read articles and also interact with other users. These posts are posted by users of this website.</p>

     <p className='text-lg mb-5'>View posts</p>
      <Link className='bg-yellow-500 px-9 rounded-lg' to="/"> Return to forum </Link>

    </div>
  )
}

export default About