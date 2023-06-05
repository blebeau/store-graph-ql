import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './components/Products';
import Cart from './components/Cart';
import Navigation from './components/Navigation';
import AddProductToStore from './components/AddProductToStore';
import { Auth } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

Auth.currentSession()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

const { Amplify } = require("aws-amplify")

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

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

export default withAuthenticator(App);
