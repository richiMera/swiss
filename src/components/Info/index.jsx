import { useRef } from "react";
import GridLayout from "../GridLayout";

const Info = ({ animationStartPosition, infoContainerRef }) => {


    const infoElements = [{
        columnNumber: 0,
        columnWidth: 12 / 3,
        zIndex: 401,
        content: <p


            className="p-regular "
            style={{
                color: 'white',
                cursor: "pointer",


            }}
        >
            project
        </p>
    },

    {
        columnNumber: 1,
        columnWidth: 12 / 8,
        zIndex: 403,
        content: <p
            className="title"
            style={{
                color: 'white',
                cursor: "pointer",


            }}
        >
            Lorem ipsum dolor sit amet consectetur. At ornare risus sit eu. Integer integer in cursus nibh accumsan condimentum. Vitae id amet tempus morbi lorem lorem sit et. Id eleifend aliquet justo dui in tempor et risus.
        </p>
    },
    {
        columnNumber: 2,
        columnWidth: 12,
        zIndex: 403,



    },
    {
        columnNumber: 3,
        columnWidth: 12 / 3,
        zIndex: 401,
        content: <div>
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                design
            </p>
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                web development
            </p>
        </div>
    },

    {
        columnNumber: 4,
        columnWidth: 12 / 8,
        zIndex: 403,
        content: <div>
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                andrea dominici
            </p>
            <p


                className="p-regular"
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                riccardo ferrari
            </p>
        </div>
    },
    {
        columnNumber: 5,
        columnWidth: 12,
        zIndex: 403,



    },
    {
        columnNumber: 6,
        columnWidth: 12 / 3,
        zIndex: 401,
        content:
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                contact
            </p>

    },

    {
        columnNumber: 7,
        columnWidth: 12 / 8,
        zIndex: 403,
        content:
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                hello@andradominici.com
            </p>

    },
    {
        columnNumber: 8,
        columnWidth: 12,
        zIndex: 403,



    },
    {
        columnNumber: 9,
        columnWidth: 12 / 3,
        zIndex: 401,
        content:
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                sources
            </p>

    },

    {
        columnNumber: 10,
        columnWidth: 12 / 8,
        zIndex: 403,
        content: <div>
            <p


                className="p-regular "
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                Grid systems in graphic design by Josef Müller-Brockmann
            </p>
            <p


                className="p-regular"
                style={{
                    color: 'white',
                    cursor: "pointer",


                }}
            >
                Grid systems in graphic design by Josef Müller-Brockmann
            </p>
        </div>
    },
    {
        columnNumber: 11,
        columnWidth: 12,
        zIndex: 403,



    },

    ]

    return (
        <>

            <div>
                <div style={{ display: 'none' }} ref={infoContainerRef}>
                    <GridLayout customStyle={{ width: '100%', position: 'absolute', top: '96px', left: 0, padding: '24px' }} bottomGap={'40px'} gridNumbers={infoElements.length} childrens={infoElements} />
                </div>
                {[...Array(5)].map((_, index) => (
                    <div
                        key={index}
                        className="box"
                        style={{
                            width: animationStartPosition === 'right' ? `${(index === 0 || index === 1 || index === 2) ? 16.6666666667 : 25}%` : `${index <= 1 ? 25 : 16.6666666667}%`,
                            height: "0",
                            color: 'white',
                            backgroundColor: "black",
                            position: "absolute",
                            bottom: "0",
                            transition: "height 0.2s",
                            [animationStartPosition]: animationStartPosition === 'right' ? `${(index < 3) ? (index * (16.6666666667)) : (50 + (index - 3) * 25)}%` : `${index < 3 ? index * 25 : 50 + (index - 2) * 16.6666666667}%`, // Posizionamento corretto dei div affiancati // Posizionamento corretto dei div affiancati
                        }}
                    >

                    </div>
                ))}
            </div>
        </>
    );
}


export default Info
