import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  padding-right: 15px;
  @media (min-width: 992px) {
    width: 65%;
  }
`;

const Img = styled.img`
  width: 100%;
`;

const Description = styled.div`
  @media (min-width: 992px) {
    width: 35%;
  }
`;

const Price = styled.span`
  font-size: 2em;
`;

const Product = ({ product }) => {
  {
    return product !== undefined ? (
      <>
        <h1>{product.name}</h1>
        <Row>
          <ImgContainer>
            <Img
              src={product.images[0] ? product.images[0].src : ''}
              alt={product.name}
            />
          </ImgContainer>
          <Description>
            <Price>$ {product.price}</Price>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Description>
        </Row>
      </>
    ) : (
      <div>
        <h1>404</h1>
        <p>Sorry, the product you were looking for was not found!</p>
        <Link href="/">
          <a className="link">Go back to homepage!</a>
        </Link>
      </div>
    );
  }
};

Product.getInitialProps = async ({ query }) => {
  const url = 'http://localhost:3000/api/products';

  const response = await axios.get(url);

  if (response.data) {
    return { product: response.data[0] };
  } else {
    return { product: null };
  }
};

export default Product;
