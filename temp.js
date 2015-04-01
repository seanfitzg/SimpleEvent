var Simple = require("./lib/simple");
var assert = require('assert');

var se = new Simple();
var newObj = {}

var events = [ { productId: 123, quantity: 2, event: "submitAnOrder" } ]    
var submitAnOrder = function (productId, quantity) {

};


se.registerHandler('submitAnOrder', submitAnOrder);
se.replay(newObj, events);
newObj.productId.should.equal(123);
newObj.quantity.should.equal(2);