import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import SubNavbar from "../SubNavbar/SubNavbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import { removeFromCart, addToCart, getQuantityOfItemInCart, getTotalItemsInCart } from "../../utils/cart";
import "./App.css";
import { calculateOrderSubtotal, calculateTotal } from "../../utils/calculations";  // Import calculation functions
function App() {

  // State variables
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [userInfo, setUserInfo] = useState({ name: "", dorm_number: ""});
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  //create a const variable equal to the local host, fetch 
  const dataUrl = "http://localhost:3000/products"; 

  const fetchProducts = async (params = {}) => {
    setIsFetching(true);
    try {
      const response = await axios.get(`${dataUrl}`);
      console.log("Fetched Products:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); 
    } finally {
      setIsFetching(false);
    }
  };

  // useEffect to fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []); 


  // Toggles sidebar
  const toggleSidebar = () => setSidebarOpen((isOpen) => !isOpen);

  // Functions to change state (used for lifting state)
  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

const handleOnCheckout = async () => {
  //set isCheckingOut to true 
  setIsCheckingOut(true);
  //function to calculate total price
  //const totalPrice = Number(calculateOrderSubtotal(Object.values(cart)));
  const totalPrice = calculateOrderSubtotal(Object.values(cart));
  //create an order with cart items
  console.log(`Price calculated: ${totalPrice}`);

  try {

    const orderData = {
      customer_id: parseInt(userInfo.name), 
      status: "pending", 
      total_price: totalPrice,
    };
    const response = await axios.post("http://localhost:3000/orders", orderData);
    const id_order = response.data.id
    

    order_items: Object.values(cart).map( async (item) => (
      // post request to /orders 
      await axios.post(`http://localhost:3000/order-items${id_order}order_items`, {product_id: item.id,
        quantity: item.quantity,price: item.price})
  ))
  
  //handle success and errors

  console.log("Order created successfully:", response.data);
  setOrder(response.data); 
  setCart({}); 
  setError("Success!"); 
} catch (error) {
  // Handle error response
  console.error("Error creating order:", error);
  setError("Failed to checkout. Please try again."); 
} finally {
  setIsCheckingOut(false); //reset the cart
}


  }






  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar
          cart={cart}
          error={error}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          isOpen={sidebarOpen}
          products={products}
          toggleSidebar={toggleSidebar}
          isCheckingOut={isCheckingOut}
          addToCart={handleOnAddToCart}
          removeFromCart={handleOnRemoveFromCart}
          getQuantityOfItemInCart={handleGetItemQuantity}
          getTotalItemsInCart={handleGetTotalCartItems}
          handleOnCheckout={handleOnCheckout}
          order={order}
          setOrder={setOrder}
        />
        <main>
          <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  error={error}
                  products={products}
                  isFetching={isFetching}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  addToCart={handleOnAddToCart}
                  searchInputValue={searchInputValue}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="/:productId"
              element={
                <ProductDetail
                  cart={cart}
                  error={error}
                  products={products}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound
                  error={error}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
 