import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../Features/Home/HomePage";
import Catalog from "../../Features/Catalog/Catalog";
import App from "../Layout/App";
import ProductDetails from "../../Features/Catalog/ProductDetails";
import AboutPage from "../../Features/About/AboutPage";
import ContactPage from "../../Features/Contact/ContactPage";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import { BasketPage } from "../../Features/Basket/BasketPage";

export const router = createBrowserRouter([
    {
        path:'/',
        element:<App />,
        children:[
            {path:'/', element: <HomePage />},
            {path:'/catalog', element: <Catalog />},
            {path:'/catalog/:id', element: <ProductDetails />},
            {path:'/about', element: <AboutPage />},
            {path:'/contact', element: <ContactPage />},
            {path:'/server-error', element:<ServerError />},
            {path:'/not-found', element:<NotFound />},
            {path:'/basket', element:<BasketPage />},
            {path:'*', element:<NotFound />},
        ]
    }
])
