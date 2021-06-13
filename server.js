const http = require("http");
const { Buffer } = require("buffer");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    getProduct(req, res, id);
  } else if (req.url === "/api/products/" && req.method === "POST") {
    createProduct(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "PUT") {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    const body = { message: "Not found" };
    res.writeHead(404, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(JSON.stringify(body)),
    });
    res.write(JSON.stringify(body));
    res.end();
  }
});

server.listen(PORT, () => {
  console.log("Server on port", PORT);
});
