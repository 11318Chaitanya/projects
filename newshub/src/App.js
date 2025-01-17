import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import News from "./components/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () =>{
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY3;

  const [progress, setProgress] = useState(0);

  const changeProgress = (progress)=>{
    setProgress(progress);
  }

    return (
      <>
        <BrowserRouter>
        <Navbar />
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
          <Routes>
            <Route exact
              path="/"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />
                </>
              }
            />
            <Route exact
              path="/sports"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="sports"
                    pageSize={pageSize}
                    country="in"
                    category="sports"
                  />
                </>
              }
            />
            <Route exact
              path="/science"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="science"
                    pageSize={pageSize}
                    country="in"
                    category="science"
                  />
                </>
              }
            />
            <Route exact
              path="/entertainment"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="entertainment"
                    pageSize={pageSize}
                    country="in"
                    category="entertainment"
                  />
                </>
              }
            />
            <Route exact
              path="/business"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="business"
                    pageSize={pageSize}
                    country="in"
                    category="business"
                  />
                </>
              }
            />
            <Route exact
              path="/health"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="health"
                    pageSize={pageSize}
                    country="in"
                    category="health"
                  />
                </>
              }
            />
            <Route exact
              path="/technology"
              element={
                <>
                  <News changeProgress={changeProgress} apiKey={apiKey}
                    key="technology"
                    pageSize={pageSize}
                    country="in"
                    category="technology"
                  />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
}

export default App;