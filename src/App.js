import React,{lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

const Home = lazy( () => import ('./routers/home/page'));
const CartPage = lazy( () => import ('./routers/home/Cart_page'));
const OrderingInfoPage = lazy ( () => import('./routers/home/ordering_infor'));
const MyForm     = lazy( () => import('./routers/home/FormInput'));

function App() {
  return (
  <Router>

    <Suspense fallback = {<div>Loading....</div>}>
      <Routes>
      
        <Route path = "/app-test" element = {<Home/>} />
        <Route path ="/cart"  element = {<CartPage/>} />
        <Route path ="/orderingInformation" element = {<OrderingInfoPage/>} />
        <Route path ="/MyForm" element = {<MyForm/>} />

      </Routes>
    </Suspense>
  </Router>

  );
}

export default App;
