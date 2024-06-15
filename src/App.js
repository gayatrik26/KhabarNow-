import React, { Component } from 'react'
import Navbar from './components/Navbar'
import NewSection from './components/NewSection'
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

export default class App extends Component {
  pagesize = 20;
  render() {
    return (
      <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/about" element = {<NewSection key="about" pagesize={this.pagesize} country ="in" category ='general' />} />
          <Route exact path="/" element = {<NewSection key="Navbarlogo" pagesize={this.pagesize} country ="in" category ='general' />} />
          <Route exact path="/general" element = {<NewSection key="general" pagesize={this.pagesize} country ="in" category ='general' />} />
          <Route exact path="/business" element = {<NewSection key="business" pagesize={this.pagesize} country ="in" category ='business' />} />
          <Route exact path="/sports" element = {<NewSection key="sports" pagesize={this.pagesize} country ="in" category ='sports' />} />
          <Route exact path="/health" element = {<NewSection key="health" pagesize={this.pagesize} country ="in" category ='health' />} />
          <Route exact path="/entertainment" element = {<NewSection key="entertainment" pagesize={this.pagesize} country ="in" category ='entertainment' />} />
        </Routes>
      </Router>
      </div>
    )
  }
}
// APIkey={"23b57123c1374fb5a5e08563dc342515"}

