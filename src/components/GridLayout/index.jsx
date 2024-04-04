
const GridLayout = ({ childrens, gridNumbers, customStyle, bottomGap, myRef }) => {




    return (
        <>

            <div ref={myRef} style={{ ...{ width: '100%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }, ...customStyle }}>
                {[...Array(gridNumbers)].map((_, index) => (
                    <div
                        key={index}
                        style={{
                            width: `calc(100% / ${childrens.find(item => item.columnNumber === index)?.columnWidth || gridNumbers} - 8px)`,
                            height: "auto",
                            color: 'black',
                            borderRight: '1px solid red',
                            borderLeft: '1px solid red',
                            position: 'relative',
                            zIndex: childrens.find(item => item.columnNumber === index)?.zIndex,
                            marginBottom: bottomGap ? bottomGap : ''
                            // transition: "height 0.5s",
                            // Posizionamento corretto dei div affiancati // Posizionamento corretto dei div affiancati
                        }}
                    >
                        {childrens.find(item => item.columnNumber === index)?.content}
                    </div>
                ))}
            </div >

        </>
    );
}


export default GridLayout
