import React from 'react'
import loading from './loading.gif'

const Loader = () => {
  return (
      <div className='container text-center my-3'>
        <img src={loading} alt='loading'></img>
      </div>
  )
}
export default Loader;