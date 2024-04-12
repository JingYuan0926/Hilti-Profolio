import React from 'react'
import { Navbar,Searchbar,Jobs,Title } from '../components';



const Home = () => {
  return (
    <div className='App'>
      <Navbar />
      <Searchbar />
      <Jobs />
      <Title heading='Application Process Roadmap'
      paragraph='You will go through these steps'/>
    </div>
  )
}

export default Home




