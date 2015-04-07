var Simple = require("./lib/simple");
var assert = require('assert');
var should = require('should');
var Commander = require('./lib/commander');

var se1 = new Simple();
se1.registerHandler(orderSubmitted, 'orderSubmitted');

function orderSubmitted(event) {
  var order = {}
  order.productId = event.productId;
  order.unitPrice = event.unitPrice;
  order.quantity = event.quantity;
  return order;
};

function quantityUpdated(event, order) {;
  order.quantity = event.quantity;
  return order;
};

var event1 = {
  productId: 324,
  quantity: 1,
  unitPrice: 79,
  type: 'orderSubmitted'
}

var event2 = {
  quantity: 2,
  type: 'quantityUpdated'
}

se = new Simple();
se.registerHandler(orderSubmitted, 'orderSubmitted');
se.registerHandler(quantityUpdated, 'quantityUpdated');
var obj = se.replay([event1, event2]);
obj.productId.should.equal(324);
obj.quantity.should.equal(2);