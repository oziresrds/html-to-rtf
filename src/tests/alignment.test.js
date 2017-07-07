var assert = require('assert');
var Alignment = require('../modules/alignment.class');

describe('AlignmentTest', function() {
  describe('Alignments', function() {
    it('Should return rtf reference or undefined if not exists.', function() {
      console.log(Alignment.getRtfAlignmentReference());
      Alignment.getRtfAlignmentReference();
      assert.equal(2, 3);
    });
  });
});