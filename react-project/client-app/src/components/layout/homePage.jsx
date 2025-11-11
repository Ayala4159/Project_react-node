import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const panels = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ];

    const [hoverStates, setHoverStates] = useState([false, false, false, false]);
    const [contents, setContents] = useState(["", "", "", ""]);

    const buttonsData = [
        { top: '30%', left: '35%', id: '6878a867f649ab5932078846' },
        { top: '20%', left: '81%', id: '6878a769f649ab593207882e' },
        { top: '65%', left: '89%', id: '6878a82bf649ab5932078842' },
        { top: '70%', left: '10%', id: '6878a8fdf649ab593207884c' }
    ];

    const find = async (_id, index) => {
        if (!_id) return;
        try {
            const { data } = await axios.get(`http://localhost:1135/api/product/${_id}`);
            const newContents = [...contents];
            newContents[index] = (
                <Link to={`/${data._id}`} className='text-color nounderline no-underline hover:underline text-center'>
                    <h3>{data.name}</h3>
                    <p>{data.description}</p>
                    <h4>{data.price} ₪</h4>
                </Link>
            );
            setContents(newContents);
        } catch (err) {
            const newContents = [...contents];
            newContents[index] = 'אופס! תקלה בטעינת המוצר.';
            setContents(newContents);
        }
    };

    const handleEnterButton = (e, index) => {
        panels[index].current.show(e);
        find(buttonsData[index].id, index); // נשלוף רק כשמרחפים
    };

    const handleLeaveButton = (index) => {
        setTimeout(() => {
            if (!hoverStates[index]) {
                panels[index].current.hide();
            }
        }, 200);
    };

    const handleEnterPanel = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = true;
        setHoverStates(newHoverStates);
    };

    const handleLeavePanel = (index) => {
        const newHoverStates = [...hoverStates];
        newHoverStates[index] = false;
        setHoverStates(newHoverStates);
        panels[index].current.hide();
    };

    return (
        <div className='mt-7'>
            <style>{`
                .animated-overlay {
                    animation: fadeIn 0.3s ease-in-out forwards;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
            <div className='md:p-4 flex xl:flex-row flex-column' style={{ backgroundColor: "black" }}>
                <div className='relative' style={{ width: "800px" ,height:"450px"}}>
                    <Image src="http://localhost:1135/images/home/home1.webp" alt="Image" width="800px" />

                    {buttonsData.map((btn, index) => (
                        <div key={index}>
                            <Button
                                className='border-0 absolute'
                                icon='pi pi-spin pi-hourglass'
                                style={{ backgroundColor: 'rgba(1, 1, 1, 0.69)', top: btn.top, left: btn.left }}
                                onMouseEnter={(e) => handleEnterButton(e, index)}
                                onMouseLeave={() => handleLeaveButton(index)}
                                rounded
                            />
                            <OverlayPanel
                                ref={panels[index]}
                                className="animated-overlay border-round-3xl border-1 border-white"
                                style={{ direction: 'rtl', fontSize: '1rem', overflowWrap: 'break-word', backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
                                onMouseEnter={() => handleEnterPanel(index)}
                                onMouseLeave={() => handleLeavePanel(index)}
                            >
                                {contents[index]}
                            </OverlayPanel>
                        </div>
                    ))}
                </div>
                <div className='text-white p-4 line-height-4 relative'>
                    <h1>ברוכים הבאים לאיקאה ריהוט גן</h1>
                    <h3>המקום שבו עיצוב חכם, נוחות ואווירה נפגשים בגינה שלך.
                        מגוון רחב של פתרונות ישיבה, שולחנות, ספות, שמשיות, תאורה ואביזרי חוץ – הכל בעיצוב סקנדינבי מוקפד ובמחירים שכל אחד יכול להרשות לעצמו.
                        לא משנה אם יש לך גינה גדולה, מרפסת קטנה או רק פינה של שמש – כאן תמצאו בדיוק מה שמתאים לכם.
                    </h3>
                        <Button style={{backgroundColor:'white',color:'black',right:"25%",bottom:3}} 
                        className='fadeoutleft animation-duration-1000 animation-iteration-infinite absolute' 
                        label="עברו למוצרים על מנת להתחיל להנות" icon="pi pi-arrow-left"
                     />
                </div>
            </div>
            <div style={{backgroundColor:'lightblue', height:"15vh",width:"100vw"}}></div>
        </div>
    );
};

export default HomePage;
