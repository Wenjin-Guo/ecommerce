import { Product } from "../../App/Models/Product";

interface Props{
    products:Product[];
    addProduct:()=>void;
}


export default function Catalog(props:Props){
    return ( 
        <>    
            <ul>
                {props.products.map((item,index)=>
                    (<li key={index}>{item.name} - ${item.price}</li>))}
            </ul>
            <button onClick={props.addProduct}>Add Product</button>
        </>
    )
}