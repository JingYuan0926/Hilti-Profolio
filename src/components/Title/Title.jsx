import React from 'react'
import './Title.css'

const Title = ({heading,paragraph}) => {
  return (
    <div className='title'>
        <h2>{heading}</h2>
        <p>{paragraph}</p>
    
    </div>
  )
}

export default Title