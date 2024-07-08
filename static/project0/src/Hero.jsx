import React from 'react'
import logo from './assets/logo.png'
import logo1 from './assets/Infinity_logo.png'

const Hero = () => {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10  '>
        <img src={logo} alt='summarizer_Logo' className='w-32 object-contain'/>
        
      </nav>
      <h1 className='head_text'>
        Finder and manifestation of its Information using <br className='max-md:hidden'/>
        <span className='orange_gradient'>Deep learning</span>
      </h1>
      <h2 className='desc'>
        This helps to find what foliage it is and grasp information across the internet using summarization API. Which helps to know about foliage in a clear and concise way. 
      </h2>
    </header>
  )
}

export default Hero