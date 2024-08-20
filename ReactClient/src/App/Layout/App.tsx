import { useEffect, useState } from "react"
import { Product } from "../Models/Product";
import Catalog from "../../Features/Catalog/Catalog";
import { Typography } from "@mui/material";


function App() {

  const[products, setProduct] = useState<Product[]>([]);

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then(response=> response.json())
    .then(data=>setProduct(data))
  },[])

  function addProduct(){
    setProduct([...products,
      { 
        id:products.length+101,
        name:'product'+(products.length+1),
        price:(products.length+1)*100,
        brand:'some brand'
      }])
  }

  return (
    
    <div className="app">
      <Typography variant="h1">ecommerce</Typography>
      <Catalog products={products} addProduct={addProduct} />
      
    </div>
      
   
  )
}

export default App
