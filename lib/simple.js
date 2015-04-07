  "use strict";

var Simple = function (config) {
  var my_config = config || {};
  this.usePrefix = my_config.usePrefix || false;
};

Simple.prototype.commandHandlers = {};

Simple.prototype.registerHandler = function (evt, evtHandler) {
  this.commandHandlers[evt] = evtHandler;
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
    // var functionName;
    // if (currentEvent.type) {
    //   evtHandler = ;
    // } else {
    //   functionName = currentEvent.command;
    // }
    obj = this.commandHandlers[currentEvent.type].call(currentEvent);
  }

  if (obj === undefined) {
    throw new Error('Root object cannot be undefined');
  }

  if (events === undefined) {
    return;
  }

  var eventLength = events.length;
  for (i = 0; i < eventLength; i = i + 1) {
    if (events[i].type) {
      assignValueFromFunction.call(this, events[i]);
    } else {
      assignLiteralValue(events[i], this.usePrefix);
    }
  }

};


module.exports = Simple;