const express =require('express');
const app = express();
const PORT = 3000;
const products = require('./models/products.js');

app.set('view engine', 'ejs');
// middleware
app.use(express.static('puplic'));
app.use(express.urlencoded({extended: false}));

app.use((req, res, next)=>{
    console.log(`${req.method} ${req.originalUrl}`);
    next();
})

app.get('/', (req, res)=>{
    res.send('hello world');
});

app.get('/products', (req, res)=>{
    const allProducts = products.find();
    res.render('index.ejs', {products: allProducts});
});

app.get('/products/new', (req, res)=>{
    res.render('new.ejs');
});

app.post('/products/', (req, res) =>{
    products.create(req.body, (error, createdProduct) =>{
        if(error) return console.log(error);

         console.log(createdProduct);
         return res.redirect('/products');
    })
})

app.get('/products/:productId', (req, res)=>{
    products.findById(req.params.productId, (error, foundProduct)=>{
        if(error){
            console.log(error);
            req.error = error;
            next();
           
        }
            res.render('show.ejs', {product: foundProduct});
    })
});

app.get('/*', (req, res)=>{
    return res.status(404).render('404', {error: req.error });
});


app.listen(PORT, () => 
    console.log(`listening for client requests on port${PORT}`));