'use strict';

var Simples = require("../lib/simples");
var should = require('should');
var assert = require("assert");



describe('Simples basic functions', function () {
    var events;
    var newObj;
    var es = new Simples();
    
    beforeEach(function() {
        newObj = {}
        events = [ { name: 'Sean' } ];
    });
    
    it('builds a simple object', function () {
        es.replay(newObj, events);
        newObj.name.should.equal('Sean');
    });
    
    it('does not throw an error if the events object is undefined', function () {
        events = undefined;
        es.replay(newObj, events);
    });
    
    it('throws an error if root object is undefined', function () {
        var newObj;
        assert.throws(function() {
            es.replay(newObj, events)
        }, Error);
    });
    
    it('builds an object from multiple events', function() {
        events.push({address: 'Limerick'});
        es.replay(newObj, events);
        newObj.name.should.equal('Sean');
        newObj.address.should.equal('Limerick');
    });
    
})

describe('Object built from descriptive event names', function() {

    var events;
    var newObj;
    var es = new Simples({
        usePrefix: true
    });
        
    beforeEach(function() {
        newObj = {}
        events = [ { nameChanged: 'Sean' } ];
    });  
    
    it('the usePrefix config option is true', function() {
       es.usePrefix.should.equal(true); 
    });
    
    it('uses the event name prefix as the property', function() {
        es.replay(newObj, events);
        newObj.name.should.equal('Sean');
    });
});