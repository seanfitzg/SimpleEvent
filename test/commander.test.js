'use strict';

var Commander = require("../lib/commander");
var should = require('should');
var assert = require("assert");

describe('Running commands', function() {
  var commander = new Commander();
  var eventStore = [];

  it('will execute the command and save an event', function() {
    var SubmitAnOrder = function(orderId, quantity) {
      this.orderId = orderId;
      this.quantity = quantity;
    };

    var command = new SubmitAnOrder('123', 1);

  });
});