const Customer = require('../models/customerModel')
const mongoose = require('mongoose')

// get all Customer
const getCustomers = async (req, res) => {
  const customers = await Customer.find({}).sort({ createdAt: -1 })
  res.status(200).json(customers)
}

// get a single Customer
const getCustomer = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such Customer' })
  }

  const Customer = await Customer.findById(id)

  if (!Customer) {
    return res.status(404).json({ error: 'No such Customer' })
  }

  res.status(200).json(Customer)
}




// create a new Customer
const createCustomer = async (req, res) => {
  const { CustomerName ,CustomerPhoneNumber   } = req.body

  
  // add to the database
  try {
    const customer = await Customer.create({ CustomerName ,CustomerPhoneNumber  })
    res.status(200).json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a customer
const deleteCustomer  = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such customer' })
  }

  const customer = await Customer.findOneAndDelete({ _id: id })

  if (!customer) {
    return res.status(400).json({ error: 'No such customer' })
  }

  res.status(200).json(customer)
}

// update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such customer'})
  }

  const customer = await Customer.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!customer) {
    return res.status(400).json({error: 'No such customer'})
  }

  res.status(200).json(customer)
} 

module.exports = {
    getCustomer,
    getCustomers,
    deleteCustomer,
    updateCustomer,
    createCustomer
}