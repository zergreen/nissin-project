const express = require('express');
const router = express.Router()

// ***************************************************************************************************************

const User = require('../models/User');

// Define a route that renders the EJS template
router.get('/', (req, res) => {
  res.render('login');
});

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
  // console.log(username, password);
  // console.log(name)

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

// Update a user's profile
router.put('/api/users/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, fullname, age, salary, address, quote } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user's profile
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update the profile fields
    profile.name = name ? name : profile.name;
    profile.fullname = fullname ? fullname : profile.fullname;
    profile.age = age ? age : profile.age;
    profile.salary = salary ? salary : profile.salary;
    profile.address = address ? address : profile.address;
    profile.quote = quote ? quote : profile.quote;

    // Save the updated profile
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

 // Define the route for the edit user page
 router.get('/edit-profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(userId).populate('profile');
    res.render('edit-profile', { user, profile: user.profile, session: req.session.user});
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define the update user API endpoint
router.post('/api/v2/user/:userId', async (req, res) => {
  const { userId } = req.params;
  const { username, password, role, name, fullname, age, salary, address, quote } = req.body;

  try {
    // Find the user by ID and update its details
    const user = await User.findByIdAndUpdate(
      userId,
      { username, password, role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the user's profile and update its details
    const profile = await Profile.findOneAndUpdate(
      { user: userId },
      { name, fullname, age, salary, address, quote },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.redirect('/report');
  } catch (error) {
    console.error('Error updating user and profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const Timesheet = require('../models/Timesheet');


// Create a new timesheet entry
router.post('/api/timesheets', async (req, res) => {
  try {
    const { workType, workName, startTime, endTime, status, user } = req.body;

    // console.log({workType, workName, startTime, endTime, status, user})

    const timesheet = new Timesheet({
      workType,
      workName,
      startTime,
      endTime,
      status,
      user
    });

    const savedTimesheet = await timesheet.save();
    res.status(201).json(savedTimesheet);
  } catch (error) {
    console.error('Error creating timesheet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all timesheet entries
router.get('/api/timesheets', async (req, res) => {
  try {
    const timesheets = await Timesheet.find().populate('user', 'username');
    res.json(timesheets);
  } catch (error) {
    console.error('Error retrieving timesheets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single timesheet entry by ID
router.get('/api/timesheets/:id', async (req, res) => {
  try {
    const timesheet = await Timesheet.findById(req.params.id).populate('user', 'username');
    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found' });
    }
    res.json(timesheet);
  } catch (error) {
    console.error('Error retrieving timesheet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a timesheet entry
router.post('/api/timesheets/:id', async (req, res) => {
  try {
    const { workType, workName, startTime, endTime, status } = req.body;

    const timesheet = await Timesheet.findByIdAndUpdate(
      req.params.id,
      { workType, workName, startTime, endTime, status, updatedAt: Date.now() },
      { new: true }
    );

    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found' });
    }

  //  console.log(timesheet)

    res.redirect('/timesheets');
  } catch (error) {
    console.error('Error updating timesheet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a timesheet entry
router.delete('/api/timesheets/:id', async (req, res) => {
  try {
    const timesheet = await Timesheet.findByIdAndRemove(req.params.id);
    if (!timesheet) {
      return res.status(404).json({ message: 'Timesheet not found' });
    }
    res.json({ message: 'Timesheet deleted successfully' });
  } catch (error) {
    console.error('Error deleting timesheet:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define a route for the report page
router.get('/timesheets', (req, res) => {
  res.render('timesheets', {session: req.session.user});
});

// Define the route for the edit timesheet page
router.get('/edit-timesheet/:timesheetId', async (req, res) => {
  const { timesheetId } = req.params;

  try {
    // Find the timesheet by ID
    const timesheet = await Timesheet.findById(timesheetId);
    // console.log(timesheet)
    res.render('edit-timesheet', { data: timesheet });
  } catch (error) {
    console.error('Error fetching timesheet:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Define a route for the report page
router.get('/create-timesheet/:id', (req, res) => {
  // console.log(req.params.id)
  res.render('create-timesheet', { userId: req.params.id });
});


module.exports = router;
