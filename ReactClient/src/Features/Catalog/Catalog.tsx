import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import { useEffect} from "react";
import { AppDispatch, AppState } from "../../app/store/configureStore";
import { fetchProductsAsync, selectAllProducts } from "./productSlice";




export default function Catalog(){
    const products = useSelector((state:AppState)=>selectAllProducts(state));
    const productsLoaded = useSelector((state:AppState)=> state.productState.prodcutsLoaded);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
      if(!productsLoaded) dispatch(fetchProductsAsync());
    },[dispatch])
  

    return ( 
        <>    
            <ProductList products={products} />
        </>
    )
}