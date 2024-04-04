
const GridOverlay = ({ show }) => {


    return (
        <>
            {show && <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '400' }}>
                <div style={{ padding: ' 0 24px', width: '100%', height: '100%', display: 'flex', justifyContent: 'space-around' }}>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}

                            style={{
                                width: 'calc(8.333333333333333% - 8px)',
                                height: "100%",
                                color: 'black',
                                borderRight: '1px solid red',
                                borderLeft: '1px solid red',
                                // marginRight: index !== 11 ? '8px' : '0',


                                // transition: "height 0.5s",
                                // Posizionamento corretto dei div affiancati // Posizionamento corretto dei div affiancati
                            }}
                        >

                        </div>
                    ))}
                </div>
            </div>}
        </>
    );
}


export default GridOverlay
