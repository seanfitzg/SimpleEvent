"use strict";

var Simple = function () {
  this.commandHandlers = [];
};

Simple.prototype.registerHandler = function (evtHandler, evtName) {
  if (evtName) {
    this.commandHandlers[evtName] = evtHandler;
  } else {
    this.commandHandlers[evtHandler.name] = evtHandler;
  }
};


Simple.prototype.replay = function (events) {
  var i, eventSections, myParsedEvent, obj;

  if (events === undefined) {
    return;
  }

  var eventLength = events.length;
  for (i = 0; i < eventLength; i = i + 1) {
    if (events[i].type) {
      obj = this.commandHandlers[events[i].type](events[i], obj);
    } else {
      throw new Error('event did not have an event type.')
    }
  }

  return obj;

};


module.exports = Simple;