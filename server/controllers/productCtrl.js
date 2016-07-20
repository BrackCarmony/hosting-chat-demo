
const products = require('../json/products.json');
const _ = require('lodash');

module.exports = function(app){

  app.get('/products', function(req, res, next) {
    res.status(200).send(products)
  })

  app.get('/products/:id', function(req, res, next) {
    let target = _.find(products, product => {
      return product.id === req.params.id;
    });
    if (target) {
      return res.status(200).send(target);
    } else {
      return res.status(404).send({message: "Item not found!"})
    }
    return res.sendStatus(500);
  })
}
