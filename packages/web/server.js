require('dotenv').config();

const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const bodyParser = require('body-parser');
const WooCommerceAPI = require('woocommerce-api');
const cors = require('cors');

app
  .prepare()
  .then(() => {
    const server = express();

    server.use(cors());

    server.use(bodyParser.json());

    const api = new WooCommerceAPI({
      url: process.env.STORE_URL, // Your store URL
      consumerKey: process.env.STORE_CONSUMER_KEY, // Your consumer key
      consumerSecret: process.env.STORE_CONSUMER_SECRET, // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3' // WooCommerce WP REST API version
    });

    server.get('/api/products', function(req, res) {
      api.getAsync('products').then(result => {
        res.send(JSON.parse(result.toJSON().body));
      });
    });

    server.get('/api/products/:slug', (req, res) => {
      const actualPage = '/product';
      const queryParams = { slug: req.params.slug };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
