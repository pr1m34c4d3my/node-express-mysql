let { Product } = require("../models");

const Validator = require("fastest-validator");
const V = new Validator();

module.exports = {
  getProducts: async (req, res) => {
    const PRODUCTS = await Product.findAll({
      attributes: ["id", "name", "brand"],
    });
    res.json(PRODUCTS);
  },

  getProductById: async (req, res) => {
    const ID = req.params.id;
    const PRODUCT = await Product.findByPk(ID);

    if (!PRODUCT) {
      res.status(404).json({
        message: "Product Not Found",
      });
    } else {
      res.json(PRODUCT);
    }
  },

  createProduct: async (req, res) => {
    const SCHEMA = {
      name: "string",
      brand: "string",
      description: "string|optional",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);

    if (VALIDATE.length) {
      return res.status(400).json(VALIDATE);
    }

    const PRODUCT = await Product.create(req.body);
    res.status(200);
    res.json({
      message: "Succesfully Created",
      method: req.method,
      data: PRODUCT,
    });
  },

  updateProduct: async (req, res) => {
    const ID = req.params.id;
    let product = await Product.findByPk(ID);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    const SCHEMA = {
      name: "string|optional",
      brand: "string|optional",
      description: "string|optional",
    };

    const VALIDATE = V.validate(req.body, SCHEMA);

    if (VALIDATE.length) {
      return res.status(400).json(VALIDATE);
    }

    product = await product.update(req.body);
    res.json(product);
  },

  deleteProduct: async (req, res) => {
    const ID = req.params.id;
    const PRODUCT = await Product.findByPk(ID);

    if (!PRODUCT) {
      res.status(404).json({
        message: "Product Not Found",
      });
    }

    let deleted = await PRODUCT.destroy();
    res.status(200).json({
      message: "Product is deleted",
      status: "OK",
      method: req.method,
      data: deleted,
    });
  },
};
