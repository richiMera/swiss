import { useRef, useState } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import Header from "./components/Header";
import { useMediaQuery } from '@react-hook/media-query'
import GridLayout from "./components/GridLayout";

const App = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [animationStartPosition, setAnimationStartPosition] = useState('right');
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

        <Header isMobile={isMobile} titleRef={titleRef} setAnimationStartPosition={setAnimationStartPosition} />
        <div style={{ width: ' 100%', height: '100%', backgroundColor: 'white', color: 'black', display: 'flex', alignItems: 'center' }}>
          <GridLayout gridNumbers={1} childrens={homeElements} />
        </div>

        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="box"
            style={{
              width: animationStartPosition === 'right' ? `${(index === 0 || index === 1 || index === 2) ? 16.6666666667 : 25}%` : `${index <= 1 ? 25 : 16.6666666667}%`,
              height: "0",
              color: 'white',
              backgroundColor: "black",
              position: "absolute",
              bottom: "0",
              // transition: "height 0.5s",
              [animationStartPosition]: animationStartPosition === 'right' ? `${(index < 3) ? (index * (16.6666666667)) : (50 + (index - 3) * 25)}%` : `${index < 3 ? index * 25 : 50 + (index - 2) * 16.6666666667}%`, // Posizionamento corretto dei div affiancati // Posizionamento corretto dei div affiancati
            }}
          >

          </div>
        ))}
      </div>
    </div>
  );
}


export default App
