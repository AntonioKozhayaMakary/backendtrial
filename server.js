require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const orderRoutes = require('./routes/orders')
const path = require('path');
const cors = require('cors');


// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

//app.use(cors());

// routes
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)


//app.get('/', (req, res) => { res.send('Hello from Express!')});

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database')
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 


