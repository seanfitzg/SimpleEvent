var Simple = require("./lib/simple");
var assert = require('assert');
var should = require('should');
var Commander = require('./lib/commander');

var orderCreated = function (event) {
  var order = {}
  order.productId = event.productId;
  order.unitPrice = event.unitPrice;
  order.quantity = event.quantity;
  return order;
};

var event1 = {
  productId: 324,
  quantity: 1,
  unitPrice: 79,
  type: 'orderCreated'
}

se = new Simple();
se.registerHandler(orderCreated);
var obj = se.replay([event1]);
obj.productId.should.equal(324);