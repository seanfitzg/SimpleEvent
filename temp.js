var Simple = require("./lib/simple");
var assert = require('assert');
var should = require('should');
var Commander = require('./lib/commander');

var se = new Simple();
var newObj = {}


function SubmitAnOrder(event) {
  this.productId = event.productId;
  this.unitPrice = event.unitPrice;
  this.quantity = event.quantity;
};

var orderSubmitted = [{
  productId: 324,
  quantity: 1,
  unitPrice: 79,
  command: SubmitAnOrder
}];

var eventStore = []
commander = new Commander(eventStore);

commander.execute(SubmitAnOrder, orderSubmitted);

eventStore[0].productId.should.equal('123');
eventStore[0].quantity.should.equal(1);
msg.should.equal('message was saved');