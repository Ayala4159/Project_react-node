import back from '../../../pics/backProd.webp'
import { Galleria } from 'primereact/galleria';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ScrollPanel } from 'primereact/scrollpanel';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { setRole } from '../../../redux/userSlice';
import { Tooltip } from 'primereact/tooltip';
import UpdateProduct from './updateProduct';
import { Toast } from 'primereact/toast';

const Product = () => {
    const { _id } = useParams()
    const [product, setProduct] = useState()
    const [images, setImages] = useState(null)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("")
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    const [color, setColor] = useState([])
    const [price, setPrice] = useState()
    const [flag, setFlag] = useState(false)
    const [vis, setVis] = useState(false)
    const [visible, setVisible] = useState(false)
    const [colorList, setColorList] = useState("")
    const role2 = useSelector(state => state.userSlice.role)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        getProductById()
        const token = localStorage.getItem('token');
        let role = null;

        if (token) {
            try {
                const payload = token.split('.')[1];
                role = JSON.parse(atob(payload)).role;
            } catch {
                // טיפול במקרה שה-token לא תקין
            }
        }

        dispatch(setRole(role));
    }, []);

    const getProductById = async () => {
        try {
            const { data } = await axios.get(`http://localhost:1135/api/product/${_id}`)
            setName(data.name)
            setDescription(data.description)
            setDetails(data.details)
            setCategory(data.category)
            setLength(data.size.length)
            setWidth(data.size.width)
            setHeight(data.size.height)
            setWeight(data.size.weight)
            setColor(data.color.join(','))
            setImages(data.picture)
            setPrice(data.price)
            setFlag(true)
            setProduct(data)



        }
        catch (err) {
            if (err.status === 400)
                setFlag(false)
        }
    }
    const itemTemplate = (item) => {
        return <img src={`http://localhost:1135/images/${category}/${item.charAt(0) === " " ? item.substring(1) : item}`} alt={item.alt} style={{ width: '30vw', height: "auto", display: 'block' }} className='border-round-3xl shadow-8' />;
    };


    const deleteProduct = async (id) => {
        try {
            const deleted = await axios.delete(`http://localhost:1135/api/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            navigate('/products')
        }
        catch (err) {

        }
    }
    const toast = useRef(null);

    const show = (summary, detail) => {
        toast.current.show({ summary: summary, detail: detail });
    };

    const addToBasket = async (product) => {
        const { _id } = JSON.parse(atob(token.split('.')[1]))
        try {
            const productInBasket = await axios.post(`http://localhost:1135/api/basket/${_id}/${product._id}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            const updateProduct = await axios.put(`http://localhost:1135/api/basket/${_id}/${product._id}/${1}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            const summary = 'הצלחה!'
            const detail = `${product.name} נוסף לסל הקניות שלך בהצלחה`
            show(summary, detail)
        }
        catch (err) {
            if (err.status === 409) {
                try {
                    const updateProduct = await axios.put(`http://localhost:1135/api/basket/${_id}/${product._id}/${1}`, {}, { headers: { Authorization: `Bearer ${token}` } })
                    const summary = 'הצלחה!'
                    const detail = `${product.name} נוסף לסל הקניות שלך בהצלחה`
                    show(summary, detail)
                }
                catch (err) {
                    const summary = 'שגיאה!'
                    const detail = ' אירעה שגיאה בעת ההוספה לסל, נסה שוב מאוחר יותר או פנה לשירות הלקוחות'
                    show(summary, detail)
                }
            }
        }
    }

    return (
        <>
            <div className="flex relative align-items-center justify-content-center bg-no-repeat bg-cover gap-0"
                style={{
                    backgroundImage: `url(${back})`, backgroundAttachment: 'fixed', animation: "fadeIn 1.5s ease-in-out", direction: "rtl",minHeight:"73.5vh"
                }}>
                {!flag ?
                    <div className="flex flex-column align-items-center justify-content-center border-1 border-white border-round-3xl p-5 m-5 w-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                        {/* <img src={basket1} height="200" className=" mr-2"/> */}
                        <h1> אופס...</h1>
                        <p>מוצר זה אינו קיים יותר במלאי </p>

                    </div>
                    : <div className="flex flex-column align-items-center justify-content-center border-1 border-white border-round-3xl p-1 mt-8 mb-8" style={{ width: "90vw", backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                        <div className="card scrollpanel-demo" style={{ backgroundColor: "transparent" }}>
                            <div className="flex flex-column md:flex-row gap-5" >
                                <div className="flex">
                                    <ScrollPanel style={{ width: '40vw', height: '100%' }} className="custombar1 p-1">
                                        <Galleria value={images} style={{ maxWidth: '50%', width: "30%", marginRight: "30%" }} changeItemOnIndicatorHover showThumbnails={false} showIndicators item={itemTemplate} />
                                        <div className="card flex justify-content-start border-noround p-5 mr-4 border-round-3xl" style={{ width: "30vw", backgroundColor: "rgba(55, 102, 233, 0.59)" ,border:"1px blue solid"}}>
                                            <span onClick={() => { setVis(true) }} className='hover:underline text-color border-noround text-xl' style={{ backgroundColor: "transparent" }}>  פרטי המוצר<i className="pi pi-arrow-left"> </i></span>
                                            <Sidebar visible={vis} onHide={() => { setVis(false) }} className="w-full md:20rem lg:w-30rem bg-no-repeat bg-cover" >
                                                {/* style={{ backgroundImage: `url(${back})` }} */}
                                                <div style={{}} className=''>
                                                    <div style={{ direction: "rtl" }}>
                                                        <h1>פרטי מוצר</h1>
                                                        <p>{details}</p>
                                                    </div>
                                                    <h4 style={{ direction: "rtl" }}>מידות מוצר:</h4>
                                                    <div >
                                                        <p>{`${length} x ${width} x ${height} ס"מ`}</p>
                                                        <p>{`${weight} ק"ג`}</p>                                                </div>
                                                </div>

                                            </Sidebar>
                                        </div>
                                    </ScrollPanel>
                                </div>
                                <div className="flex-auto">
                                    <ScrollPanel style={{ width: '40vw', height: '100%' }} className="custombar1 p-5">
                                        <div className="flex align-items-center gap-2">
                                            <i className="pi pi-tag"></i>
                                            <span className="">{category.split("_").join(" ")}</span>
                                        </div>
                                        <div className="flex flex-column justify-content-center align-items-start gap-3 py-5">
                                            <div className="text-4xl text-center font-bold" style={{ color: "black" }}>{name}</div>
                                            <h4 className="text-2xl mt-0 mb-0" style={{ color: "grey" }}>{description}</h4>
                                        </div>
                                        <div>{color}</div>
                                        <span className="text-6xl" >{price}₪</span>
                                        <div className="mt-5 flex flex-wrap gap-2 justify-content-end ml-7" >
                                            <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
                                                <Button className='border-0' style={{ backgroundColor: "rgb(12,150,174)" }} onClick={(e) => addToBasket(product)} icon="pi pi-cart-plus" rounded disabled={token === null} /></span>
                                            {token === null && <Tooltip target=".basket" mouseTrack mouseTrackLeft={10} />}
                                            {role2 === "manager" && (
                                                <>
                                                    <Button className='border-0' style={{ backgroundColor: "rgb(241,213,2)" }} onClick={() => deleteProduct(product._id)} icon="pi pi-trash" rounded severity="success" />
                                                    <Button className='border-0' onClick={() => { setVisible(true); setProduct(product) }} icon="pi pi-pencil" rounded />
                                                </>
                                            )}
                                        </div>
                                    </ScrollPanel>
                                    {visible && <UpdateProduct visible={visible} onHide={() => { setVisible(false) }} curProduct={product} getProduct={getProductById} />}
                                    <Toast ref={toast} />
                                </div>
                            </div>
                        </div>
                    </div>}


            </div>
        </>
    )
}



export default Product