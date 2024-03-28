
const GridOverlay = ({ show }) => {


    return (
        <>
            {show && <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '400' }}>
                <div style={{ padding: ' 0 24px', width: '100%', height: '100%', display: 'flex' }}>
                    {[...Array(12)].map((_, index) => (
                        <div
                            key={index}

                            style={{
                                width: '8.333333333333333%',
                                height: "100%",
                                color: 'black',
                                borderRight: '1px solid red',
                                borderLeft: index === 0 ? '1px solid red' : '',
                                zIndex: '200',


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
