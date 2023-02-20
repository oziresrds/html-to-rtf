const should  = require('should');
const Rtf     = require('./rtf.class');
const Style   = require('../style/style.class');
const Color   = require('../color/color.class');
const fs 			= require('fs');

describe('RtfTest', () => {
  it('convertHtmlToRtf()', () => {
    var html = `
    <html>
    <head>
      <style>
        .test {
          color: rgb(20, 20, 20);
          background:#333;
        }
      </style>
    </head>
    <body>
      <h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
      <div id="content">
        <p style="color:#333; margin:5px;" class="test" align="center">text of p<b>start b <i>italic with  bold</i>final text of b</b><i>italic</i>final text of p</p>
        <p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
        <p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
        <table>
            <tbody>
              <tr>
                <td>
                  column 1
                </td>
                <td>
                  column 2
                </td>
                <td>
                  column 3
                </td>
                <td>
                  column 4
                </td>
              </tr>
              <tr>
                <td>content 1</td>
                <td>content 2<br></td>
                <td>content 3<br></td>
                <td>content 4<br></td>
              </tr>
            </tbody>
          </table>
      </div>
    </body>
  </html>`;

    let rtf = new Rtf();
    let rtfTest = fs.readFileSync(__dirname + '/rtf-test.rtf', 'utf8');

    should(rtf.convertHtmlToRtf(html)).be.equal(rtfTest);
  });

  it('convertHtmlToRtf() With stranger tag: <mytag></mytag>', () => {
    let html = `<mytag style="color:#333; margin:5px;" class="test" align="center">texto de p<b>negrito <i>italico com  negrito</i>texto final b</b><i>italico</i>texto final de p</mytag>`;
    let rtf = new Rtf();
    Color.cleanColorTable();
    should(rtf.convertHtmlToRtf(html)).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;\\red51\\green51\\blue51;}{\\pard \\cf1 \\qc texto de p{\\b negrito {\\i italico com  negrito}texto final b}{\\i italico}texto final de p\\sb70\\par}}');
  });

  it('convertHtmlToRtf() With stranger tag: <my-tag></my-tag>', () => {
    let html = `<my-tag style="color:#333; margin:5px;" class="test" align="center">My text in <b>bold<i> and italic with bold</i> text in bold</b><i> italic</i> final text</my-tag>`;
    let rtf = new Rtf();
    Color.cleanColorTable();
    should(rtf.convertHtmlToRtf(html)).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;\\red51\\green51\\blue51;}{\\pard \\cf1 \\qc My text in {\\b bold{\\i  and italic with bold} text in bold}{\\i  italic} final text\\sb70\\par}}');
  });

  for (let index = 0; index <= 5; index++) {
    const tagName = `h${ ++index }`;
    it(`convertHtmlToRtf() by <${ tagName }></${ tagName }>`, () => {
      let html = `<${ tagName }>Title <span style="color:rgb(255,0,0);">with</span> tag ${ tagName }</${ tagName }>`;
      let rtf = new Rtf();
      Color.cleanColorTable();
      should(rtf.convertHtmlToRtf(html)).be.equal(`{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;\\red255\\green0\\blue0;}{\\pard Title {\\cf1 with} tag ${ tagName }\\sb70\\par}}`);
    });
  }

  it('buildRtf()', () => {
    let rtf = new Rtf();

    Color.cleanColorTable();
    rtf.addOpeningTagInRtfCode('b');
    rtf.addContentOfTagInRtfCode('test test test test');
    rtf.addClosingFatherTagInRtfCode('b');

    should(rtf.buildRtf()).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;}{\\b test test test test}}');
  });

  it('getRtfContentReferences()', () => {
    let rtf = new Rtf();

    rtf.addOpeningTagInRtfCode('b');
    rtf.addContentOfTagInRtfCode('test test test test');
    rtf.addClosingFatherTagInRtfCode('b');

    should(rtf.getRtfContentReferences()).be.equal('{\\b test test test test}');
  });

  it('getAmountOfColumnThroughOfFirstChildOfTbodyTag()', () => {
    let rtf = new Rtf();
    let tableChildren = [
      { name: 'thead' }, 
      {
        name: 'tbody',
        children: [
          {
            type: 'tr',
            children: [
              { type: 'tag' },
              { type: 'tag' },
              { type: 'tag' },
              { type: 'text' }
            ]
          }
        ]
      }
    ];

    should(rtf.getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren)).be.equal(3);
  });

  it('ifExistsAttributesAddAllReferencesInRtfCode()', () => {
    let rtf = new Rtf();
    let atributes = {};

    atributes.style = 'background: #333; color: #333; margin: 5px; text-align: center; padding: 2px;';
    rtf.ifExistsAttributesAddAllReferencesInRtfCode(atributes);

    should(rtf.getRtfContentReferences()).be.equal('\\cf1 \\qc ');
  });

  it('addReferenceTagInRtfCode()', () => {
    let rtf = new Rtf();
    
    rtf.addOpeningTagInRtfCode('ll');
    rtf.addClosingFatherTagInRtfCode('ll');
    rtf.addOpeningTagInRtfCode('dd');
    rtf.addClosingFatherTagInRtfCode('dd');
    rtf.addOpeningTagInRtfCode('form');
    rtf.addClosingFatherTagInRtfCode('form');
    should(rtf.rtfContentReferences).be.length(0);
  });

  it('addOpeningTagInRtfCode()', () => {
    let rtf = new Rtf();
    
    rtf.addOpeningTagInRtfCode('p');
    should(rtf.rtfContentReferences[0].content).be.equal('{\\pard ');
    should(rtf.rtfContentReferences[0].tag).be.true();
  });

  it('addClosingFatherTagInRtfCode()', () => {
    let rtf = new Rtf();
    
    rtf.addClosingFatherTagInRtfCode('p');
    should(rtf.rtfContentReferences[0].content).be.equal('\\sb70\\par}');
    should(rtf.rtfContentReferences[0].tag).be.true();
  });

  it('addContentOfTagInRtfCode()', () => {
    let rtf = new Rtf();

    rtf.addContentOfTagInRtfCode('string of test');
    should(rtf.rtfContentReferences[0].content).be.equal('string of test');
    should(rtf.rtfContentReferences[0].tag).be.false();

    rtf.addContentOfTagInRtfCode('string \nof test\t');
    should(rtf.rtfContentReferences[1].content).be.equal('string of test');
    should(rtf.rtfContentReferences[1].tag).be.false();
  });

  it('swapHtmlStrangerTags()', () => {
    let rtf = new Rtf();
    let strangerTag = '<my-tag>my data</my-tag>';
    let knowedTag = '<p>my data</p>';

    Color.cleanColorTable();
    should(rtf.swapHtmlStrangerTags(strangerTag, 'p')).be.equal('<p>my data</p>');
    should(rtf.swapHtmlStrangerTags(knowedTag, 'test')).be.equal('<p>my data</p>');
  });

  it('Should encoding string correctly', () => {
    const html = `<p>comparação</p>`;
    const rtf = new Rtf();

    should(rtf.convertHtmlToRtf(html)).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;}{\\pard compara\\\'e7\\\'e3o\\sb70\\par}}');
  });

  it('Should set correct space', () => {
    const html = `<h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;My test&nbsp;&nbsp;&nbsp;paragraph</h1>`;
    const rtf = new Rtf();
    should(rtf.convertHtmlToRtf(html)).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;}{\\pard       My test   paragraph\\sb70\\par}}');
  });

  it('Should set correct space between open and close tags', () => {
    const html = `Lorem <b>IPSUM</b> dolor sit amet..`;
    const rtf = new Rtf();
    should(rtf.convertHtmlToRtf(html)).be.equal('{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}{\\colortbl ;}Lorem {\\b IPSUM} dolor sit amet..}');
  });

});