import { useRef, useState } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import { useMediaQuery } from '@react-hook/media-query'
import drSvg from './assets/dr.svg';
import coffeSvg from './assets/coffe.svg';
import uccelloSvg from './assets/uccello.svg';
import nakedSvg from './assets/naked.svg';
import midnightSvg from './assets/midnight.svg';
import videodromeSvg from './assets/videodrome.svg';
import febbreSvg from './assets/febbre.svg';
import halloweenSvg from './assets/halloween.svg';
import dollariSvg from './assets/dollari.svg';
import Card from "./components/Card";
import { Grid } from "@mui/material";
import Header from "./components/Header";




const App = () => {

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [moreInfo, setMoreInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [columnWidth, setColumnWidth] = useState(3);


  const data = [
    {
      img: drSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: coffeSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: uccelloSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: nakedSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: midnightSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: videodromeSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: febbreSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: halloweenSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: dollariSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
  ]





  return (
    <div style={{ backgroundColor: darkMode ? 'black' : '', minHeight: '100vh' }}>
      <div style={{ padding: '0 16px' }}>
        <Header setColumnWidth={setColumnWidth} darkMode={darkMode} onClickDarkMode={() => { setDarkMode(!darkMode) }} moreInfo={moreInfo} onClickMoreInfo={() => { setMoreInfo(!moreInfo) }} />
        <Grid container spacing={1}>
          {data.map((card, index) => {
            return (
              <Card width={columnWidth} darkMode={darkMode} moreInfo={moreInfo} key={index} item={card} />
            )
          })}
        </Grid>

      </div>
    </div>
  );
}


export default App
