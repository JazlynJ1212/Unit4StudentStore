// const express = require ('express'); //imports express from the node modules
// const app = express(); //initializing express 
// const port = 4000; 
// app.use(express.json()); // lets you send json responses and accept json requests
// const cors = require("cors");
// const morgan = require("morgan");
// require('dotenv').config()

// //import product routes
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes')
// const orderItemRoutes = require('./routes/orderItemRoutes');


// app.use(cors()); 
// app.use(morgan("dev"));


// app.get('/', (req, res) => 
//     {res.send("Hello, Student!")})

// app.use("/products",productRoutes)

// app.use("/orders",orderRoutes)

// app.use("/orderItems",orderItemRoutes)

// app.listen(port, () => {
//     console.log(`Yooo Server is running on http://localhost:${port}`)
//   })

const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()); // lets you send json responses and accept json requests
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config()

// Import routes
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemRoutes = require('./routes/orderItemRoutes');

app.use(cors());
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.send("Hello, Student!")
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/order-items", orderItemRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





