const { User } = require('../models');

// Create User
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // console.log(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    console.log('Updating User');
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Sign In User
exports.signIn = async (req, res) => {
    
    try {
        const { email, password} = req.body;
        if(!req.body.email || !req.body.password){
            return res.status(400).json({ error: 'Please provide email and password' });
        }
        const user = await User.findOne({ where: {email} });
        if(req.body.email === user.email) {
            // const validPassword = await user.validatePassword(req.body.password);
            if(req.body.password === user.password) {
                return res.status(201).json({ success: true });
            } else {
                return res.status(401).json({ error: 'Invalid password' });
            }
        }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
