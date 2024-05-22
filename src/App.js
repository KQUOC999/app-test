import React,{lazy, Suspense} from "react";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './component/Navbar';

const Home = lazy( () => import ('./routers/home/page'));
const CartPage = lazy( () => import ('./routers/home/Cart_page'));
const OrderingInfoPage = lazy ( () => import('./routers/home/ordering_infor'));
const MyForm     = lazy( () => import('./routers/home/FormInput'));
const Logout     = lazy ( () => import('./routers/home/logout'))

function App() {
  return (
  <Router>
    <Navbar />
    <Suspense fallback = {<div>Loading....</div>}>
      <Routes>

        <Route path ="/app-test/Logout" element = {<Logout/>} />
        <Route path = "/app-test/home" element = {<Home/>} />
        <Route path ="/app-test/cart"  element = {<CartPage/>} />
        <Route path ="/app-test/orderingInformation" element = {<OrderingInfoPage/>} />
        <Route path ="/app-test/MyForm" element = {<MyForm/>} />

      </Routes>
    </Suspense>
  </Router>

  );
}

export default App;
