const express = require('express');
const router = express.Router()

const { NewsEndpoint } = require('../service/news/endpoint');
const { ApplyEndpoint } = require('../service/apply/endpoint');
const { LoginEndpoint } = require('../service/login/endpoint');
const { ProductEndpoint } = require('../service/product/endpoint');


const News = require('../models/News');


// Create a new news item
router.post('/news', new NewsEndpoint().addNewsEndpoint);


// Get all news items
router.get('/news', async (req, res) => {
   const newsItems = await News.find({});
   res.send({"statusCode":200,"code":"00","data":newsItems});
   
});

// Get a news item by ID
router.get('/news/:id', async (req, res) => {
   const news = await News.findById(req.params.id);
   if (!news) return res.status(404).send('News not found');
   res.send(news);
});

router.put('/news/:id', new NewsEndpoint().updateNewsEndpoint)


// Delete a news item by ID
router.delete('/news/:id', async (req, res) => {
const news = await News.findByIdAndDelete(req.params.id);
if (!news) return res.status(404).send('News not found');
res.send(news);
});

router.get('/news/search/:id', async (req, res) => {
const newsId  = req.params.id;
if (!newsId) {
   return res.status(400).send('Topic is required');
}

try {
   const newsItem = await News.findOne({ newsId: newsId });
   if (!newsItem) {
   return res.status(404).send('News item not found');
   }
   res.send({ id: newsItem._id });
} catch (error) {
   res.status(500).send('Error searching news item');
}
});









const Apply = require('../models/Apply');

// Create a new news item
router.post('/apply', new ApplyEndpoint().addApplyEndpoint);



// Get all apply items
router.get('/apply', async (req, res) => {
  try {
    const applyItems = await Apply.find();
    res.send({"statusCode":200,"code":"00","data":applyItems});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a news item by ID
router.get('/apply/:id', async (req, res) => {
   const applyItems = await Apply.findById(req.params.id);
   if (!applyItems) return res.status(404).send('Apply not found');
   res.send(applyItems);
});

router.put('/apply/:id', new ApplyEndpoint().updateApplyEndpoint)


// Delete a news item by ID
router.delete('/apply/:id', async (req, res) => {
   const apply = await Apply.findByIdAndDelete(req.params.id);
   if (!apply) return res.status(404).send('Apply not found');
   res.send(apply);
});

router.get('/apply/search/:id', async (req, res) => {
   const applyId  = req.params.id;
   if (!applyId) {
      return res.status(400).send('params id is required');
   }
   
   try {
      const applyItem = await Apply.findOne({ applyId: applyId });
      if (!applyItem) {
         return res.status(404).send( `Apply item not found ${applyId}`);
      }
      res.send({ id: applyItem._id });
   } catch (error) {
      res.status(500).send('Error searching apply item');
   }
   });


const Login = require('../models/Login');

// Create a new news item
router.post('/login', new LoginEndpoint().addLoginEndpoint);


// Get all apply items
router.get('/login', async (req, res) => {
   try {
     const loginItems = await Login.find();
     res.send({"statusCode":200,"code":"00","data":loginItems});
   } catch (err) {
     res.status(500).json({ message: err.message });
   }
 });

// Get login by uuid
router.get('/login/:id', async (req, res) => {
   const login = await Login.findById(req.params.id);
   if (!login) return res.status(404).send('News not found');
   res.send(login);
});

router.put('/login/:id', new LoginEndpoint().updateLoginEndpoint)

// Delete a news item by ID
router.delete('/login/:id', async (req, res) => {
   const login = await Login.findByIdAndDelete(req.params.id);
   if (!login) return res.status(404).send('Login not found');
   res.send(login);
});

router.get('/login/search/:id', async (req, res) => {
   const loginId  = req.params.id;
   if (!loginId) {
      return res.status(400).send('login ID is required');
   }
   
   try {
      const loginItem = await Login.findOne({ loginId: loginId });
      if (!loginItem) {
         return res.status(404).send('Login item not found');
      }
      res.send({ id: loginItem._id });
   } catch (error) {
      res.status(500).send('Error searching Login item');
   }
   });


const Product = require('../models/Product');

// Create a new news item
router.post('/product', new ProductEndpoint().addProductEndpoint);


// Get all apply items
router.get('/product', async (req, res) => {
  try {
    const productItems = await Product.find();
    res.send({"statusCode":200,"code":"00","data":productItems});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a news item by ID
router.get('/product/:id', async (req, res) => {
   const productItems = await Product.findById(req.params.id);
   if (!productItems) return res.status(404).send('Product not found');
   res.send(productItems);
});

router.put('/product/:id', new ProductEndpoint().updateProductEndpoint)

// Delete a news item by ID
router.delete('/product/:id', async (req, res) => {
   const product = await Product.findByIdAndDelete(req.params.id);
   if (!product) return res.status(404).send('Product not found');
   res.send(product);
});

router.get('/product/search/:id', async (req, res) => {
   const productId  = req.params.id;
   if (!productId) {
      return res.status(400).send('params id is required');
   }
   
   try {
      const productItem = await Product.findOne({ productId: productId });
      if (!productItem) {
         return res.status(404).send( `Apply item not found ${productId}`);
      }
      res.send({ id: productItem._id });
   } catch (error) {
      res.status(500).send('Error searching apply item');
   }
   });



const Cart = require('../models/Cart');

// Add a new cart or update an existing cart
router.post('/cart', async (req, res) => {
      try {
         const { product, sizeId, branchId } = req.body;
         const cart = new Cart({ product, sizeId, branchId });
         await cart.save();
         res.status(201).send(cart);
      } catch (error) {
         console.log(error)
         res.status(400).send(error);
      }
});
   

// Get a cart by ID
router.get('/cart/:id', async (req, res) => {
   try {
       const cart = await Cart.findById(req.params.id).populate('product');
       if (!cart) {
           return res.status(404).send({ message: 'Cart not found' });
       }
       res.status(200).send(cart);
   } catch (error) {
       res.status(500).send({ message: 'Error retrieving cart', error: error.message });
   }
});

// Get a cart by ID
router.get('/cart/:id', async (req, res) => {
   try {
       const cart = await Cart.findById(req.params.id)
       if (!cart) {
           return res.status(404).send({ message: 'Cart not found' });
       }
       res.status(200).send(cart);
   } catch (error) {
       res.status(500).send({ message: 'Error retrieving cart', error: error.message });
   }
});

// Update cart items
router.patch('/cart/:cartId', async (req, res) => {
      try {
         const { items } = req.body;
         const cart = await Cart.findByIdAndUpdate(req.params.cartId, { items, updatedAt: Date.now() }, { new: true });
         if (!cart) {
            return res.status(404).send();
         }
         res.send(cart);
      } catch (error) {
         res.status(400).send(error);
      }
});

// Delete a cart
router.delete('/cart/:cartId', async (req, res) => {
      try {
         const cart = await Cart.findByIdAndDelete(req.params.cartId);
         if (!cart) {
            return res.status(404).send();
         }
         res.send(cart);
      } catch (error) {
         res.status(500).send(error);
      }
});

// Define a route that renders the EJS template
router.get('/', (req, res) => {
   res.render('login');
 });

// Define the login API endpoint
router.post('/api/login', (req, res) => {
   const { username, password } = req.body;
 
   // Perform authentication logic here
   if (username === 'admin' && password === 'password') {
     res.json({ success: true, message: 'Login successful' });
   } else {
     res.json({ success: false, message: 'Invalid credentials' });
   }
 });
 
// Define a route that renders the EJS template
router.get('/main', (req, res) => {
   res.render('main', { data: mockData });
 });

 // Mock data for usernames and passwords
const mockData = [
   { username: 'user1', password: 'password1' },
   { username: 'user2', password: 'password2' },
   { username: 'user3', password: 'password3' },
 ];

// Define a route for the report page
router.get('/report', (req, res) => {
   res.render('report');
 });

// Define an API endpoint to retrieve the mock data
router.get('/api/data', (req, res) => {
   res.json(mockData);
 });



module.exports = router;
