const MongoClient = require('mongodb').MongoClient;

const url = '' // database url here

const createProduct = async (req, res, next)=>{
    
const newProduct = {
    name: req.body.name,
    price: req.body.price
};

const client = new MongoClient(url);

try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('products').insertOne(newProduct);
  
} catch (error) {
    return res.json({message: 'we could not store data'});
};

client.close();
res.json({newProduct});
};

//getting products from database
const getProduct = async (req, res, next)=>{
const client = new MongoClient(url);

let product;

try{
    await client.connect();
    const db = client.db();
    product = await db.collection('products').find().toArray();

}catch(error){
 res.json({message: 'could not retrieved data'})
}
client.close();
res.json({product})
};

exports. createProduct = createProduct;
exports.getProduct = getProduct;