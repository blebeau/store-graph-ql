import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import Cart from './components/Cart';
import Navigation from './components/Navigation';
import AddProductToStore from './components/AddProductToStore';

function App() {

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="dashboard" element={<AddProductToStore />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
