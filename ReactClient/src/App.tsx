import { useEffect, useState } from "react"


function App() {

  const[products, setProduct] = useState([
    {name:'product1', price:100},
    {name:'product2', price:200}
  ]);

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then(response=> response.json())
    .then(data=>setProduct(data))
  },[])

  function addProduct(){
    setProduct([...products,
      {name:'product'+(products.length+1),price:(products.length+1)*100}])
  }

  return (
    
    <div className="app">
      <h1 style={{color:'blue'}}>ecommerce</h1>
      <ul>
          {products.map((item,index)=>
            (<li key={index}>{item.name} - {item.price}</li>))}
      </ul>
      <button onClick={addProduct}>Add Product</button>
    </div>
      
   
  )
}

export default App
