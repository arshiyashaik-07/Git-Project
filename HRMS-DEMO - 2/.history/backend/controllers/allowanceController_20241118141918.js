const Allowance = require('../models/allowanceModel');

// @desc Get all allowances
// @route GET /api/allowances
// @access Public
{/*const getAllowances = async (req, res) => {
  try {
    const allowances = await Allowance.find();
    res.status(200).json(allowances);
  } catch (error) {
    res.status(500).json({ message: "Error fetching allowances" });
  }
};

// @desc Create a new allowance
// @route POST /api/allowances
// @access Public
const createAllowance = async (req, res) => {
  const { code, name, amount, oneTime, taxable, fixed } = req.body;

  if (!code || !name || !amount) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  try {
    const allowance = new Allowance({ code, name, amount, oneTime, taxable, fixed });
    const savedAllowance = await allowance.save();
    res.status(201).json(savedAllowance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

*/}


exports.getAllowances = async (req, res) => {
  try {
    const allowances = await Allowance.find();
    res.status(200).json(allowances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching allowances' });
  }
};

exports.createAllowance = async (req, res) => {
  try {
    const newAllowance = new Allowance(req.body);
    await newAllowance.save();
    res.status(201).json(newAllowance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating allowance' });
  }
};

exports.updateAllowance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAllowance = await Allowance.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedAllowance) {
      return res.status(404).json({ message: 'Allowance not found' });
    }
    res.status(200).json(updatedAllowance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating allowance' });
  }
};

exports.deleteAllowance = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAllowance = await Allowance.findByIdAndDelete(id);
    if (!deletedAllowance) {
      return res.status(404).json({ message: 'Allowance not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting allowance' });
  }


module.exports = { getAllowances, createAllowance };
