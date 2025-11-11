import { useState, useRef } from "react"
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { setRole } from "../../../redux/userSlice";
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { Toast } from 'primereact/toast';


import rm from '../../../pics/backLog.webp'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const msgs = useRef(null);
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("http://localhost:1135/api/user/login", { email, password });
            const token = data.accessToken
            const role = data.role
            dispatch(setRole(role));
            localStorage.setItem('token', token);
            console.log(role)
            navigate("/products")
            setEmail("")
            setPassword("")
        } catch (err) {
            if (err.response?.status === 401) {
                show('כתובת הדוא"ל או הסיסמה שהזנת שגוייה או שהחשבון אינו קיים ב-IKEA בישראל')
            } else {
                console.error(err);
            }
        }
    }

    const toast = useRef(null);

    const show = (error) => {
        toast.current.show({ severity: 'warn', summary: 'שגיאה', detail: error });
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
                style={{ top: "35%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", height: "40vh" }}>
                <b><p className="text-right">IKEAברוכים השבים ל־<br />.היכנסו כדי לראות את ההזמנות, המועדפים והרעיונות שלכם</p></b><br/>
                <FloatLabel>
                    <InputText id="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ "marginLeft": "5px" }} data-pr-tooltip="הכנס כתובת הדואר האלקטרוני שלך"></i>
                    <label itemType="Email" htmlFor="email">כתובת דוא"ל</label>
                </FloatLabel><br />
                <FloatLabel>
                    <Password value={password} onChange={(e) => setPassword(e.target.value)} feedback={false} toggleMask invalid={String(password).length < 4 && password} required />
                    <Tooltip target=".custom-target-icon" />
                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                        style={{ "marginLeft": "5px" }} data-pr-tooltip="הכנס את סיסמתך"></i>
                    <label htmlFor="password">סיסמא</label>
                </FloatLabel>
                <Button type="submit" label="כניסה" onClick={login} disabled={!email||!password} className="p-button-success w-9 mt-5 p-3 w-full"
                    style={{ backgroundColor: "var(--blue-700)" }} />
            </form>

            <div className="border-round-right-3xl relative hidden md:block" style={{ height: "40vh", width: "25%" }}>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderTop: "1px white solid"
                       , left:-0.4, top: 0, height: "2rem", width: "100%"
                    }}></div>
                <div className="absolute h-full border-round-right-3xl"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", border: "1px white solid", borderLeft: "0px"
                        , right: -27, width: "2rem"
                    }}></div>
                <div className="absolute"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px white solid"
                        , left:-0.4, bottom: 0, height: "2rem", width: "99.9%"
                    }}></div>
                <div className="text-white pl-5" style={{ position: "absolute", top: "35%", left: "5%" }}>
                    <h1>.הכנסו לחשבון איקאה שלכם</h1>
                    <span>עוד אין לכם חשבון?<Link to="/Register" style={{ color: "rgb(12, 150, 174)" }} >הרשמו כאן</Link></span>
                </div>
            </div>

            <div className="text-black text-center mt-7 border-round-3xl p-5 border-1 border-white border-solid md:hidden absolute w-6" style={{ top: "6%", backgroundColor: "rgba(255, 255, 255, 0.59)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                <h1>הכנסו לחשבון איקאה שלכם</h1>
                <span>עוד אין לכם חשבון?<Link to="/Register">הרשמו כאן</Link></span>
            </div>
            <Toast className="text-right" ref={toast} />
        </div>
    )
}
export default Login

// https://www.canva.com/templates/?query=login