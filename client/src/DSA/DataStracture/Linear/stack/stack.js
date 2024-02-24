import React from 'react'
import "./stack.scss"
import Operation from './operation'

function Stack() {
  return (
    <div className='main-stack'>
      <div className='title'></div>
      <div className='introduction'></div>   
      <div className='operation'></div>   
      <div className='implementation'></div>
      <div className='visualization'>
        <Operation/>
      </div>
      <div className='summery'></div>
    </div>
  )
}

export default Stack