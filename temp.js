var Simple = require("./lib/simple");
var assert = require('assert');

var se = new Simple();
var newObj = {}

    var event1 = { productId: 321, event: "orderSubmitted" }
    var submitAnOrder = function (event) {
        this.productId = event.productId;
    };

    var event2 = { productId: 324, event: "orderUpdated" }
    var updateOrder = function (event) {
        this.productId = event.productId;
    };

    se.registerHandler('orderSubmitted', submitAnOrder);
    se.registerHandler('orderUpdated', updateOrder);
    se.replay(newObj, [event1, event2] );

newObj.productId.should.equal(123);
newObj.quantity.should.equal(2);