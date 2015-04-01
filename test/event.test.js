'use strict';

var Simple = require("../lib/simple");
var should = require('should');
var assert = require("assert");

describe('SimpleEvent basic functions', function () {
  var events, newObj, se;

  beforeEach(function() {
    se = new Simple();
    newObj = {}
    events = [ { name: 'Sean' } ];
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
    assert.throws(function() {
      se.replay(newObj, events)
    }, Error);
  });

  it('builds an object from multiple events', function() {
    events.push({address: 'Limerick'});
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

describe('Object built from descriptive event names', function() {

  var events, newObj, se;

  beforeEach(function() {
    se = new Simple({
      usePrefix: true
    });
    newObj = {}
    events = [ { nameChanged: 'Sean' } ];
  });  

  it('the usePrefix config option is true', function() {
   se.usePrefix.should.equal(true); 
 });

  it('uses the event name prefix as the property', function() {
    se.replay(newObj, events);
    newObj.name.should.equal('Sean');
  });
});

describe('Events can be linked to functions', function () {

  var events, newObj, se;

  beforeEach(function() {
    se = new Simple();
    newObj = {}
  });  

  it('a function will run when an event is raised', function () {

    var events = [ { productId: 321, event: "orderSubmitted" } ] 
    var SubmitAnOrder = function (event) {
        this.productId = event.productId;
    };

    se.registerHandler('orderSubmitted', SubmitAnOrder);
    se.replay(newObj, events);
    newObj.productId.should.equal(321);
  });

  it('multiple events will be processed', function () {

    var event1 = { productId: 321, event: "orderSubmitted" }
    var SubmitAnOrder = function (event) {
        this.productId = event.productId;
    };

    var event2 = { productId: 324, event: "orderUpdated" } 
    var UpdateOrder = function (event) {
        this.productId = event.productId;
    };

    se.registerHandler('orderSubmitted', SubmitAnOrder);
    se.registerHandler('orderUpdated', UpdateOrder);
    se.replay(newObj, [event1, event2] );
    newObj.productId.should.equal(324);
  });

});