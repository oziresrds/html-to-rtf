const should  = require('should');
const Color   = require('./color.class');

describe('ColorTest => Attention! <= Have a stack of dependency in each test', () => {
  describe('getRtfReferenceColor()', () => {
    it('RGB', () => {
      should(Color.getRtfReferenceColor('rgb(255,0,0)')).be.equal('\\cf1');
      should(Color.getRtfReferenceColor('rgb(255,0,0)')).be.equal('\\cf1');
      should(Color.getRtfReferenceColor('rgb(255,25,0)')).be.equal('\\cf2');
      should(Color.getRtfReferenceColor('rgb:(255,25,0);')).be.equal('\\cf2');
    });

    it('HEX', () => {
      should(Color.getRtfReferenceColor('#333')).be.equal('\\cf3');
      should(Color.getRtfReferenceColor('#333333')).be.equal('\\cf3');
      should(Color.getRtfReferenceColor('#eee')).be.equal('\\cf4');
      should(Color.getRtfReferenceColor('#333;')).be.equal('\\cf3');
    });
  });

  describe('getRgbValues()', () => {
    it('Should return an valid rgb', () => {
      should(Color.getRgbValues('rgb(255,0,0)')).be.a.Array().and.length(3);
      should(Color.getRgbValues('rgb: (255,0,0) ;')).be.a.Array().and.length(3);
    });
  });

  describe('convertColorInHexToRgb()', () => {
    it('Should return an valid rgb', () => {
      should(Color.convertColorInHexToRgb('#39c')).be.a.Array().and.length(3);
      should(Color.convertColorInHexToRgb('#39c')[0]).be.equal(51);
      should(Color.convertColorInHexToRgb('#39c')[1]).be.equal(153);
      should(Color.convertColorInHexToRgb('#39c')[2]).be.equal(204);
    });
  });

  describe('getColorInColorTable()', () => {
    it('Should return rtf reference color', () => {
      should(Color.getColorInColorTable(['255', '188', '0'])).be.equal('\\cf5');
      should(Color.getColorInColorTable(['238', '238', '238'])).be.equal('\\cf4');
      Color.co
    });
  });

  describe('verifyIfColorExistsInColorTable()', () => {
    it('Should return true or false', () => {
      should(Color.verifyIfColorExistsInColorTable(['0', '55', '55'])).be.Boolean().and.equal(false);
      should(Color.verifyIfColorExistsInColorTable(['255', '188', '0'])).be.Boolean().and.equal(true);
    });
  });

  describe('addColorInColorTable()', () => {
    before(() => Color.addColorInColorTable(['255', '255', '255']));
    it('Add color and check if was saved', () => {
      should(Color.verifyIfColorExistsInColorTable(['255', '255', '255'])).be.Boolean().and.equal(true);
    });
  });

  describe('getRtfReferenceColorInColorTable()', () => {
    it('Should return a reference already declared', () => {
      should(Color.getRtfReferenceColorInColorTable(['255', '0', '0'])).be.equal('\\cf1');
    });

    it('Reference not declared', () => {
      should(Color.getRtfReferenceColorInColorTable(['177', '15', '0'])).be.undefined();
    });
  });

  describe('getAllColorsDeclaredInColorTable()', () => {
    it('Should return a list with all colors declared in all tests', () => {
      should(Color.getAllColorsDeclaredInColorTable()).be.an.String();
      should(Color.getAllColorsDeclaredInColorTable()).be.equal(`\\red255\\green0\\blue0;\\red255\\green25\\blue0;\\red51\\green51\\blue51;\\red238\\green238\\blue238;\\red255\\green188\\blue0;\\red255\\green255\\blue255;`);
    });
  });

  describe('getRtfColorTable()', () => {
    it('Should return all colors declared with opening and closing tags of rtf', () => {
      should(Color.getRtfColorTable()).be.equal('{\\colortbl ;\\red255\\green0\\blue0;\\red255\\green25\\blue0;\\red51\\green51\\blue51;\\red238\\green238\\blue238;\\red255\\green188\\blue0;\\red255\\green255\\blue255;}');
    });
  });

});