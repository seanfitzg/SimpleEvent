'use strict';

var Simple = require("../lib/simple");
var should = require('should');
var assert = require("assert");

describe('SimpleEvent basic functions', function () {
  var events, newObj, se;

  beforeEach(function () {
    se = new Simple();
    newObj = {}
    events = [{
      name: 'Sean'
    }];
  });

  it('builds a simple object', function () {
    se.replay(newObj, events);
    newObj.name.should.equal('Sean');
  });

  it('does not throw an error if the events object is undefined', function () {
    events = undefined;
    se.replay(newObj, events);
  });

  it('throws an error if root object is undefined', function () {
    var newObj;
    assert.throws(function () {
      se.replay(newObj, events)
    }, Error);
  });

  it('builds an object from multiple events', function () {
    events.push({
      address: 'Limerick'
    });
    se.replay(newObj, events);
    newObj.name.should.equal('Sean');
    newObj.address.should.equal('Limerick');
  });

  it('builds an object from an event with multiple properties', function () {
    events[0].age = 41;
    se.replay(newObj, events);
    newObj.name.should.equal('Sean');
    newObj.age.should.equal(41);
  })
})

describe('Object built from descriptive event names', function () {

  var events, newObj, se;

  beforeEach(function () {
    se = new Simple({
      usePrefix: true
    });
    newObj = {}
    events = [{
      nameChanged: 'Sean'
    }];
  });

  it('the usePrefix config option is true', function () {
    se.usePrefix.should.equal(true);
  });

  it('uses the event name prefix as the property', function () {
    se.replay(newObj, events);
    newObj.name.should.equal('Sean');
  });
});

describe('Events can be linked to functions', function () {

  var events, newObj, se;

  function SubmitAnOrder(event) {
    this.productId = event.productId;
    this.unitPrice = event.unitPrice;
    this.quantity = event.quantity;
  };

  function UpdateOrderQuantity(event) {;
    this.quantity = event.quantity;
    this.getTotalPrice = function (argument) {
      return this.unitPrice * this.quantity;
    };
  };

  beforeEach(function () {
    se = new Simple();
    newObj = {}
  });

  it('registers a command as a function statement', function () {

  });

  it('registers a command as a named function expression', function () {

  });

  it('registers a command using the name parameter', function () {

  });

  it('throws an error when a function expression without a name, ignores the name parameter', function () {

  });

  it('a function will run when an event is raised', function () {

    var events = [{
      productId: 324,
      quantity: 1,
      unitPrice: 79,
      command: SubmitAnOrder
    }]

    se.registerHandler(SubmitAnOrder);
    se.replay(newObj, events);
    newObj.productId.should.equal(324);
  });

  it('multiple events will be processed', function () {

    var event1 = {
      productId: 324,
      quantity: 1,
      unitPrice: 79,
      command: SubmitAnOrder
    }

    var event2 = {
      quantity: 2,
      command: UpdateOrderQuantity
    }

    se.registerHandler(SubmitAnOrder);
    se.registerHandler(UpdateOrderQuantity);
    se.replay(newObj, [event1, event2]);
    newObj.productId.should.equal(324);
    newObj.getTotalPrice().should.equal(158);
  });

});