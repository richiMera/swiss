import { useRef, useState } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import Header from "./components/Header";
import { useMediaQuery } from '@react-hook/media-query'
import GridLayout from "./components/GridLayout";


const App = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');

  const titleRef = useRef();


  const homeElements = [{
    columnNumber: 0,
    content: <h1 ref={titleRef} className="title bold">swiss style</h1>
  },]



  return (
    <div>
      <div
        className="container"
        style={{
          height: "100vh",
          backgroundColor: "white",
          position: "relative",
          overflow: "hidden",
          padding: '24px'

        }}
      >

        <Header isMobile={isMobile} titleRef={titleRef} />
        <div style={{ width: ' 100%', height: '100%', backgroundColor: 'white', color: 'black', display: 'flex', alignItems: 'center' }}>
          <GridLayout gridNumbers={1} childrens={homeElements} />
        </div>


      </div>
    </div>
  );
}


export default App
