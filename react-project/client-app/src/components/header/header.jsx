import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import ikeaLogo from '../../pics/Ikea_logo.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { InputIcon } from "primereact/inputicon";
import { IconField } from "primereact/iconfield";
import { FloatLabel } from 'primereact/floatlabel';
import { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

const Header = (props) => {

    const op = useRef(null);
    const desktopOp = useRef(null);

    const token = localStorage.getItem("token")
    const { firstName, lastName } = token != null ? JSON.parse(atob(token.split('.')[1])) : "";
    const navigate = useNavigate()

    const getInitials = (first, last) => {
        return `${first.charAt(0)}${last.charAt(0)}`;
    };

    const itemRenderer = (item, options) => (
        <a className="flex align-items-center px-3 py-2 h-3rem cursor-pointer" onClick={options.onClick}>
            {item.badge && <Badge value={item.badge} size="large" severity="info" />}
            {item.icon && <span className={`${item.icon} text-primary`} />}
            <span className={`mx-2 ${item.items && 'font-semibold'}`}>{item.label}</span>
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const items = token === null ? [{
        label: 'הי! התחברו או הרשמו',
        icon: 'pi pi-user',
        template: itemRenderer,
        expanded: false,
        items: [
            {
                label: 'כניסה',
                icon: 'pi pi-sign-in',
                template: itemRenderer,
                command: () => {
                    navigate("/login")
                    if (desktopOp.current) desktopOp.current.hide()
                    if (op.current) op.current.hide()
                }
            },
            {
                label: 'הרשמה',
                icon: 'pi pi-user-plus',
                template: itemRenderer,
                command: () => {
                    navigate("/Register")
                    if (desktopOp.current) desktopOp.current.hide()
                    if (op.current) op.current.hide()
                }
            }
        ]
    }] : [{
        label: `הי ${firstName}!`,
        badge: `${firstName.charAt(0)}${lastName.charAt(0)}`,
        template: itemRenderer,
        expanded: false,
        items: [
            {
                label: 'התנתקות',
                icon: 'pi pi-sign-out',
                template: itemRenderer,
                command: () => {
                    localStorage.removeItem('token')
                    navigate("/");
                    if (desktopOp.current) desktopOp.current.hide()
                    if (op.current) op.current.hide()
                }
            }
        ]
    }]
    
    return (
        <div className="flex flex-column " style={{backgroundColor:"rgba(255, 225, 111, 0.3)"}}>
            <div className="w-11 flex flex-nowrap align-items-center justify-content-between gap-3 border-1 border-white border-round-3xl p-3 fixed z-5 shadow-4"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', direction: 'rtl', top: "2%", left: "3%" }}>
                
                <div className='flex flex-nowrap align-items-center'>
                    <Link to="/" className="flex align-items-center flex-shrink-0">
                        <img src={ikeaLogo} height="40" alt="לוגו" />
                    </Link>
                </div>
                
                <div className='flex flex-nowrap align-items-center gap-2'>
                    <div className="flex-shrink-0">
                        <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
                            <Button 
                                icon="pi pi-shopping-cart" 
                                severity="info" 
                                onClick={() => navigate('/Basket')} 
                                disabled={token === null} 
                            />
                        </span>
                        {token === null && (
                            <Tooltip target=".basket" mouseTrack mouseTrackBottom={10} />
                        )}
                    </div>
                    
                
                    <div>
                        {token === null ? (
                            <Button 
                                icon="pi pi-user" 
                                onClick={(e) => desktopOp.current.toggle(e)} 
                                text 
                                rounded 
                                severity="secondary" 
                            />
                        ) : (
                            <Avatar
                                label={getInitials(firstName, lastName)}
                                size="normal"
                                style={{ 
                                    backgroundColor: 'rgb(52, 167, 224)',
                                    color: 'white', 
                                    cursor: 'pointer' ,
                                }}
                                onClick={(e) => desktopOp.current.toggle(e)}
                            />
                        )}
                        <OverlayPanel 
                            ref={desktopOp} 
                            style={{
                                width: '300px', 
                                direction: 'rtl', 
                                fontSize: '1rem',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <PanelMenu model={items} />
                        </OverlayPanel>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    )
}

export default Header