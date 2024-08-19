import { useEffect, useState } from "react"
import { Product } from "../Models/Product";
import Catalog from "../../Features/Catalog/Catalog";


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
      <h1 style={{color:'blue'}}>ecommerce</h1>
      <Catalog products={products} addProduct={addProduct} />
      
    </div>
      
   
  )
}

export default App
