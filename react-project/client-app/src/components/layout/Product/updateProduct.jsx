import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import rm from '../../../pics/backUpdateProd.webp'
import axios from 'axios';


const UpdateProduct = (obj) => {

    const [name, setName] = useState(obj.curProduct.name)
    const [description, setDescriptoin] = useState(obj.curProduct.description)
    const [details, setDetails] = useState(obj.curProduct.details)
    const [category, setCategory] = useState(obj.curProduct.category)
    const [length, setLength] = useState(obj.curProduct.size.length)
    const [width, setWidth] = useState(obj.curProduct.size.width)
    const [height, setHeight] = useState(obj.curProduct.size.height)
    const [weight, setWeight] = useState(obj.curProduct.size.weight)

    const [color, setColor] = useState(obj.curProduct.color)
    const [picture, setPicture] = useState(obj.curProduct.picture.join(", "))
    const [price, setPrice] = useState(obj.curProduct.price)

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
        { name: 'שחור' },
        { name: 'ירוק' },
        { name: 'חום' },
        { name: 'עץ' },
        { name: 'כסוף' }
    ];

    const selectedCategory = (option, props,) => {
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

    const updateProduct = async (e) => {
        try {
            e.preventDefault()
            const token = localStorage.getItem('token');
            const pictureArray = picture.split(', ');
            const updated = await axios.put("http://localhost:1135/api/product", {
                id: obj.curProduct._id, name, description, details, category: category, size: { length, width, height, weight }, color, picture: pictureArray, price
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
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
            obj.onHide()
            if (obj.getAllProducts)
                obj.getAllProducts()
            if (obj.getProductsByCategory)
                obj.getProductsByCategory()
            if (obj.getProduct)
                obj.getProduct()
        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <Sidebar visible={obj.visible} onHide={obj.onHide} className="w-full p-0 md:w-30rem bg-no-repeat bg-cover h-screen" style={{ backgroundImage: `url(${rm})` }}>
                <div className="flex flex-column px-8 w-full py-5 gap-4 border-round-3xl border-1 border-white"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}>
                    <form>
                        <h1>עדכן את המוצר {obj.curProduct.name}</h1>
                        <FloatLabel className='w-full'>
                            <InputText className='w-11' id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            <Tooltip target=".custom-target-icon" />
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את שם המוצר"></i>
                            <label htmlFor="name">שם מוצר</label>
                        </FloatLabel><br />
                        <FloatLabel className='w-full'>
                            <InputText className='w-11' id="description" value={description} onChange={(e) => setDescriptoin(e.target.value)} required />
                            <Tooltip target=".custom-target-icon" />
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס תאור של המוצר"></i>
                            <label htmlFor="description">תאור המוצר</label>
                        </FloatLabel><br />
                        <FloatLabel className='w-full'>
                            <Tooltip target=".custom-target-icon" />
                            <InputTextarea className='w-11' id="details" value={details} onChange={(e) => setDetails(e.target.value)} rows={5} cols={30} />
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את פרטי המוצר"></i>
                            <label htmlFor="details">פרטי המוצר</label>
                        </FloatLabel><br />
                        <FloatLabel className='w-full'>
                            <Tooltip target=".custom-target-icon" />
                            <Dropdown value={category} onChange={(e) => setCategory(e.value)} options={categories} optionValue='name' optionLabel="name"
                                filter valueTemplate={selectedCategory} id="category" itemTemplate={categoryOption} className="w-11" />
                            <label htmlFor="category">קטגוריה</label>
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="לאיזו קטגוריה המוצר החדש משתייך"></i>
                        </FloatLabel><br />

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
                        <FloatLabel className="w-full">
                            <MultiSelect value={color} onChange={(e) => setColor(e.target.value)} options={colors} optionLabel="name" optionValue='name' className="w-11" />
                            <label htmlFor="ms-cities">בחר צבעי מוצר</label>
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="בחר את צבעי המוצר"></i>
                            <Tooltip target=".custom-target-icon" />
                        </FloatLabel><br />
                        <FloatLabel className='w-full'>
                            <InputText className='w-11' id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required />
                            <Tooltip target=".custom-target-icon" />
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את שמות תמונות המוצר כולל סיומות מופרדות בפסיקים ורווח"></i>
                            <label htmlFor="picture">שם תמונה</label>
                        </FloatLabel ><br />
                        <FloatLabel className='w-full'>
                            <label htmlFor="stacked-buttons" className="font-bold block mb-2">מחיר המוצר</label>
                            <InputNumber inputClassName='w-10' className='w-11' inputId="stacked-buttons" value={price} onValueChange={(e) => setPrice(e.value)} showButtons mode="currency" currency="ILS" min={0} />
                            <Tooltip target=".custom-target-icon" />
                            <i className="custom-target-icon pi pi-question-circle p-text-secondary p-overlay-badge"
                                style={{ marginLeft: "5px" }} data-pr-tooltip="הכנס את מחיר המוצר החדש"></i>
                        </FloatLabel>
                    </form>
                    <Button label="עדכן מוצר" onClick={(e) => updateProduct(e)} text className="p-3 w-full text-primary-50 border-3 border-white-alpha-30 hover:bg-white-alpha-60"
                        disabled={!name || !details || !description || !category || !picture || !color || !price} ></Button>
                </div>

            </Sidebar>
        </>
    )
}
export default UpdateProduct