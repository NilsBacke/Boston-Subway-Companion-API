var assert = require('chai').assert;
var nearest = require('../lib/nearest.js');
describe('nearest', function() {
	it('exports handleRequest', function() {
		assert.typeOf(nearest.handleRequest, 'function');
	});
});
