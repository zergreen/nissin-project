const express = require('express');
const router = express.Router()

const { NewsEndpoint } = require('../service/news/endpoint');
const { ApplyEndpoint } = require('../service/apply/endpoint');
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

// // Define the login API endpoint
// router.post('/api/login', (req, res) => {
//    const { username, password } = req.body;
 
//    // Perform authentication logic here
//    if (username === 'admin' && password === 'password') {
//      res.json({ success: true, message: 'Login successful' });
//    } else {
//      res.json({ success: false, message: 'Invalid credentials' });
//    }
//  });

// ***************************************************************************************************************

const User = require('../models/User');

// Define the login API endpoint
router.post('/api/login', async (req, res) => {
   const { username, password } = req.body;
   // console.log(username, password);
 
   try {
     // Find the user with the matching username and password
     const user = await User.findOne({ username: username, password: password });
   //   console.log(user);
 
     if (user) {
       // Create a session and store user information
       req.session.user = {
         _id: user._id,
         username: user.username,
         role: user.role
       };
       res.json({ success: true, message: 'Login successful' });
     } else {
       res.json({ success: false, message: 'Invalid username or password' });
     }
   } catch (error) {
     console.error('Error during login:', error);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
 });
 
 

 // Get all news items
 router.get('/api/user', async (req, res) => {
   const newsItems = await User.find({});
   res.send({"statusCode":200,"code":"00","data":newsItems});
   
});

// // Define the registration API endpoint
// router.post('/api/register', async (req, res) => {
//    const { username, password } = req.body;
//    console.log(username, password);
 
//    const newUser = new User({
//       username: username,
//       password: password,
//     });
//        // Save the new user to the database
//        await newUser.save()

//        return res.status(201).send(newUser);
     
   
//  });

// Define the registration API endpoint
router.post('/api/v1/register', async (req, res) => {
   const { username, password } = req.body;
   console.log(username, password);
 
   try {
     // Check if the username already exists
     const existingUser = await User.findOne({ username: username });
 
     if (existingUser) {
       return res.status(409).json({ message: 'Username already exists' });
     }
 
     // Create a new user
     const newUser = new User({
       username: username,
       password: password,
       role: 'user',
     });
 
     // Save the new user to the database
     await newUser.save();
 
     return res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
     console.error('Error during registration:', error);
     return res.status(500).json({ message: 'Internal server error' });
   }
 });

// Define the registration API endpoint
router.post('/api/register', async (req, res) => {
  const { username, password, name, fullname, age, salary, address, quote } = req.body;
  console.log(username, password);
  console.log(name)

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create a new user
    const newUser = new User({
      username: username,
      password: password,
      role: 'user',
    });

    // Create a new profile associated with the user
    const newProfile = new Profile({
      user: newUser._id,
      name: name,
      fullname: fullname,
      age: age,
      salary: salary,
      address: address,
      quote: quote,
    });

    // Save the new profile to the database
    await newProfile.save();

    // Assign the profile reference to the user's profile field
    newUser.profile = newProfile._id;

    // Save the new user to the database
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Define the API endpoint to get _id by username
router.get('/api/user/:username/id', async (req, res) => {
   const { username } = req.params;
 
   try {
     // Find the user by username
     const user = await User.findOne({ username: username });
 
     if (!user) {
       return res.status(404).json({ message: 'User not found' });
     }
 
     // Return the _id of the user
     return res.status(200).json({ _id: user._id });
   } catch (error) {
     console.error('Error retrieving user ID:', error);
     return res.status(500).json({ message: 'Internal server error' });
   }
 });
 
 
 
// Define a route that renders the EJS template
router.get('/v2/main', async (req, res) => {
   try {
     const response = await fetch('http://localhost:3000/api/user');
     const data = await response.json();
     console.log(data);
     res.render('main', { data: data.data });
   } catch (error) {
     console.error('Error fetching data:', error);
     res.status(500).send('Internal Server Error');
   }
 });

 // Define a route that renders the EJS template
router.get('/v1/main', async (req, res) => {
   // const newsItems = await User.find({});
   const newsItems = await User.find({});
   console.log(newsItems)
   res.render('main', { data: newsItems });
 });

 // Define a route that renders the EJS template
router.get('/main', async (req, res) => {
   if (req.session.user) {
     try {
       const response = await fetch('http://localhost:3000/api/user');
       const data = await response.json();
      //  console.log(data);
      //  console.log(req.session.user)
       res.render('main', { data: data.data, user: req.session.user });
     } catch (error) {
       console.error('Error fetching data:', error);
       res.status(500).send('Internal Server Error');
     }
   } else {
     res.redirect('/login'); // Redirect to login page if not authenticated
   }
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

router.get('/register', (req, res) => {
   res.render('register');
 });

// Define an API endpoint to retrieve the mock data
router.get('/api/data', (req, res) => {
   res.json(mockData);
 });

 // Define the delete user API endpoint
router.delete('/api/user/:userId', async (req, res) => {
   const { userId } = req.params;
 
   try {
     // Find the user by ID and remove it from the database
     await User.findByIdAndRemove(userId);
     res.sendStatus(200);
   } catch (error) {
     console.error('Error deleting user:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
 });
 

 // Define the route for the edit user page
router.get('/edit-user/:userId', async (req, res) => {
   const { userId } = req.params;
 
   try {
     // Find the user by ID
     const user = await User.findById(userId);
     res.render('edit-user', { user });
   } catch (error) {
     console.error('Error fetching user:', error);
     res.status(500).send('Internal Server Error');
   }
 });
 

// Define the update user API endpoint
router.post('/api/user/:userId', async (req, res) => {
   const { userId } = req.params;
   const { username, password, role } = req.body;

   // console.log(username, password, role, userId)
 
   try {
     // Find the user by ID and update its details
     const user = await User.findByIdAndUpdate(
       userId,
       { username, password, role },
       { new: true }
     );
     res.redirect('/report');
   } catch (error) {
     console.error('Error updating user:', error);
     res.status(500).json({ message: 'Internal server error' });
   }
 });

const Profile = require('../models/Profile');

// Create a new profile
router.post('/api/profiles', async (req, res) => {
  try {
    const { userId, name, fullname, age, salary, address, quote } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new profile
    const profile = new Profile({
      user: userId,
      name,
      fullname,
      age,
      salary,
      address,
      quote,
    });

    // Save the profile
    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all profiles
router.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', 'username');
    // const profiles = await Profile.find()
    res.json(profiles);
  } catch (error) {
    console.error('Error retrieving profiles:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a profile by user ID
router.get('/api/profiles/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate('profile');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = user.profile;
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single profile by ID
router.get('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate('user', 'username');
    // const profile = await Profile.findById(req.params.id)
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Error retrieving profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a profile
router.put('/api/profiles/:id', async (req, res) => {
  try {
    const { name, fullname, age, salary, address, quote } = req.body;

    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, fullname, age, salary, address, quote },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a profile
router.delete('/api/profiles/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndRemove(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a user by ID and populate the profile
router.get('/api/users/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate the profile
    const user = await User.findById(userId).populate('profile');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports = router;
