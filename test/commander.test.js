'use strict';

var Commander = require('../lib/commander');
var Simple = require('../lib/simple');
var should = require('should');
var assert = require("assert");

describe('Running commands', function() {
  var commander = new Commander();
  var eventStore = [];

  // it('will execute the command and save an event', function() {

  //   function SubmitAnOrder(productId, unitPrice, quantity) {

  //   }

  //   var orderSubmitted = {
  //     productId: productId,
  //     quantity: quantity,
  //     unitPrice: unitPrice
  //   };

  //   var orderSubmittedHandler = function(orderSubmitted) {
  //     var order = {};
  //     order.productId = orderSubmitted.productId;
  //     order.unitPrice = orderSubmitted.unitPrice;
  //     order.quantity = orderSubmitted.quantity;
  //     order.totalPrice = orderSubmitted.unitPrice * orderSubmitted.quantity;
  //     return order;
  //   };



  //   commander = new Commander(eventStore);
  //   commander.registerCommand(SubmitAnOrder);

  //   commander.SubmitAnOrder(324, 79, 1);

  //   var order = {};
  //   var se = new Simple();
  //   se.replay(order, eventStore);
  //   order.productId.should.equal(324);
  //   order.quantity.should.equal(1);
  //   order.totalPrice.should.equal(79);

  // });

});