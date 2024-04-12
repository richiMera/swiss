import { useRef, useState, useEffect } from "react";
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
import FilterDrawer from "./components/FilterDrawer";




const App = () => {

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
      typeface: 'Unknown',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '1932',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: uccelloSvg,
      typeface: 'san serif',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '1956',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: nakedSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2023',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: midnightSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '1935',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: videodromeSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '1956',
      genre: 'Thriller',
      country: 'USA',
    },
    {
      img: febbreSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2019',
      genre: 'Fantasy',
      country: 'USA',
    },
    {
      img: halloweenSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2014',
      genre: 'Adventure',
      country: 'USA',
    },
    {
      img: dollariSvg,
      typeface: 'Custom',
      designer: 'Pablo Ferro',
      film_director: 'Jim Jarmusch',
      year: '2001',
      genre: 'Horror',
      country: 'USA',
    },
  ]

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [moreInfo, setMoreInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [columnWidth, setColumnWidth] = useState(3);

  const [filteredData, setFilteredData] = useState([])

  const [realData, setRealData] = useState([])



  useEffect(() => {

    if (filteredData.length === 0) {
      setRealData(data);
    } else {
      setRealData(filteredData);
    }

  }, [filteredData]);

  return (
    <div style={{ backgroundColor: darkMode ? 'black' : '', minHeight: 'calc(100vh + 24px)' }}>
      <div style={{ padding: '0 16px 48px 16px' }}>
        <Header isMobile={isMobile} setOpenFilters={setOpenFilters} setColumnWidth={setColumnWidth} darkMode={darkMode} onClickDarkMode={() => { setDarkMode(!darkMode) }} moreInfo={moreInfo} onClickMoreInfo={() => { setMoreInfo(!moreInfo) }} />
        <Grid style={{ paddingTop: '108px' }} container spacing={3}>
          {realData.map((card, index) => {
            return (
              <Card width={isMobile ? 5 : columnWidth} darkMode={darkMode} moreInfo={moreInfo} key={index} item={card} />
            )
          })}
        </Grid>
        <FilterDrawer isMobile={isMobile} data={data} setFilteredData={setFilteredData} darkMode={darkMode} setOpenFilters={setOpenFilters} open={openFilters} />

      </div>

    </div>
  );
}


export default App
