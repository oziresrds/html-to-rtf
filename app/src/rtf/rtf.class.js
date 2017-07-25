const cheerio         = require('cheerio');
const Style           = require('../style/style.class');
const AllowedHtmlTags = require('../allowed-html-tags/allowed-html-tags.class');
const Table           = require('../table/table.class');
const MyString        = require('../string/my-string.class');
const juice 		      = require('juice');
const fs 				      = require('fs');

class Rtf {
  constructor() { 
    this.rtfHeaderOpening = "{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}";
    this.rtfHeaderContent = '';
    this.rtfClosing = "}";
    this.rtfContentReferences = [];
    this.Table = new Table();
  }

  convertHtmlToRtf(html) {
    let $ = cheerio.load(juice(html));
    let treeOfTags = $('html').children();

    Array.from(treeOfTags).forEach(tag => this.readAllChildsInTag(tag));
    return this.buildRtf();
  }

  buildRtf() {
    this.rtfHeaderContent += Style.getRtfColorTable();
    return (this.rtfHeaderOpening + this.rtfHeaderContent + this.getRtfContentReferences() + this.rtfClosing);
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
    if(referenceTag != undefined)
      this.rtfContentReferences.push({ content: referenceTag, tag: true });
  }

  addOpeningTagInRtfCode(tag) {
    this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(tag));
  }

  addClosingFatherTagInRtfCode(closingFatherTag) {
    this.addReferenceTagInRtfCode(AllowedHtmlTags.getRtfReferenceTag(`/${ closingFatherTag }`));
  }

  addContentOfTagInRtfCode(contentOfTag) {
    contentOfTag = MyString.removeCharacterOfEscapeInAllString(contentOfTag, '\n\t');
   
    if(contentOfTag != undefined && !MyString.hasOnlyWhiteSpace(contentOfTag))
      this.rtfContentReferences.push({ content: this.addSpaceAroundString(contentOfTag.trim()), tag: false });
  }

  addSpaceAroundString(contentOfTag) {
    return ` ${ contentOfTag } `;
  }

  // Don't has a test
  saveInFolderFiles(rtfCode) {
    fs.writeFile('./../../files/current.rtf', rtfCode, (err) => {
      if (err) 
        console.log('The file does not saved.');

      console.log('The file has been saved! => files/current.rtf');
    });
  }

}
module.exports = Rtf;