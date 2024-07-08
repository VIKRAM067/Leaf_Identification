import React from 'react'
import './App.css'
import Hero from './Hero'
import Demo from './Demo'

const App = () => {
  return (
      <main>
        <div className='main'>
          <div className='gradient'/>
        </div>
        
        <div className='app'>
         <Hero />
         <Demo/>
        </div>
      </main>
  )
}

export default App

