import axios from 'axios';

import WooApi from '../constants/api';
import Products from '../components/products';

const IndexPage = ({ products }) => (
  <main>
    <Products products={products} />
  </main>
);

IndexPage.getInitialProps = async () => {
  const url = 'http://localhost:3000/api/products';

  const products = await axios.get(url);

  return {
    products: products.data
  };
};

export default IndexPage;
