const express = require('express');
const app = express();
// db
const products= require('./models/products.js');
//  variables
const PORT = 3000;

//  set our app need to make sure if its views or view 

app.set('view engine', 'ejs')
//   i might need this to make ejs work dont know yet 
// app.engine('ejs', require('ejs').__express);

// middleware 
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use((req, res, next) => {    
  // console.log("I'm running for another new route")
// console.log(`${req.method} ${req.originalUrl}`);    
next();
});

// product index route

app.get('/products', (req, res) => {
  const allProducts = products.find();
  const items = {products: allProducts};

  res.render('index.ejs', items);
});

// product show route
app.get('/products/:id', (req, res) => {
  res.send(products[req.params.id]);
});

// product create route
app.post('/products', (req, res) => {
  console.log('CREATE route accessed');
  console.log('Data within req.body: ', req.body);
  products.push(req.body);
  res.redirect('/products');
});

app.get('/products/new', (req, res) =>{
  res.render('new.ejs')
})

// this route will catch GET requests to /products/index/ and respond with a single product
app.get('/products/:productId', (req, res) => {
    
  products.findById(req.params.productId, (error, foundProduct) => {
      if (error) {
          console.log(error);
          req.error = error;
          return next();
      }
      /* 
      1. the first param of render() is the .ejs file 
      that we want to inject data into.
      
      2. the second param is the data that we want 
      to inject into the .ejs file (it must be an object)
      */

      /*	
      there will be a variable available inside
      the show.ejs file called product, 
      and its value the foundItem
     */
      res.render('show.ejs', {product: foundProduct});
  });
  
});

app.get("/*", (req, res) => {
  const context = { error: req.error };
  return res.status(404).render("404", context);
});

app.listen(PORT, () => {
  console.log("App is running on port: ", PORT);
});


