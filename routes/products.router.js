const express = require('express');
const ProductsService = require('./../services/product.service');
const validateHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('./../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get(
  '/:id',
  validateHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  validateHandler(createProductSchema, 'body'),
  async (req, res) => {
    const { body: product } = req;
    const newProduct = await service.create(product);
    res.status(201).json(newProduct);
  }
);

router.put(
  '/:id',
  validateHandler(getProductSchema, 'params'),
  validateHandler(updateProductSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const { body: product } = req;
    const updatedProduct = await service.update(id, product);
    res.json(updatedProduct);
  }
);

router.patch(
  '/:id',
  validateHandler(getProductSchema, 'params'),
  validateHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body: product } = req;
      const updatedProduct = await service.update(id, product);
      res.json(updatedProduct);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  validateHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await service.delete(id);
    res.json(deletedProduct);
  }
);

module.exports = router;
