import { useRef, useState, useEffect } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import { useMediaQuery } from '@react-hook/media-query'
import drSvg from './assets/dr.svg';
import coffeeSvg from './assets/coffe.svg';
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
import Input from "./components/Input";
import FixedFilters from "./components/FixedFilters";
import Slider from '@mui/material/Slider';




const App = () => {

  const data = [
    {
      img: coffeeSvg,
      filter: 'invert(0%) sepia(12%) saturate(2060%) hue-rotate(329deg) brightness(82%) contrast(108%)',
      bgColor: '#FFFFFF',
      textColor: '#000000',
      typeface: 'Arial',
      fontStyle: 'Sans Serif',
      designer: 'Uncredited',
      film_director: 'Jim Jarmusch',
      year: '2003',
      genre: 'Drama',
      country: 'USA',
    },
    {
      img: videodromeSvg,
      filter: 'brightness(0) saturate(100%) invert(58%) sepia(30%) saturate(3688%) hue-rotate(341deg) brightness(98%) contrast(94%)',
      bgColor: '#020101',
      textColor: '#FFFFFF',
      typeface: 'ITC Souvenir',
      fontStyle: 'Serif',
      designer: 'Film Opticals',
      film_director: 'David Cronenberg',
      year: '1983',
      genre: 'Horror',
      country: 'Canada',
    },
    {
      img: nakedSvg,
      color: '#1A0406',
      bgColor: '#FFDC4A',
      textColor: '#000000',
      typeface: 'Futura',
      fontStyle: 'Sans Serif',
      designer: 'Randall Balsmeyer, Mimi Everett',
      film_director: 'David Cronenberg',
      year: '1991',
      genre: 'Horror',
      country: 'Canada',
    },
    {
      img: dollariSvg,
      color: '#F7C886',
      bgColor: '#BB1F01',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Iginio Lardani',
      film_director: 'Sergio Leone',
      year: '1964',
      genre: 'Western',
      country: 'Italy',
    },
    {
      img: nakedSvg,
      color: '#1A0406',
      bgColor: '#FFDC4A',
      textColor: '#000000',
      typeface: 'Futura',
      fontStyle: 'Sans Serif',
      designer: 'Randall Balsmeyer, Mimi Everett',
      film_director: 'David Cronenberg',
      year: '1991',
      genre: 'Horror',
      country: 'Canada',
    },
    {
      img: dollariSvg,
      color: '#F7C886',
      bgColor: '#BB1F01',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Iginio Lardani',
      film_director: 'Sergio Leone',
      year: '1964',
      genre: 'Western',
      country: 'Italy',
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
    <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh' }}>

      <Header isMobile={isMobile} setOpenFilters={setOpenFilters} setColumnWidth={setColumnWidth} darkMode={darkMode} onClickDarkMode={() => { setDarkMode(!darkMode) }} moreInfo={moreInfo} onClickMoreInfo={() => { setMoreInfo(!moreInfo) }} />
      <div style={{ padding: ' 0 16px 16px 16px' }}>
        <p style={{ color: '#272727' }} className="p-regular">Entries ({realData.length})</p>

      </div>
      <Grid container >
        {realData.map((card, index) => {
          return (
            <Card width={isMobile ? 5 : columnWidth} darkMode={darkMode} moreInfo={moreInfo} key={index} item={card} />
          )
        })}
      </Grid>
      <FilterDrawer isMobile={isMobile} data={data} setFilteredData={setFilteredData} setOpenFilters={setOpenFilters} open={openFilters} />
      <FixedFilters>
        <Input setData={setRealData} data={data} style={{ width: '313px' }} placeholder={'Search for movies, font, director ...'} />
        <div onClick={() => { setOpenFilters(true) }} className="input-box">
          Filter
        </div>

        {!isMobile &&
          <div className="input-box">
            <p style={{ marginRight: '16px' }} className='p-regular pointer'>Size:</p>
            <Slider
              style={{ width: '88px', padding: 0, color: '#ECECEC' }}
              aria-label="Size"
              defaultValue={3}
              // valueLabelDisplay="auto"
              shiftStep={5}
              step={1}
              marks
              size='small'
              min={1}
              max={5}
              onChange={(e) => { setColumnWidth(e.target.value) }}
            />
          </div>}

      </FixedFilters>


    </div>
  );
}


export default App
