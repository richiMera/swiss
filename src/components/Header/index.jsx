import gsap from "gsap";
import { useRef, useState } from "react";
import GridOverlay from "../GridOverlay";

const Header = ({ setAnimationStartPosition, titleRef }) => {


    const gridBtnRef = useRef(null);
    const [showGrid, setShowGrid] = useState(false);

    const handleClick = () => {
        setAnimationStartPosition('right');
        const tl = gsap.timeline({
            onStart: () => {
                gsap.to(gridBtnRef.current, { color: "white" });
                gsap.to(titleRef.current, { marginTop: "200px" });
            },
        });

        tl.to(".box", {
            height: "100vh",
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
            start: "right bottom",
        });



    };

    const handleRevertClick = () => {
        setAnimationStartPosition('left');

        const revertTl = gsap.timeline({
            onStart: () => {
                gsap.to(gridBtnRef.current, { color: "black" });
                gsap.to(titleRef.current, { marginTop: "0" });
            },
        });

        revertTl.to(".box", {
            height: "0%",
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
            start: "left bottom", // Partenza dell'animazione da sinistra durante l'animazione di revert
        });


    };





    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, width: ' 100%', zIndex: '200', display: 'flex', justifyContent: 'space-between', padding: '24px 58px 24px 24px', zIndex: '401' }}>

                <div>
                    <p
                        onClick={handleRevertClick}
                        className="p-small bold"
                        style={{
                            color: 'white',
                            cursor: "pointer"
                        }}
                    >
                        swiss style
                    </p>
                </div>
                <div style={{ display: 'flex', color: 'black' }}>
                    <p
                        onClick={handleClick}
                        className="p-small bold"
                        style={{
                            marginRight: '86px',
                            cursor: "pointer"
                        }}
                    >
                        info
                    </p>
                    <p ref={gridBtnRef}
                        onClick={() => { setShowGrid(!showGrid) }}
                        className="p-small bold"
                        style={{
                            cursor: "pointer",
                            position: 'relative',
                            paddingRight: '60px',

                        }}
                    >
                        grid: <span style={{ position: 'absolute', right: '16pxpx' }}>{showGrid ? 'visible' : 'hidden'}</span>
                    </p>
                </div>
            </div>


            <GridOverlay show={showGrid} />
        </>
    );
}


export default Header
