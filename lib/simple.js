"use strict";

var Simple = function (config) {
  var my_config = config || {};
  this.usePrefix = my_config.usePrefix || false;
};

Simple.prototype.commandHandlers = {};

Simple.prototype.registerHandler = function (name, fn) {
  this.commandHandlers[name] = fn;
};


Simple.prototype.replay = function (obj, events) {
  var i, eventSections, myParsedEvent;

  function assignLiteralValue(currentEvent, usePrefix) {
    var myevent;
    for (myevent in currentEvent) {
      if (currentEvent.hasOwnProperty(myevent)) {
        if (usePrefix) {
          eventSections = myevent.split(/(?=[A-Z])/);
          myParsedEvent = eventSections[0];
          obj[myParsedEvent] = currentEvent[myevent];
        } else {
          obj[myevent] = currentEvent[myevent];
        }
      }
    }
  }

  function assignValueFromFunction(currentEvent) {
    var functionName = currentEvent.event;
    this.commandHandlers[functionName].call(obj, currentEvent);
  }

  if (obj === undefined) {
    throw new Error('Root object cannot be undefined');
  }

  if (events === undefined) {
    return;
  }

  var eventLength = events.length;
  for (i = 0; i < eventLength; i = i + 1) {
    if (events[i].event !== undefined) {
      assignValueFromFunction.call(this, events[i]);
    } else {
      assignLiteralValue(events[i], this.usePrefix);
    }
  }

};


module.exports = Simple;