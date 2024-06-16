import React, { Component } from 'react'
import loading from './loading.gif'

export default class Loader extends Component {
  render() {
    return (
      <div className='container text-center my-3'>
        <img src={loading} alt='loading'></img>
      </div>
    )
  }
}
