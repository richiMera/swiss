
const GridLayout = ({ childrens, gridNumbers }) => {


    console.log(childrens);

    return (
        <>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                {[...Array(gridNumbers)].map((_, index) => (
                    <div
                        key={index}

                        style={{
                            width: `calc(100% / ${gridNumbers} - 8px)`,
                            height: "100%",
                            color: 'black',
                            borderRight: '1px solid red',
                            borderLeft: index === 0 ? '1px solid red' : '',
                            position: 'relative',
                            zIndex: childrens.find(item => item.columnNumber === index)?.zIndex



                            // transition: "height 0.5s",
                            // Posizionamento corretto dei div affiancati // Posizionamento corretto dei div affiancati
                        }}
                    >
                        {childrens.find(item => item.columnNumber === index)?.content}
                    </div>
                ))}
            </div>

        </>
    );
}


export default GridLayout
