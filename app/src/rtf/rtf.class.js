const cheerio         = require('cheerio');
const Style           = require('../style/style.class');
const AllowedHtmlTags = require('../allowed-html-tags/allowed-html-tags.class');
const Table           = require('../table/table.class');
const MyString        = require('../string/my-string.class');
const juice 		      = require('juice');
const fs 				      = require('fs');
const Character       = require('./character.class');

class Rtf {
  constructor() {
    this.rtfHeaderOpening = "{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}";
    this.rtfHeaderContent = '';
    this.rtfClosing = "}";
    this.rtfContentReferences = [];
    this.Table = new Table();
  }

  convertHtmlToRtf(html) {
    let htmlWithoutStrangerTags, $, treeOfTags;

    html = html.replace(/&nbsp;/gi, '<html-space>');
    htmlWithoutStrangerTags = this.swapHtmlStrangerTags(html, 'p');
    $ = cheerio.load(juice(htmlWithoutStrangerTags));
    treeOfTags = $('html').children();

    Array.from(treeOfTags).forEach(tag => this.readAllChildsInTag(tag));
    return this.buildRtf();
  }

  swapHtmlStrangerTags(html, dafaultTag) {
    return html.replace(/<(\/?[a-z-_]+[a-z0-9-_]*)( *[^>]*)?>/gi, (match, tagName, options) => {
      let newTag = !tagName.includes('/') ? `<${ dafaultTag }${ options ? options : '' }>` : `</${ dafaultTag }>`;
      return AllowedHtmlTags.isKnowedTag(tagName) ? match : `${ newTag }`;
    });
  }

  buildRtf() {
    this.rtfHeaderContent += Style.getRtfColorTable();
    let content = (this.rtfHeaderOpening + this.rtfHeaderContent + this.getRtfContentReferences() + this.rtfClosing);
    this.clearCacheContent();
    return content;
  }

  getRtfContentReferences() {
    let rtfReference = '';
    this.rtfContentReferences.forEach(value => rtfReference += value.content);
    return rtfReference;
  }

  // Don't has a test
  readAllChildsInTag(fatherTag) {
    if (fatherTag.children != undefined) {
      this.addOpeningTagInRtfCode(fatherTag.name);
      this.ifExistsAttributesAddAllReferencesInRtfCode(fatherTag.attribs);

      if(fatherTag.name.toLowerCase() == 'table')
        this.Table.setAmountOfColumns(this.getAmountOfColumnThroughOfFirstChildOfTbodyTag(fatherTag.children));

      if(fatherTag.name.toLowerCase() == 'tr')
        this.addReferenceTagInRtfCode(this.Table.buildCellsLengthOfEachColumn());

      if(fatherTag.name.toLowerCase() == 'mark')
        this.setHighlightInRtf();

      (fatherTag.children).forEach((child, index) => {
        if (child.type != 'text')
          this.readAllChildsInTag(child);
        else
          this.addContentOfTagInRtfCode(child.data);
      });
    }
    this.addClosingFatherTagInRtfCode(fatherTag.name);
  }

  getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren) {
    let count = 0;
    let tbodyIndex = tableChildren.findIndex(value => value.name == 'tbody');
    for(let i = 0; i < tableChildren[tbodyIndex].children.length; i++) {
      if(tableChildren[tbodyIndex].children[i].type != 'text') {
        (tableChildren[tbodyIndex].children[i].children).forEach((child, index) => {
          if(child.type != 'text')
            count++;
        });
        break;
      }
    }
    return count;
  }

  ifExistsAttributesAddAllReferencesInRtfCode(attributes) {
    if(attributes.style != undefined)
      this.addReferenceTagInRtfCode(Style.getRtfReferencesInStyleProperty(attributes.style));
    if(attributes.align != undefined)
      this.addReferenceTagInRtfCode(Style.getRtfAlignmentReference(attributes.align));
  }

  addReferenceTagInRtfCode(referenceTag) {
    if(referenceTag != undefined) {
      const space = referenceTag.includes('\\cf') ? '' : '';
      this.rtfContentReferences.push({ content: referenceTag + space, tag: true });
    }
  }

  addOpeningTagInRtfCode(tag) {
    let value = AllowedHtmlTags.getRtfReferenceTag(tag);
    let space = '';
    
    if (value) {
      if (value === ' ') {
        space = '';
      }
      else if (value === '{') {
        space = '';
      }
      else {
        space = ' ';
      }

      this.addReferenceTagInRtfCode(value + space);
    }
  }

  addClosingFatherTagInRtfCode(closingFatherTag) {
    this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(`/${ closingFatherTag }`));
  }

  addContentOfTagInRtfCode(contentOfTag) {
    contentOfTag = MyString.removeCharacterOfEscapeInAllString(contentOfTag, '\n\t');
    contentOfTag = Character.asciiToRtfScape(contentOfTag);

    if(contentOfTag != undefined && !MyString.hasOnlyWhiteSpace(contentOfTag))
      this.rtfContentReferences.push({ content: contentOfTag, tag: false });
  }

  setHighlightInRtf() {
    let rtfReferenceColor = Style.getRtfReferenceColor('rgb(255, 255, 0)');
    let referenceColorNumber = rtfReferenceColor.match(/[0-9]+/);
    this.addReferenceTagInRtfCode('\\highlight' + referenceColorNumber.toString());
  }

  saveRtfInFile(path, value) {
    fs.writeFile(path, value, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  }

  clearCacheContent() {
    this.rtfHeaderContent = '';
    this.rtfContentReferences = [];
  }

}
module.exports = Rtf;
