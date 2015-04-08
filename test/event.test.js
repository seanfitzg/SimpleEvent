'use strict';

var Simple = require('../lib/simple');
var should = require('should');
var assert = require("assert");

describe('EventStore basic functions', function () {

  var se;

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

  beforeEach(function () {
    se = new Simple();
  });

  it('an error is thrown if an event if retrieved without an event type', function () {
    var events = [{
      productId: 324,
      quantity: 1,
      unitPrice: 79
    }]

    assert.throws(function () {
      se.replay(events)
    }, /Event did not have an event type/);
  });

  it('does not throw an error if the events object is undefined', function () {
    var events = undefined;
    se.replay(events);
  });

  it('an event can be stored and an object can be retrieved', function () {

    var events = [{
      type: 'orderSubmitted',
      productId: 324,
      quantity: 1,
      unitPrice: 79
    }]

    se.registerHandler(orderSubmitted, 'orderSubmitted');
    var newObj = se.replay(events);
    newObj.productId.should.equal(324);
  });

  it('multiple events can be stored and retrieved', function () {

    var event1 = {
      productId: 324,
      quantity: 1,
      unitPrice: 79,
      type: 'orderWasSubmitted'
    }

    var event2 = {
      quantity: 2,
      type: 'quantityUpdated'
    }

    se.registerHandler(orderSubmitted, 'orderWasSubmitted');
    se.registerHandler(quantityUpdated, 'quantityUpdated');
    var obj = se.replay([event1, event2]);
    obj.productId.should.equal(324);
    obj.quantity.should.equal(2);
  });

  it('an eventHandler can be registered without a name', function () {

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

    se.registerHandler(orderSubmitted);
    se.registerHandler(quantityUpdated);
    var obj = se.replay([event1, event2]);
    obj.productId.should.equal(324);
    obj.quantity.should.equal(2);

  });

  it('an eventHandler function expression must have a name', function () {

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

    assert.throws(function () {
      se.registerHandler(orderCreated);
    }, /Event function expressions must have a name./); //
  });

});