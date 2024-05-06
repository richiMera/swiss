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
import Input from "./components/Input";
import FixedFilters from "./components/FixedFilters";
import Slider from '@mui/material/Slider';
import Lenis from 'lenis';
import data from './data/data.js'
import Detail from "./components/Detail/index.jsx";
import { motion } from "framer-motion"
import Lottie from 'lottie-react';
import animation from './loader.json'
import Info from "./components/Info/index.jsx";





const App = () => {

  const lenis = new Lenis();
  const [scrollDirection, setScrollDirection] = useState('');



  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [cardItem, setCardItem] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);
  const [columnWidth, setColumnWidth] = useState(3);

  const [filteredData, setFilteredData] = useState([])

  const [realData, setRealData] = useState([])
  const [animationComplete, setAnimationComplete] = useState(false);
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };


  const variantsCardsContainer = {
    open: {
      opacity: 1, y: '0', transition: {
        delay: 0.1,
        type: "tween",
        duration: 1,
        // type: "spring",
        // stiffness: 400,
        // damping: 40,
      }
    },

  }

  const variantsHeaderContainer = {
    open: {
      opacity: 1, y: '0', transition: {
        delay: 0.1,
        type: "tween",
        duration: 1,
        // type: "spring",
        // stiffness: 400,
        // damping: 40,
      }
    },

  }




  useEffect(() => {

    if (filteredData.length === 0) {
      setRealData(data);
    } else {
      setRealData(filteredData);
    }

  }, [filteredData]);

  useEffect(() => {

    lenis.on('scroll', (e) => {
      console.log(e);

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
        // Renderizza qualcosa dopo che l'animazione è completata
        <div style={{
          backgroundColor: '#0D0D0D',
          // overflowY: 'scroll',/* Abilita lo scroll verticale */
          // scrollBehavior: 'smooth',
          // transition: ' scroll-behavior 7.5s ease',  /* Applica un'animazione di scorrimento */
        }}>



          <Detail setItem={setCardItem} isMobile={isMobile} item={cardItem} />


          {/* <motion.div initial={{ opacity: '0', y: '-50px', zIndex: '900000', position: 'relative' }} animate={"open"}
            variants={variantsHeaderContainer}> */}
          <Header isOpenInfo={isOpenInfo} scrollDirection={scrollDirection} isMobile={isMobile} openFilters={openFilters} setIsOpenInfo={setIsOpenInfo} />
          {/* </motion.div> */}
          <Info isMobile={isMobile} isOpen={isOpenInfo} />



          <div style={{ padding: isMobile ? ' 56px 16px 16px 16px' : '160px 16px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#404040' }} className="p-regular">Entries ({realData.length})</p>
            <Input isMobile={isMobile} type={'sort'} setData={setRealData} data={data} style={{ width: '320px' }} />

          </div>
          <motion.div initial={{ opacity: '0', y: '100px' }}
            animate={"open"}
            variants={variantsCardsContainer}>
            <Grid container >
              {realData?.map((card, index) => {
                return (
                  <Card setItem={setCardItem} isMobile={isMobile} width={isMobile ? 5 : columnWidth} key={index} item={card} />
                )
              })}
            </Grid>
          </motion.div>

          <FilterDrawer isMobile={isMobile} data={data} setFilteredData={setFilteredData} setOpenFilters={setOpenFilters} open={openFilters} />
          <FixedFilters isMobile={isMobile}>
            <Input isMobile={isMobile} type={'search'} setData={setRealData} data={data} style={{ width: isMobile ? '270px' : '313px' }} placeholder={'Search for movies, font, director ...'} />

            <div style={{ width: isMobile ? '100%' : '' }}>
              <div style={{ width: isMobile ? 'fit-content' : '' }} onClick={() => { setOpenFilters(true) }} className="input-box">
                Filter
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


        </div>
      )}

    </>
  );
}


export default App
