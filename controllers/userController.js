const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET all users (admin only)
exports.getAll = async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(403).json({success:false,message:'Admin only'});
    const users = await User.find().select('-password').sort({createdAt:-1});
    res.json({success:true,data:users});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

// UPDATE user (admin only)
exports.update = async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(403).json({success:false,message:'Admin only'});
    const {name, email, role, isActive, password} = req.body;
    const update = {name, email, role, isActive};
    if (password && password.length >= 6) {
      update.password = await bcrypt.hash(password, 12);
    }
    const user = await User.findByIdAndUpdate(req.params.id, update, {new:true}).select('-password');
    if (!user) return res.status(404).json({success:false,message:'User not found'});
    res.json({success:true,data:user});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};

// DELETE user (admin only)
exports.remove = async (req, res) => {
  try {
    if (req.userRole !== 'admin') return res.status(403).json({success:false,message:'Admin only'});
    if (req.params.id === req.userId) return res.status(400).json({success:false,message:'Cannot delete yourself'});
    await User.findByIdAndDelete(req.params.id);
    res.json({success:true,message:'User deleted'});
  } catch(e){res.status(500).json({success:false,message:e.message});}
};
