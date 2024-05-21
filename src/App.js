import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';

const Home = lazy(() => import('./routers/home/page'));
const CartPage = lazy(() => import('./routers/home/Cart_page'));
const OrderingInfoPage = lazy(() => import('./routers/home/ordering_infor'));
const MyForm = lazy(() => import('./routers/home/FormInput'));
const Logout = lazy(() => import('./routers/home/logout'));

// Error boundary component to catch loading errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading chunk:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong while loading the page.</h1>;
    }

    return this.props.children; 
  }
}

function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading....</div>}>
          <Routes>
            <Route path="/Logout" element={<Logout />} />
            <Route path="/app-test" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orderingInformation" element={<OrderingInfoPage />} />
            <Route path="/MyForm" element={<MyForm />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
