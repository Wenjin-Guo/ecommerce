import { useDispatch, useSelector } from "react-redux";
import ProductList from "./ProductList";
import { useEffect} from "react";
import { AppDispatch, AppState } from "../../app/store/configureStore";
import { fetchProductAsync, productSelectors } from "./productSlice";




export default function Catalog(){
    const products = productSelectors.selectAll;
    const productsLoaded = useSelector((state:AppState)=> state.productState.prodcutsLoaded);
    const dispatch = useDispatch<AppDispatch>();
    //const[products, setProduct] = useState<Product[]>([]);

    useEffect(()=>{
      if(!productsLoaded) dispatch(fetchProductAsync());
    },[productsLoaded,dispatch])
  

    return ( 
        <>    
            <ProductList products={products} />
        </>
    )
}