"use strict";

var Commander = function(eventStore) {
  this.eventStore = eventStore;
  this.eventRegistry = [];
};

Commander.prototype.registerCommand = function(command) {
  this['SubmitAnOrder'] = command;
  this.eventRegistry.push[command];
};

Commander.prototype.execute = function(cmd, evt) {
  var obj = new cmd(evt);
  this.eventStore.push(evt);
};

module.exports = Commander;