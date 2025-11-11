import { Image } from 'primereact/image';
import { Link } from "react-router-dom"

const Categories=()=>{
    const cat=["גן_ומרפסת","שמשיות_ופתרונות_הצללה","אדניות_ועציצים","מטבח_חוץ_ואביזרים","אביזרים_לגינה","תאורת_גינה_וחוץ"]

    const catgories=async ()=>{
    }
    return(
<div className="overflow-x-auto border-1 border-white border-round-3xl ml-6 mr-7 p-4" dir="rtl" style={{marginTop:"100px",backgroundColor: 'rgba(255, 255, 255, 0.59)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}}>
  <div className="inline-flex gap-8 px-4">
    <Link className='hover:underline' to="/products" style={{color:'black',textDecoration:'none'}}>
      <Image src="http://localhost:1135/images/ריהוט_גן _ואביזרים.png" alt="ריהוט" width={60} />
      <p>כל המוצרים</p>
    </Link><hr/>

    {cat.map((category) => (
      <Link className='hover:underline' to={`/categoriesList/${category}`} key={category} style={{color:'black',textDecoration:'none'}}>
        <Image src={`http://localhost:1135/images/${category}.png`} alt={category} width={60} />
        <p className="text-color" >{category.split("_").join(" ")}</p>
      </Link>
    ))}
  </div>
</div>



)
}
export default Categories