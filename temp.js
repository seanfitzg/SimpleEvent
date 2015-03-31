var Simples = require("./lib/simples");
var assert = require('assert');

var events = [ { nameUpdated: 'Sean' }, 
                { ageAdded: 17 } ];

var es = new Simples({
        usePrefix: true
    });

var newObj = {};
es.replay(newObj, events);
assert.equal(newObj.name, 'Sean');