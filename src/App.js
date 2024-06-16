import React, { useState } from 'react';
import Navbar from './components/Navbar';
import NewSection from './components/NewSection';
import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pagesize = 20;
  const apikey = process.env.REACT_APP_API_KEY;

  const[progress, setProgress] = useState(0);
  

  
  return (
      <div>
      <Router>
        <Navbar/>
        <LoadingBar color='#f11946' progress={progress} height={3}/>
        <Routes>
          <Route exact path="/about" element={<NewSection setProgress={setProgress} apikey={apikey} key="about" pagesize={pagesize} country="in" category='general' />} />
          <Route exact path="/" element = {<NewSection setProgress={setProgress} apikey={apikey} key="Navbarlogo" pagesize={pagesize} country ="in" category ='general' />} />
          <Route exact path="/business" element = {<NewSection setProgress={setProgress} apikey={apikey} key="business" pagesize={pagesize} country ="in" category ='business' />} />
          <Route exact path="/sports" element = {<NewSection setProgress={setProgress} apikey={apikey} key="sports" pagesize={pagesize} country ="in" category ='sports' />} />
          <Route exact path="/health" element = {<NewSection setProgress={setProgress} apikey={apikey} key="health" pagesize={pagesize} country ="in" category ='health' />} />
          <Route exact path="/entertainment" element = {<NewSection setProgress={setProgress} apikey={apikey} key="entertainment" pagesize={pagesize} country ="in" category ='entertainment' />} />
          <Route exact path="/science" element = {<NewSection setProgress={setProgress} apikey={apikey} key="science" pagesize={pagesize} country ="in" category ='science' />} />
          <Route exact path="/technology" element = {<NewSection setProgress={setProgress} apikey={apikey} key="technology" pagesize={pagesize} country ="in" category ='technology' />} />
        </Routes>
      </Router>
      </div>
  )
  
}

export default App;