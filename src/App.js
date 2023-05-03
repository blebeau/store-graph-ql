import './App.css';
import { useQuery, gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import AddToCartButton from './components/AddToCartButton';
import Products from './components/Products';

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>
      <br />
      <Products />
    </div>
  );
}

export default App;
