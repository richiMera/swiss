import { useState, useEffect } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import { useMediaQuery } from '@react-hook/media-query'
// import drSvg from './assets/dr.svg';
// import coffeeSvg from './assets/coffee.svg';
// import uccelloSvg from './assets/uccello.svg';
// import nakedSvg from './assets/naked.svg';
// import midnightSvg from './assets/midnight.svg';
// import videodromeSvg from './assets/videodrome.svg';
// import febbreSvg from './assets/febbre.svg';
// import halloweenSvg from './assets/halloween.svg';
// import dollariSvg from './assets/dollari.svg';
// import goodbyeSvg from './assets/goodbye.svg';
// import cabinetSvg from './assets/cabinet.svg';
// import futureSvg from './assets/future.svg';
// import shiningSvg from './assets/shining.svg';
// import producersSvg from './assets/producers.svg';
import Card from "./components/Card";
import { Grid } from "@mui/material";
import Header from "./components/Header";
import FilterDrawer from "./components/FilterDrawer";
import Input from "./components/Input/index-new.jsx";
import FixedFilters from "./components/FixedFilters";
import Slider from '@mui/material/Slider';
import Lenis from 'lenis';
import data from './data/data.js'
import Detail from "./components/Detail/index.jsx";
import { motion } from "framer-motion"
import Lottie from 'lottie-react';
import animation from './loader.json'
import Info from "./components/Info/index.jsx";
import CardContainer from "./components/CardsContainer/index.jsx";





const App = () => {

  const lenis = new Lenis();
  const [scrollDirection, setScrollDirection] = useState('');



  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [cardItem, setCardItem] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [columnWidth, setColumnWidth] = useState(3);
  const [numberOfFilters, setNumberOfFilter] = useState(0);
  const [filteredData, setFilteredData] = useState([])
  const [font, setFont] = useState('')
  const [isHovered, setIsHovered] = useState('')
  const [index, setIndex] = useState(0)

  const [realData, setRealData] = useState([])
  const [animationComplete, setAnimationComplete] = useState(false);
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };





  useEffect(() => {

    setRealData(filteredData);

  }, [filteredData]);

  useEffect(() => {



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
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

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





  return (

    <>
      {!animationComplete && (
        <Lottie
          animationData={animation}
          rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          loop={false}
          autoplay
          id="loader"
          onComplete={handleAnimationComplete}
        />
      )}
      {animationComplete && (
        <div style={{
          backgroundColor: '#0D0D0D',

        }}>

          <Detail index={index} setIndex={setIndex} data={realData} setItem={setCardItem} isMobile={isMobile} item={cardItem} />
          {/* <Header isOpenInfo={isOpenInfo} scrollDirection={scrollDirection} isMobile={isMobile} openFilters={openFilters} setIsOpenInfo={setIsOpenInfo} /> */}
          {/* <Info isMobile={isMobile} isOpen={isOpenInfo} /> */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', textAlign: 'center' }}>
            <h1 style={{ color: '#ececec', fontSize: '160px', lineHeight: '75%', marginBottom: '62px' }}>Cinema <br />Typography</h1>
            <p style={{
              opacity: '0.64',
              lineHeight: '130%',
              color: '#ECECEC',
              width: '30%'
            }} className="p-regular">An independent archive to celebrate typography
              and its starring role in cinema opening titles.</p>
          </div>

          <FixedFilters isMobile={isMobile}>
            <Input scrollDirection={scrollDirection} numberOfFilters={numberOfFilters} isMobile={isMobile} type={'search'} setData={setRealData} data={data} style={{ width: isMobile ? '100%' : '100%' }} placeholder={isMobile ? 'Movies, font, director...' : 'Search for movies, font, director ...'} />

            <div style={{ width: isMobile ? numberOfFilters > 0 ? '35%' : '20%' : '', }}>
              <div style={{ width: isMobile ? 'fit-content' : '', backgroundColor: numberOfFilters > 0 ? '#E72A00' : '', border: numberOfFilters > 0 ? '1px solid #E72A00' : '', }} onClick={() => { setOpenFilters(true) }} className="input-box">
                <p>Filter {numberOfFilters > 0 && '(' + numberOfFilters + ')'} </p>
              </div>
            </div>

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
          <div style={{ padding: isMobile ? ' 32px 16px 16px 16px' : '0 16px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#404040' }} className="p-regular">Entries ({realData.length})</p>
            <Input isMobile={isMobile} type={'sort'} setData={setRealData} data={data} realData={realData} style={{ width: '320px' }} />

          </div>

          <CardContainer font={font} isHovered={isHovered}>
            <Grid style={{ height: realData.length === 0 ? '100px' : 'auto', paddingBottom: '100px' }} container >
              {realData?.map((card, index) => {
                return (
                  <Card setIndex={setIndex} setIsHovered={setIsHovered} setFont={setFont} index={index} setItem={setCardItem} isMobile={isMobile} width={isMobile ? 5 : columnWidth} key={index} item={card} />
                )
              })}
            </Grid>
          </CardContainer>


          <FilterDrawer numberOfFilters={numberOfFilters} setNumberOfFilter={setNumberOfFilter} isMobile={isMobile} data={data} setFilteredData={setFilteredData} setOpenFilters={setOpenFilters} open={openFilters} />





        </div>
      )}

    </>
  );
}


export default App
