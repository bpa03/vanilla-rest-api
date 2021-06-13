const Product = require("../models/productModel");
const { Buffer } = require("buffer");
const { getPostData } = require("../utils/utils");

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(products))
    });
    res.write(JSON.stringify(products));
    res.end();
  } catch (err) {
    console.log(err);
  }
};

async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      const body = { message: "Product not found" }
      res.writeHead(400, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(body))
      });
      res.write(JSON.stringify(body));
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(product))
      });
      res.write(JSON.stringify(product));
    }
    
    res.end();
  } catch (err) {
    console.log(err);
  }
};

async function createProduct(req, res) {
  try {
    const { title, price, description } = await getPostData(req);
    const product = {
      title,
      price,
      description
    };

    const newProduct = await Product.create(product);

    res.writeHead(201, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(newProduct))
    });
    res.end(JSON.stringify(newProduct));

  } catch (err) {
    console.log(err);
  }
};

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      const message = { message: "The product does not exists" }
      res.writeHead(400, {
        "Content-Type": "applicacion/json",
        "Content-Type": Buffer.byteLength(message)
      });
      res.write(JSON.stringify(message));
      return res.end();
    };

    const { title, description, price } = await getPostData(req);

    const productData = {
      title: title || product.title,
      price: price || product.price,
      description: description || product.description
    };

    const updProduct = await Product.update(id, productData);

    console.log(updProduct);
    
    res.writeHead(200, {
      "Content-Type": "applicacion/json",
      "Content-Type": Buffer.byteLength(JSON.stringify(updProduct))
    });
    res.write(JSON.stringify(updProduct));
    return res.end();

  } catch (err) {
    console.log(err);
  }
};

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      const body = { message: "Product not found" }
      res.writeHead(400, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(body))
      });
      res.write(JSON.stringify(body));
    } else {
      await Product.remove(id);
      const body = { message: `Product with id ${id} has been removed`}
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(JSON.stringify(body))
      });
      res.write(JSON.stringify(body));
    }
    
    res.end();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
