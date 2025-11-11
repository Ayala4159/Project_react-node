import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { DataView } from 'primereact/dataview';
import { Tooltip } from 'primereact/tooltip';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { Image } from 'primereact/image';
import { useDispatch } from 'react-redux'
import { setRole } from "../../../redux/userSlice";
import axios from "axios";
import AddProduct from "./addProduct";
import UpdateProduct from "./updateProduct";
import rm from '../../../pics/backProd2.webp'


const Products = () => {
    useEffect(() => {
        getAllProducts()
 try {
        const payload = token.split('.')[1];
        const parsed = JSON.parse(atob(payload));
        const { role } = parsed;
        dispatch(setRole(role));
    } catch (error) {
        console.error("בעיה בפענוח הטוקן:", error);
    }
    }, [])
    const token = localStorage.getItem('token')
    const role2 = useSelector((state) => state.userSlice.role)
    const [products, setProducts] = useState([])
    const [visible, setVisible] = useState(false)
    const [curProduct, setCurProduct] = useState({})
    const toast = useRef(null);
    const dispatch = useDispatch()


    const addToBasket = async (product) => {
        const { _id } = JSON.parse(atob(token.split('.')[1]));
        try {
            const productInBasket = await axios.post(`http://localhost:1135/api/basket/${_id}/${product._id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            show("הצלחנו...", `${product.name} נוסף לסל הקניות שלך בהצלחה`)
        }
        catch (err) {
            if (err.status === 409)
                try {
                    const updateProduct = await axios.put(`http://localhost:1135/api/basket/${_id}/${product._id}/1`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    show("הצלחנו...", `${product.name} עודכן בסל הקניות שלך בהצלחה`)
                }

                catch {
                    show("שגיאה", "ארעה שגיאה בעת ההוספה לםל. נסה שוב או פנה לשרות הלקוחות")
                }
        }
    }

    const show = (type, message) => {
        toast.current.show({ summary: type, detail: message });
    };

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:1135/api/product')
            setProducts(data)
        } catch (err) {
            console.error("שגיאה בטעינת מוצרים:", err);
        }
    }

    const deleteProduct = async (id) => {
        try {
            const deleted = await axios.delete(`http://localhost:1135/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getAllProducts()
        } catch (err) {
            console.error("שגיאה במחיקה:", err);
        }
    }

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-4 xl:col-3 p-2" key={product._id} style={{ direction: "rtl" }}>
                <div className="p-4 border-1 border-white border-round-3xl shadow-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category.split("_").join(" ")}</span>
                        </div>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <Image imageClassName=" border-round-3xl" className="shadow-8 border-round-3xl" style={{ border: "rgb(12, 150, 174)  solid 2px" }} src={`http://localhost:1135/images/${product.category}/${product.picture[0]}`} alt="Image" width="240" preview />
                        <Link to={`/${product._id}`} className='no-underline'>
                            <div className="text-2xl text-center font-bold" style={{ color: "black" }}>{product.name}</div>
                            <h4 className="mt-0 mb-3" style={{ color: "grey" }}>{product.description}</h4>
                        </Link>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">{product.price}₪</span>
                        <div className="mt-5 flex flex-wrap gap-2 justify-content-center">
                            <span className="basket" data-pr-tooltip="עליך להתחבר כדי שתוכל להוסיף מוצרים לסל שלך">
                                <Button onClick={(e) => addToBasket(product)} className="border-0" style={{ backgroundColor: "rgb(12, 150, 174)" }} icon="pi pi-cart-plus" rounded disabled={token === null} /></span>
                            {token === null && <Tooltip target=".basket" mouseTrack mouseTrackLeft={10} />}
                            {role2 === "manager" && (
                                <>
                                    <Button className="border-0" onClick={() => deleteProduct(product._id)} icon="pi pi-trash" rounded style={{ backgroundColor: "rgb(241, 213, 2)" }} />
                                    <Button className="border-0" onClick={() => { setVisible(true); setCurProduct(product) }} icon="pi pi-pencil" rounded />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, index) => {
        if (!product) {
            return;
        }
        return gridItem(product);
    };


    const listTemplate = (products) => {
        return <div className="grid grid-nogutter" >{products.map((product, index) => itemTemplate(product, index))}</div>;
    };


    return (
        <>
            <div className="mt-8 bg-no-repeat bg-cover h-screen" style={{
            }}>
                <style>{`
                    @keyframes fadeIn {
                      0% { opacity: 0; transform: translateY(20px); }
                      100% { opacity: 1; transform: translateY(0); }}
                    .fade-in {
                      animation: fadeIn 1s ease forwards;}
                    .p-dataview .p-dataview-content
                    {background: transparent !important;}`}</style>
                <DataView
                    value={products}
                    itemTemplate={itemTemplate}
                    style={{
                        backgroundImage: `url(${rm})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        padding: '2rem',
                        minHeight: '100vh',
                    }}
                />


            </div>
            {role2 === "manager" && <AddProduct getAllProducts={getAllProducts} />}
            {visible && <UpdateProduct getAllProducts={getAllProducts} curProduct={curProduct} visible={visible} onHide={() => setVisible(false)} />}
            <Toast className="text-right" ref={toast} />
        </>
    )
}

export default Products