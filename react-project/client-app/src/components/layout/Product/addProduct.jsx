import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import rm from '../../../pics/backAddProd.webp'

import axios from 'axios';

const AddProduct = (prod) => {
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("")
    const [description, setDescriptoin] = useState("")
    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("")
    const [length, setLength] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)

    const [color, setColor] = useState([])
    const [picture, setPicture] = useState("")
    const [price, setPrice] = useState()

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const colorArray = color.map((c) => c.name)
            const pictureArray = picture.split(',');
            const response = await axios.post("http://localhost:1135/api/product", {
                name, description, details, category: category.name, size: { length, width, height, weight }, color: colorArray, picture: pictureArray, price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setName("");
            setDescriptoin("");
            setDetails("");
            setCategory("");
            setLength(0);
            setWidth(0);
            setHeight(0);
            setWeight(0);
            setColor([]);
            setPicture([]);
            setPrice(0);
            setVisible(false);
            if (prod.getAllProducts)
                prod.getAllProducts()
            if (prod.getProductsByCategory)
                prod.getProductsByCategory()
        }
        catch (err) {
            console.error(err);
        }
    }

    const categories = [
        { name: 'גן_ומרפסת' },
        { name: 'שמשיות_ופתרונות_הצללה' },
        { name: 'אדניות_ועציצים' },
        { name: 'מטבח_חוץ_ואביזרים' },
        { name: 'אביזרים_לגינה' },
        { name: 'תאורת_גינה_וחוץ' },
    ];

    const colors = [
        { name: 'אפור' },
        { name: 'אפור כהה' },
        { name: 'שחור' },
        { name: 'ירוק' },
        { name: 'חום' },
        { name: 'עץ' },
        { name: 'כסוף' },
        { name: 'לבן' },
        { name: 'לילך' },
        { name: 'כחול' }
    ];

    const selectedCategory = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={`http://localhost:1135/images/${option.name}.png`} className={`mr-2 flag`} style={{ width: '18px' }} />
                    <div>{option.name}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const categoryOption = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src={`http://localhost:1135/images/${option.name}.png`} className={`mr-2 flag`} style={{ width: '18px' }} />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <>
            <div className="flex justify-content-center ">
                <Button className="border-0 border-round-left-3xl fixed z-5 animated-btn" label='הוסף מוצר' style={{ right: 0, bottom: "20%" }} icon="pi pi-plus" onClick={() => setVisible(true)} />
                <style>{`
                .animated-btn {
                    background-color:rgb(17, 177, 129);
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .animated-btn:hover {
                    background-color:rgb(9, 240, 121);
                    transform: scale(1.08);
                    width:10rem;
                }`}</style>

                <Dialog className='bg-no-repeat bg-cover h-screen border-round-3xl'
                    style={{ backgroundImage: `url(${rm})` }}
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex justify-content-center overflow-y-scroll overflow-x-hidden md:overflow-y-hidden flex-column px-8 py-5 gap-4 border-round-3xl h-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.72)" }}>
                            <form className='' style={{ direction: "rtl" }}>
                                <h1>הוספת מוצר חדש</h1>
                                <FloatLabel >
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את שם המוצר"></i>
                                    <InputText className='w-11' id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="name">שם מוצר</label>
                                </FloatLabel><br />
                                <FloatLabel >
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס תאור של המוצר"></i>
                                    <InputText className='w-11' id="description" value={description} onChange={(e) => setDescriptoin(e.target.value)} required />
                                    <Tooltip target=".custom-target-icon" />
                                    <label htmlFor="description">תאור המוצר</label>
                                </FloatLabel><br />
                                <FloatLabel >
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את פרטי המוצר"></i>
                                    <Tooltip target=".custom-target-icon" />
                                    <InputTextarea id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={5} cols={30} />
                                    <label htmlFor="details">פרטי המוצר</label>
                                </FloatLabel><br />
                                <div className="flex align-items-center gap-2 mb-3">
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        data-pr-tooltip="לאיזו קטגוריה המוצר החדש משתייך"></i>
                                    <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={categories} optionValue='' optionLabel="name" filter
                                        valueTemplate={selectedCategory} id="category" itemTemplate={categoryOption} className="flex-1" placeholder="בחר קטגוריה"
                                    />
                                    <Tooltip target=".custom-target-icon" />
                                </div><br />
                                <div className="flex justify-content-center gap-2">
                                    <InputNumber className='l' data-pr-tooltip="אורך" value={length} onValueChange={(e) => setLength(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                        min={0} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <Tooltip target=".l input" mouseTrack mouseTrackLeft={10} />
                                    <InputNumber className='w' data-pr-tooltip="רוחב" value={width} onValueChange={(e) => setWidth(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                        min={0} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <Tooltip target=".w input" mouseTrack mouseTrackLeft={10} />
                                    <InputNumber className='h' data-pr-tooltip="גובה" value={height} onValueChange={(e) => setHeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                        min={0} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <Tooltip target=".h input" mouseTrack mouseTrackLeft={10} />
                                    <InputNumber className='we' data-pr-tooltip="משקל" value={weight} onValueChange={(e) => setWeight(e.value)} showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                        min={0} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                                    <Tooltip target=".we input" mouseTrack mouseTrackLeft={10} />
                                </div><br />
                                <div>
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip="בחר את צבעי המוצר"></i>
                                    <Tooltip target=".custom-target-icon" />
                                    <MultiSelect value={color} onChange={(e) => setColor(e.target.value)} options={colors} placeholder='בחר צבעי מוצר' optionLabel="name" className="w-11" />
                                </div><br />
                                <FloatLabel>
                                    <Tooltip target=".custom-target-icon" />
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip=" הכנס את שמות תמונות המוצר כולל סיומות מופרדות בפסיקים ורווח"></i>
                                    <InputText className='w-11' id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required />
                                    <label htmlFor="picture">שם תמונה</label>
                                </FloatLabel>
                                <br />
                                <FloatLabel>
                                    <label htmlFor="stacked-buttons" className="block mb-2">מחיר המוצר</label>
                                    <Tooltip target=".custom-target-icon" />
                                    <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                        style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את מחיר המוצר החדש"></i>
                                    <InputNumber className='w-11' style={{ direction: "ltr" }} inputId="stacked-buttons" value={price} onValueChange={(e) => setPrice(e.value)} showButtons mode="currency" currency="ILS" min={0} />
                                </FloatLabel><br />
                                <div className="flex align-items-center gap-2">
                                    <Button label="ביטול" onClick={() => setVisible(false)} text className="p-3 w-full text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"></Button>
                                    <Button label="הוסף מוצר" onClick={(e) => addProduct(e)} disabled={!name || !details || !description || !category || !picture || !color || !price}
                                        text className="p-3 w-full text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"></Button>
                                </div>
                            </form>
                        </div>
                    )}
                ></Dialog>
            </div>
        </>
    )
}
export default AddProduct