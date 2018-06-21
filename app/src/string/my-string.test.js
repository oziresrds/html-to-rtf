const should    = require('should');
const MyString  = require('./my-string.class');

describe('MyStringTest', () => {
  describe('convertOneCharInHexToDec()', () => {
    let listOf_AF = ['a', 'b', 'c', 'd', 'e', 'f'];
    let listOf_09 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    listOf_AF.forEach((element, index) => {
      it(`'${ element.toUpperCase() }'`, () => should(MyString.convertOneCharInHexToDec(`${ element.toUpperCase() }`)).be.equal(index+10+''));
      it(`'${ element.toLowerCase() }'`, () => should(MyString.convertOneCharInHexToDec(`${ element.toLowerCase() }`)).be.equal(index+10+''));
    });

    listOf_09.forEach((element, index) => {
      it(`'${ element }'`, () => should(MyString.convertOneCharInHexToDec(`${ element }`)).be.equal(index+''));
    });

    it(`'g' not exists in base 16`, () => should(MyString.convertOneCharInHexToDec('g')).be.undefined());
    it(`'10' is not a char`, () => should(MyString.convertOneCharInHexToDec('10')).be.undefined());
    it(`'-1' not exists in base 16`, () => should(MyString.convertOneCharInHexToDec('-1')).be.undefined());
  });

  it('hasOnlyWhiteSpace()', () => {
    should(MyString.hasOnlyWhiteSpace('            ')).be.true();
    should(MyString.hasOnlyWhiteSpace('      test test      ')).be.false()
  });
});
