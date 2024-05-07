const User = require('src/models/User');
const Profile = require('src/models/Profile');

// Create a new user
const user = new User({
  username: 'johndoe',
  password: 'password123',
  role: 'user',
});

// Create a new profile associated with the user
const profile = new Profile({
  user: user._id,
  name: 'John',
  fullname: 'John Doe',
  age: 25,
  salary: 50000,
  address: '123 Main St',
  quote: 'Life is good!',
});

// Save the user and profile
await user.save();
await profile.save();
