import React, { Component } from 'react'
import Navbar from './components/Navbar'
import NewSection from './components/NewSection'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <NewSection pagesize={5}/>
      </div>
    )
  }
}
// APIkey={"23b57123c1374fb5a5e08563dc342515"}