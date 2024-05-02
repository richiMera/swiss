import { useState, useEffect } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import { useMediaQuery } from '@react-hook/media-query'
import drSvg from './assets/dr.svg';
import coffeeSvg from './assets/coffee.svg';
import uccelloSvg from './assets/uccello.svg';
import nakedSvg from './assets/naked.svg';
import midnightSvg from './assets/midnight.svg';
import videodromeSvg from './assets/videodrome.svg';
import febbreSvg from './assets/febbre.svg';
import halloweenSvg from './assets/halloween.svg';
import dollariSvg from './assets/dollari.svg';
import goodbyeSvg from './assets/goodbye.svg';
import Card from "./components/Card";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import FilterDrawer from "./components/FilterDrawer";
import Input from "./components/Input";
import FixedFilters from "./components/FixedFilters";
import Slider from '@mui/material/Slider';
import Lenis from 'lenis';





const App = () => {

  const lenis = new Lenis();
  const [scrollDirection, setScrollDirection] = useState('');


  const data = [
    {
      title: 'The Long Goodbye',
      img: goodbyeSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Blippo',
      fontStyle: 'Sans Serif',
      designer: 'Uncredited',
      film_director: 'Robert Altman',
      year: '1973',
      genre: 'Drama',
      country: 'USA',
    },
    {
      title: 'Coffee and Cigarettes',
      img: coffeeSvg,
      filter: 'brightness(0) saturate(100%) invert(0%) sepia(1%) saturate(7495%) hue-rotate(126deg) brightness(98%) contrast(102%)',
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
      title: 'Halloween',
      img: halloweenSvg,
      filter: 'brightness(0) saturate(100%) invert(80%) sepia(31%) saturate(6487%) hue-rotate(355deg) brightness(103%) contrast(103%)',
      bgColor: '#100200',
      textColor: '#FFFFFF',
      typeface: 'ITC Serif Gothic',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'John Carpenter',
      year: '1978',
      genre: 'Horror',
      country: 'USA',
    },
    {
      title: 'Videodrome',
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
      title: 'Naked Lunch',
      img: nakedSvg,
      filter: 'brightness(0) saturate(100%) invert(6%) sepia(71%) saturate(254%) hue-rotate(334deg) brightness(102%) contrast(104%)',
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
      title: 'Per un pugno di dollari',
      img: dollariSvg,
      filter: 'brightness(0) saturate(100%) invert(92%) sepia(87%) saturate(1119%) hue-rotate(303deg) brightness(110%) contrast(93%)',
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
      title: 'Midnight Cowboy',
      img: midnightSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Britannic Ultra',
      fontStyle: 'Sans Serif',
      designer: 'Uncredited',
      film_director: 'John Schlesinger',
      year: '1969',
      genre: 'Drama',
      country: 'USA',
    },
    {
      title: 'L’uccello dalle piume di cristallo',
      img: uccelloSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Helvetica Black extended with alternate R',
      fontStyle: 'Sans Serif',
      designer: 'Uncredited',
      film_director: 'Dario Argento',
      year: '1970',
      genre: 'Thriller',
      country: 'Italy',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },
    {
      title: 'Febbre da cavallo',
      img: febbreSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Estro (customized)',
      fontStyle: 'Serif',
      designer: 'Uncredited',
      film_director: 'Steno',
      year: '1976',
      genre: 'Comedy',
      country: 'Italy',
    },
    {
      title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
      img: drSvg,
      filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(328deg) brightness(104%) contrast(103%)',
      bgColor: '#000000',
      textColor: '#FFFFFF',
      typeface: 'Custom',
      fontStyle: 'Handwritten',
      designer: 'Pablo Ferro',
      film_director: 'Stanley Kubrick',
      year: '1976',
      genre: 'Comedy',
      country: 'UK',
    },

  ]
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [moreInfo, setMoreInfo] = useState(false);
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

  useEffect(() => {
    lenis.on('scroll', (e) => {
      // console.log(e);
      // setScrollDirection(e.direction)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Aggiungi questo per ottenere uno scroll fluido
    });
  }, []);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  console.log(scrollDirection);



  return (
    <div style={{
      backgroundColor: '#0D0D0D',
      // overflowY: 'scroll',/* Abilita lo scroll verticale */
      // scrollBehavior: 'smooth',
      // transition: ' scroll-behavior 7.5s ease',  /* Applica un'animazione di scorrimento */
    }}>

      <Header scrollDirection={scrollDirection} isMobile={isMobile} openFilters={openFilters} setColumnWidth={setColumnWidth} onClickDarkMode={() => { setDarkMode(!darkMode) }} moreInfo={moreInfo} onClickMoreInfo={() => { setMoreInfo(!moreInfo) }} />
      <div style={{ padding: ' 0 16px 16px 16px' }}>
        <p style={{ color: '#404040' }} className="p-regular">Entries ({realData.length})</p>

      </div>
      <Grid container >
        {realData?.map((card, index) => {
          return (
            <Card isMobile={isMobile} width={isMobile ? 5 : columnWidth} key={index} item={card} />
          )
        })}
      </Grid>
      <FilterDrawer isMobile={isMobile} data={data} setFilteredData={setFilteredData} setOpenFilters={setOpenFilters} open={openFilters} />
      <FixedFilters isMobile={isMobile}>
        <Input isMobile={isMobile} type={'search'} setData={setRealData} data={data} style={{ width: '313px' }} placeholder={'Search for movies, font, director ...'} />

        <div style={{ width: isMobile ? '100%' : '' }}>
          <div style={{ width: isMobile ? 'fit-content' : '' }} onClick={() => { setOpenFilters(true) }} className="input-box">
            Filter
          </div>
        </div>
        <Input isMobile={isMobile} type={'sort'} setData={setRealData} data={data} style={{ width: '320px' }} placeholder={'Search for movies, font, director ...'} />

        {!isMobile &&
          <div className="input-box">
            <p style={{ marginRight: '16px' }} className='p-regular pointer'>Size:</p>
            <Slider
              style={{ width: '88px', padding: 0, color: '#ECECEC' }}
              classes={{
                thumb: "thumb"
              }}
              aria-label="Size"
              defaultValue={3}
              // valueLabelDisplay="auto"

              step={1}

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
