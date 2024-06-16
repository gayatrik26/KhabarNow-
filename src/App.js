import React, { Component } from 'react';
import Navbar from './components/Navbar';
import NewSection from './components/NewSection';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pagesize = 20;

  state = {
    progress : 0
  }

  setProgress = (progress) => {
    this.setState({progress:progress});
  }

  render() {
    return (
      <div>
      <Router>
        <Navbar/>
        <LoadingBar color='#f11946' progress={this.state.progress} height={3}/>
        <Routes>
          <Route exact path="/about" element = {<NewSection setProgress={this.setProgress} key="about" pagesize={this.pagesize} country ="in" category ='general' />} />
          <Route exact path="/" element = {<NewSection setProgress={this.setProgress} key="Navbarlogo" pagesize={this.pagesize} country ="in" category ='general' />} />
          <Route exact path="/business" element = {<NewSection setProgress={this.setProgress} key="business" pagesize={this.pagesize} country ="in" category ='business' />} />
          <Route exact path="/sports" element = {<NewSection setProgress={this.setProgress} key="sports" pagesize={this.pagesize} country ="in" category ='sports' />} />
          <Route exact path="/health" element = {<NewSection setProgress={this.setProgress} key="health" pagesize={this.pagesize} country ="in" category ='health' />} />
          <Route exact path="/entertainment" element = {<NewSection setProgress={this.setProgress} key="entertainment" pagesize={this.pagesize} country ="in" category ='entertainment' />} />
          <Route exact path="/science" element = {<NewSection setProgress={this.setProgress} key="science" pagesize={this.pagesize} country ="in" category ='science' />} />
          <Route exact path="/technology" element = {<NewSection setProgress={this.setProgress} key="technology" pagesize={this.pagesize} country ="in" category ='technology' />} />
        </Routes>
      </Router>
      </div>
    )
  }
}
// APIkey={"23b57123c1374fb5a5e08563dc342515"}

