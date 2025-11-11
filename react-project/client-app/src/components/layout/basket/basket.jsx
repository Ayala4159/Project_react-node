import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Badge } from 'primereact/badge';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';
import basket1 from '../../../pics/basket1.png'
import basket2 from '../../../pics/basket2.png'
import rm from '../../../pics/backBasket.webp'
import axios from "axios";
import { Link } from "react-router-dom";

const Basket = () => {
  const token = localStorage.getItem("token")
  const [basket, setBasket] = useState([]);
  const [flag, setFlag] = useState(false)

  useEffect(() => {
    getBasket()
  }, [])

  const { _id } = JSON.parse(atob(token.split('.')[1]));

  const getBasket = async () => {
    try {
      const { data } = await axios.get(`http://localhost:1135/api/basket/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const basketArray = data.filter((ord) => {
        if (ord.product === null)
          deleteOrder(ord)
        return ord.product != null
      })
      setFlag(true)
      setBasket(basketArray)
    }
    catch (err) {
      if (err.status === 400) {
        setFlag(false)
      }
    }
  }

  const deleteOrder = async (ord) => {
    try {
      const deleted = await axios.delete(`http://localhost:1135/api/basket/${ord.customer}/${ord.product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      getBasket()
    }
    catch (error) {
      console.log(error)
    }
  }

  const UpdateProduct = async (sign, id, amount, order) => {
    const num = sign === "+" ? 1 : -1
    try {
      const { updateBasket } = await axios.put(`http://localhost:1135/api/basket/${_id}/${id}/${num}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (amount + num <= 0) { 
        await deleteOrder(order)
      }
      getBasket()
    }
    catch (err) {

    }
  }

  const itemTemplate = (ord, product, amount, index) => {
    return (
      <div className="col-12 m-4 w-11" key={product._id} >
        <style>{`.p-dataview .p-dataview-content {background: transparent !important;}`} </style>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start ml-5 p-4 border-round-3xl border-1 border-white shadow-4',)}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)' }}>
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block m-2 border-round-3xl" style={{ border: "rgb(12, 150, 174)  solid 2px" }}
            src={`http://localhost:1135/images/${product.category}/${product.picture[0]}`} alt={product.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <Link className="text-color" style={{ textDecoration: "none" }} to={`/${product._id}`}>
                <div className="text-2xl font-bold text-900">{product.name}</div>
                <h5>{product.description}</h5>
                <div className="flex align-items-center gap-3">
                  <span className="flex align-items-center gap-2">
                    <i className="pi pi-tag"></i>
                    <span className="font-semibold">{product.category.split("_").join(" ")}</span>
                  </span>
                </div>
              </Link>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">{product.price*amount}₪</span>
              <div >
                <Button onClick={() => UpdateProduct("+", product._id, amount, ord)} icon="pi pi-plus" rounded text aria-label="Filter" className="text-color border-none shadow-none bg-transparent hover:bg-transparent" />
                <Badge className="text-color" value={amount} size="xlarge" style={{ backgroundColor: "transparent" }}></Badge>
                <Button onClick={() => UpdateProduct("-", product._id, amount, ord)} icon="pi pi-minus" rounded text aria-label="Filter" className="text-color border-none shadow-none bg-transparent hover:bg-transparent" />
              </div>
              <Button className="border-0" style={{ backgroundColor: "rgb(241,213,2)" }} onClick={(e) => confirm2(e, ord)} icon="pi pi-trash" rounded></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listTemplate = (items) => {
    if (!items || items.length === 0) return null;

    let list = items.map((order, index) => {
      return itemTemplate(order, order.product, order.amount, index);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  const toast = useRef(null);

  const accept = (ord) => {
    deleteOrder(ord)
    toast.current.show({ summary: 'מחיקה הושלמה', detail: 'המוצר נמחק בהצלחה', life: 3000 });
  };

  const reject = () => {
    toast.current.show({ summary: 'ביטלת בהצלחה', detail: 'המחיקה של המוצר בוטלה בוטלה', life: 3000 });
  };

  const confirm2 = (event, ord) => {
    confirmPopup({
      target: event.currentTarget,
      message: '?האם אתה בטוח שברצונך למחוק מוצר זה מהסל',
      icon: 'pi pi-info-circle',
      defaultFocus: 'reject',
      acceptClassName: 'p-button-danger',
      accept: () => accept(ord),
      reject: () => reject()
    });
  };


  return (

    <div className="flex justify-content-center align-items-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${rm})`, backgroundAttachment: 'fixed',minHeight:"73.5vh" }}>
      <style>{`                   
       .p-dataview .p-dataview-content
          {background: transparent !important;}`}</style>
      {flag ? <>
        <DataView style={{ backgroundColor: "transparent" }} value={basket} listTemplate={listTemplate} />
        <Toast ref={toast} />
        <ConfirmPopup /></> :
        <div className="flex flex-column align-items-center justify-content-center border-1 border-white border-round-3xl p-5"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          <img src={basket2} height="200" className="mr-2"></img><br />
          <div style={{ direction: "rtl" }}><h1>🌿 סל הקניות שלך עדיין ריק...</h1><p>נראה שהגן שלך עוד מחכה להתחדשות.<br />
            הסל שלך מחכה בשקט, עם מקום פנוי לשולחן עץ מפנק, כיסא נוח לשבת בו מול השקיעה, או אולי אפילו ערסל חלומות...<br />
            בוא לבחור פריט אחד שיכניס חיים חדשים למרפסת, לחצר או לגג.<br />
            ב־<b>IKEA</b> תמצא כל מה שצריך כדי להפוך את החוץ שלך למקום שתאהב להיות בו – כל יום, כל עונה.</p><h4>יש לך טעם. עכשיו רק נשאר לבחור.</h4>
          </div>
          <img src={basket1} height="20" className="mr-2"></img>
        </div>}
    </div>
  )
}
export default Basket