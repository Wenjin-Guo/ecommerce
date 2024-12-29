const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_URLS = {
    //Account
    login: `${API_BASE_URL}/Account/login`,
    register: `${API_BASE_URL}/Account/register`,
    currentUser: `${API_BASE_URL}/Account/currentUser`,
    fetchBasket: `${API_BASE_URL}/Basket`,

    //Address
    address:`${API_BASE_URL}/Address`,
    getUserAddresses:`${API_BASE_URL}/Address/GetUserAddresses`,
    getDefaultAddress:`${API_BASE_URL}/Address/GetDefaultAddress`,

    //Basket
    basket: `${API_BASE_URL}/Basket`,

    //Order
    orderList:`${API_BASE_URL}/Order/GetOrderList`,
    order:`${API_BASE_URL}/Order`,
    createOrder:`${API_BASE_URL}/Order/CreateOrder`,

    //Products
    products:`${API_BASE_URL}/Products`,
};
