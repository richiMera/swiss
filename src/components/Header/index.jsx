import gsap from "gsap";
import { useRef, useState } from "react";
import GridOverlay from "../GridOverlay";
import GridLayout from "../GridLayout";

const Header = ({ setAnimationStartPosition, titleRef, isMobile }) => {


    const gridBtnRef = useRef(null);
    const infoRef = useRef(null);
    const swissRef = useRef(null);
    const [showGrid, setShowGrid] = useState(false);

    const handleClick = () => {
        setAnimationStartPosition('right');
        const tl = gsap.timeline({
            onStart: () => {
                gsap.to(gridBtnRef.current, { color: "white" });
                gsap.to(titleRef.current, { marginTop: "200px" });
                gsap.to(infoRef.current, { display: "none" });
                gsap.to(swissRef.current, { display: "block" });
            },
        });

        tl.to(".box", {
            height: "100vh",
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",

        });



    };

    const handleRevertClick = () => {
        setAnimationStartPosition('left');

        const revertTl = gsap.timeline({
            onStart: () => {
                gsap.to(gridBtnRef.current, { color: "black" });
                gsap.to(titleRef.current, { marginTop: "0" });
                gsap.to(infoRef.current, { display: "block" });
                gsap.to(swissRef.current, { display: "none" });
            },
        });

        revertTl.to(".box", {
            height: "0%",
            duration: 0.5,
            stagger: 0.1,
            ease: "power4.out",
            // Partenza dell'animazione da sinistra durante l'animazione di revert
        });


    };

    const elements = [{
        columnNumber: 0,
        zIndex: 401,
        content: <p
            ref={swissRef}
            onClick={handleRevertClick}
            className="p-small bold"
            style={{
                color: 'white',
                cursor: "pointer",


            }}
        >
            swiss style
        </p>
    },

    {
        columnNumber: 10,
        zIndex: 401,
        content: <p
            ref={infoRef}
            onClick={handleClick}
            className="p-small bold"
            style={{
                cursor: "pointer",


            }}
        >
            info
        </p>
    },
    {
        columnNumber: 11,
        zIndex: 401,
        content: <p ref={gridBtnRef}
            onClick={() => { setShowGrid(!showGrid) }}
            className="p-small bold"
            style={{
                cursor: "pointer",


            }}
        >
            grid: {showGrid ? 'visible' : 'hidden'}
        </p>
    }]



    return (
        <>
            <GridLayout gridNumbers={12} childrens={elements} />
            <GridOverlay show={showGrid} />
        </>
    );
}


export default Header
