import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { InputMask } from 'primereact/inputmask';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useRef } from "react";
import { Toast } from 'primereact/toast';
import ikeaLogo from '../../../pics/Ikea_logo.png';
import rm from '../../../pics/backReg.webp'
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setlastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState()
    const [checkPassword, setCheckPassword] = useState("")
    const [checked, setChecked] = useState(false);

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState('center');



    const show = (position) => {
        setPosition(position);
        setVisible(true);
    };


    const createUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:1135/api/user/register", {
                firstName, lastName, email, phoneNumber: phone, password
            });
            console.log("נרשם בהצלחה:", response.data);
            show('center');
        }
        catch (err) {
            if (err.status === 409)
                show2("? חשבון עם דוא''ל זה כבר קיים אצלינו. תרצה להתחבר במקום")
            if (err.status === 400) {

            }
        }
    };


    const navigate = useNavigate()
    const footerContent = (
        <div>
            <Button label="מעבר להתחברות" icon="pi pi-sign-in" onClick={() => navigate('/login')} className="p-button-text" />
        </div>)

    const toast = useRef(null);

    const show2 = (error) => {
        toast.current.show({severity:'warn', summary: 'שגיאה', detail: error });
    };


    return (
        <div className="flex relative align-items-center justify-content-center bg-no-repeat bg-cover gap-0 h-screen"
            style={{
                backgroundImage: `url(${rm})`, animation: "fadeIn 1.5s ease-in-out",
            }}>
            <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }}
        .fade-in {
          animation: fadeIn 1s ease forwards;}`}</style>
            <form className="flex flex-column align-items-center justify-content-center mb-7 p-6 border-round-3xl my-5 md:static absolute md:top-0 md:border-round-left-3xl md:border-noround-right md:border-right-none"
                style={{ top: "27%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", height: "66.3vh" }}>
                <b><p style={{direction:"rtl"}}>מהפרופיל שלך תוכל למצוא את כל המידע הקשור לחשבון שלך.</p></b>
                <FloatLabel className="w-11" >
                    <InputText className="w-11" id="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <Tooltip target=".custom-target-icon"  />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס שם פרטי"></i>
                    <label htmlFor="FirstName">שם פרטי</label>
                </FloatLabel><br />

                <FloatLabel className="w-11" >
                    <InputText className="p-button-success w-11" id="LastName" value={lastName} onChange={(e) => setlastName(e.target.value)} required />
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס שם משפחה"></i>
                    <label htmlFor="LastName">שם משפחה</label>
                </FloatLabel><br />

                <FloatLabel className="w-11" >
                    <InputText className="p-button-success w-11" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס כתובת הדואר האלקטרוני שלך"></i>
                    <label itemType="Email" htmlFor="email">כתובת דוא"ל</label>
                </FloatLabel ><br />

                <FloatLabel className="w-11" >
                    <label htmlFor="Phone" className="block mb-2">מס' טלפון</label>
                    <Tooltip target=".custom-target-icon" />
                    <InputMask className="p-button-success w-11" id="Phone" value={phone} mask="(999) 999-9999" placeholder="(999) 999-9999" tooltip="הכנס את מספר הטלפון שלך (אופציונאלי)" onChange={(e) => setPhone(e.target.value)}></InputMask>
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס מספר טלפון"></i>
                </FloatLabel><br />

                <FloatLabel style={{ width: '300px' }}>
                        <Password inputStyle={{ width: '100%' }} value={password} onChange={(e) => setPassword(e.target.value)} toggleMask invalid={String(password).length < 4 && password} required id="password" />
                        <Tooltip target=".custom-target-icon" />
                        <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge" id="tooltip-password"
                            style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס סיסמא המכילה לפחות ארבעה תווים"></i>
                    <label htmlFor="password">סיסמא</label>
                </FloatLabel><br />

                <FloatLabel style={{ width: '300px' }}>
                    <Password inputStyle={{ width: '100%' }} value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} feedback={false} toggleMask invalid={password !== checkPassword && checkPassword} required id="password2" />
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge" id="tooltip-password2"
                        style={{ marginLeft: "5px" }} data-pr-tooltip="אמת את סיסמתך"></i>
                    <label htmlFor="password2">אימות סיסמא</label>
                </FloatLabel>

                <div className="flex align-items-center">
                    <label style={{ marginRight: "2vw", direction: "rtl" }} htmlFor="ingredient3" className="ml-2">ידוע לי כי המידע אודותיי ישמר במערכות החברה בכפוף למדיניות הפרטיות</label>
                    <Checkbox onChange={e => setChecked(e.checked)} checked={checked}></Checkbox>
                    {/* tooltip */}

                </div>

                <Button className="p-button-success w-9 mt-5 p-3 w-full"
                    style={{ backgroundColor: "var(--blue-700)" }}
                    icon="pi pi-user-plus" type="submit" label="צרו חשבון" 
                    disabled={!checked || password !== checkPassword ||!firstName ||!email ||!lastName}
                    onClick={createUser} />

            </form>

            <div className="border-round-right-3xl relative hidden md:block" style={{ height: "66.3vh", width: "19.5%" }}>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px white solid"
                        , top: 0, height: "2rem", width: "100%"
                    }}></div>
                <div className="absolute h-full border-round-right-3xl"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", borderLeft: "0px"
                        , right: -27, width: "2rem"
                    }}></div>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px white solid"
                        , bottom: 0, height: "2rem", width: "99.8%"
                    }}></div>
                <div className="text-white" style={{ position: "absolute", top: "40%", left: "20%" }}>
                    <h1>צרו חשבון איקאה</h1>
                    <span>כבר יש לכם חשבון?<Link to="/login">הכנסו כאן</Link></span>
                </div>
            </div>

            <div className="text-black text-center mt-7 border-round-3xl p-2 border-1 border-white border-solid md:hidden absolute w-9" style={{ top: "6%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <h1>צרו חשבון איקאה</h1>
                <span>כבר יש לכם חשבון?<Link to="/login">הכנסו כאן</Link></span>
            </div>

            <Dialog header={<img src={ikeaLogo} height="40" className="mr-2"></img>} visible={visible} position={position}
                footer={footerContent} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }} draggable={false} resizable={false}>
                <p className="m-0" style={{ direction: 'rtl' }}>
                    ההרשמה הושלמה בהצלחה. אנו מודים לך על הצטרפותך לאתר שלנו.<br />
                    חשבונך נוצר בהצלחה, ומעתה תוכל ליהנות מגישה מלאה לכל השירותים והכלים המוצעים למשתמשים רשומים.<br />
                    למידע נוסף על השימוש באתר ועל תנאי השירות, ניתן ליצור קשר עם שירות הלקוחות.<br />
                    תודה שבחרת להצטרף אלינו<br />
                    IKEA
                </p>

            </Dialog>
            <Toast className="text-right" ref={toast} />
        </div>
    )
}

export default Register

// https://primeflex.org/width