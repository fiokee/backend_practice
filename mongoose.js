const mongoose = require('mongoose');

const Product = require('./models/products');

mongoose.connect(
    '' ).then(()=>{ //database url
        console.log('Connected to database');
    })
    
    .catch((error)=>{
        console.error('connection failed', error);
    });

const createProduct = async(req, res, next)=>{
    //create a new product instance
    try{

        const createdProduct = new Product({
            name: req.body.name,
            price: req.body.price
        });
        
        const result = await createdProduct.save();
        console.log(typeof createdProduct._id);
        res.json(result);
        
    }catch(error){
        // Handle any errors that occur during the database operation
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Failed to create product' });
    }

};

//getting product from database

const getProduct = async(req, res, next)=>{
    try{
        const newProduct = await Product.find().exec();
        res.json(newProduct);

    }catch(error){
        console.error('Error getting product:', error);
        res.status(500).json({ message: 'Failed to get product' });
    }
}

exports.createProduct = createProduct;
exports.getProduct = getProduct;