

import { Product } from "../../App/Models/Product";
import ProductList from "./ProductList";
import { useEffect, useState } from "react";




export default function Catalog(){
    const[products, setProduct] = useState<Product[]>([]);

    useEffect(()=>{
      fetch('http://localhost:5000/api/products')
      .then(response=> response.json())
      .then(data=>setProduct(data))
    },[])
  

    return ( 
        <>    
            <ProductList products={products} />
        </>
    )
}