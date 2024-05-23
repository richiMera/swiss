import { useState, useEffect } from "react";
// import ScrollSmoother from 'gsap/ScrollSmoother'
import './App.css';
import { useMediaQuery } from '@react-hook/media-query'
import heroImg from './assets/hero.svg'
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
import glare from './assets/glare.png'
import Reveal from "./components/Reveal/index.jsx";





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

  const [realData, setRealData] = useState(data)
  const [animationComplete, setAnimationComplete] = useState(false);
  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };


  const variantsContainer = {
    close: { opacity: 1 },
    open: {
      opacity: 1,
      transition: {
        type: 'tween',
        staggerChildren: 1
      }
    }
  };

  const variantsItem = {
    close: { opacity: 0, y: '40px' },
    open: { opacity: 1, y: '0', transition: { duration: 0.7 } }
  };


  useEffect(() => {

    setRealData(filteredData);

  }, [filteredData]);

  useEffect(() => {

    setRealData(data)

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


  console.log(realData);



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
      {(animationComplete && realData.length > 0) && (
        <div style={{
          backgroundColor: '#0D0D0D',

        }}>
          {/* <div className="moon-up"></div> */}
          <motion.img variants={{
            hidden: { opacity: 0, y: -32 },
            visible: { opacity: 1, y: 0 }
          }} initial={'hidden'} animate={'visible'} transition={{ duration: 1.5, ease: [0, 0, 0, 1], delay: 0.25 }} draggable={false} src={glare} style={{ width: '100%', position: 'absolute' }} />
          <Detail index={index} setIndex={setIndex} data={realData} setItem={setCardItem} isMobile={isMobile} item={cardItem} />
          <Header isOpenInfo={isOpenInfo} scrollDirection={scrollDirection} isMobile={isMobile} openFilters={openFilters} setIsOpenInfo={setIsOpenInfo} />
          <Info isMobile={isMobile} isOpen={isOpenInfo} />
          {/* <motion.div
            variants={variantsContainer} initial={'close'} animate={'open'} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: isMobile ? '40vh' : '60vh', textAlign: 'center' }}>

            <motion.img variants={variantsItem} draggable={false} style={{ padding: '0 24px 24px 24px', width: isMobile ? '100%' : '62vw', position: 'relative', zIndex: '20' }} src={heroImg} />
            <motion.p variants={variantsItem} style={{
              opacity: '0.64',
              lineHeight: '130%',
              color: '#ECECEC',
              width: isMobile ? '100%' : '100%',
              padding: isMobile ? '0 16px' : '0',
              fontSize: !isMobile ? '.88vw' : ''
            }} className="p-regular">An independent archive to celebrate typography  {!isMobile && <br />}
              and its starring role in cinema opening titles.</motion.p>

          </motion.div> */}

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: isMobile ? '40vh' : '60vh', textAlign: 'center' }}>
            <Reveal>
              <img draggable={false} style={{ padding: '0 24px 24px 24px', width: isMobile ? '100%' : '62vw', position: 'relative', zIndex: '20' }} src={heroImg} />
              <p style={{
                opacity: '0.64',
                lineHeight: '130%',
                color: '#ECECEC',
                width: isMobile ? '100%' : '100%',
                padding: isMobile ? '0 16px' : '0',
                fontSize: !isMobile ? '.88vw' : ''
              }} className="p-regular">An independent archive to celebrate typography  {!isMobile && <br />}
                and its starring role in cinema opening titles.</p>
            </Reveal>
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
          < motion.div variants={{
            hidden: { opacity: 0, y: 32 },
            visible: { opacity: 1, y: 0 }
          }} initial={'hidden'} animate={'visible'} transition={{ duration: 1.5, ease: [0, 0, 0, 1], delay: 0.25 }} style={{ padding: isMobile ? ' 32px 16px 16px 16px' : '0 16px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: '#bbbbbb' }} className="p-regular">Entries ({realData.length})</p>
            <Input isMobile={isMobile} type={'sort'} setData={setRealData} data={data} realData={realData} style={{ width: '320px' }} />

          </motion.div>

          <CardContainer font={font} isHovered={isHovered}>
            {/* <motion.div initial={{ opacity: '0', width: '0px' }} animate={"open"}
              variants={variantsBlur} className="moon"></motion.div> */}
            <Grid style={{ height: realData.length === 0 ? '100px' : 'auto', paddingBottom: '100px' }} container >
              {realData?.map((card, index) => {
                return (
                  <Card setIndex={setIndex} setIsHovered={setIsHovered} setFont={setFont} index={index} setItem={setCardItem} isMobile={isMobile} width={isMobile ? 5 : columnWidth} key={index} item={card} />
                )
              })}
            </Grid>
          </CardContainer>


          <FilterDrawer numberOfFilters={numberOfFilters} setNumberOfFilter={setNumberOfFilter} isMobile={isMobile} data={data} setFilteredData={setFilteredData} setOpenFilters={setOpenFilters} open={openFilters} />





        </div >
      )}

    </>
  );
}


export default App
