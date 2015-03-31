"use strict";

var Simples = function (config) {
    var _config = config || {};
    this.usePrefix = _config.usePrefix || false;
};

Simples.prototype.replay = function (obj, events) {
    if (obj === undefined) throw new Error('Root object cannot be undefined');
    if (events === undefined) return;
    
    var eventLength = events.length;
    for (var i = 0; i < eventLength; i++) {
        for (var myevent in events[i]) {
            if (this.usePrefix) {
                var eventSections = myevent.split(/(?=[A-Z])/);
                var myParsedEvent = eventSections[0];
                obj[myParsedEvent] = events[i][myevent];  
            }
            else {
                obj[myevent] = events[i][myevent];     
            }
        }
    }
};

module.exports = Simples;