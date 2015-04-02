var Simple = require("./lib/simple");
var assert = require('assert');
var should = require('should');

var se = new Simple();
var newObj = {}


function SubmitAnOrder(event) {
  this.productId = event.productId;
  this.unitPrice = event.unitPrice;
  this.quantity = event.quantity;
};

function UpdateOrderQuantity(event) {;
  this.quantity = event.quantity;
  this.getTotalPrice = function(argument) {
    return this.unitPrice * this.quantity;
  };
};

var event1 = {
  productId: 324,
  quantity: 1,
  unitPrice: 79,
  command: SubmitAnOrder
}

var event2 = {
  quantity: 2,
  command: SubmitAnOrder
}

se.registerHandler(SubmitAnOrder);
se.registerHandler(UpdateOrderQuantity);
se.replay(newObj, [event1, event2]);
newObj.productId.should.equal(324);
newObj.totalPrice().should.equal(158);