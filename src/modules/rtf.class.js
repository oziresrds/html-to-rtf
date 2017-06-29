const cheerio     = require('cheerio');
const Style       = require('./style.class');
const AllowedTags = require('./allowed-tags.class');
const Table       = require('./table.class');
const MyString    = require('./my-string.class');

class Rtf {
  constructor() { 
    this.rtfHeaderOpening = "{\\rtf1\\ansi\\deff0{\\fonttbl {\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fnil\\fcharset2 Symbol;}}";
    this.rtfHeaderContent = '';
    this.rtfClosing = "}";
    this.RtfContentReferences = [];
    this.Table = new Table();
  }

  convertHtmlToRtf(html) {
    var $ = cheerio.load(html);
    let treeOfTags = $('#content').children();
    for (let i = 0; i < treeOfTags.length; i++)
      this.readAllChildsInTag(treeOfTags[i]);
    return this.buildRtf();
  }

  buildRtf() {
    this.rtfHeaderContent += Style.getRtfColorTable();
    return (this.rtfHeaderOpening + this.rtfHeaderContent + this.getRtfContentReferences() + this.rtfClosing);
  }

  getRtfContentReferences() {
    let rtfReference = '';
    let addSpaceBetweenTagAndContent = ' ';
    this.RtfContentReferences.forEach(value => {
      if(value.tag == true && value.content != undefined)
        rtfReference += (value.content).replace(/ /g, '');
      if(value.tag == false) {
        console.log('CONTEUDO=> ', MyString.remove_Enter_HorizontalTab_LineFeed(value.content));
        rtfReference += addSpaceBetweenTagAndContent + MyString.remove_Enter_HorizontalTab_LineFeed(value.content);
      }
    });
    return rtfReference;
  }

  readAllChildsInTag(fatherTag) {
    if (fatherTag.children != undefined) {
      this.addOpeningTagInRtfCode(fatherTag.name);
      this.ifExistsAttributesAddAllReferencesInRtfCode(fatherTag.attribs);

      if(fatherTag.name.toLowerCase() == 'table') {
        this.Table.setAmountOfColumns(this.getAmountOfColumnThroughOfFirstChildOfTbodyTag(fatherTag.children));
      }

      if(fatherTag.name.toLowerCase() == 'tr') {
        this.RtfContentReferences.push({ content: this.Table.buildCellsLengthOfEachColumn(), tag: true });
      }

      for (let j = 0; j < fatherTag.children.length; j++) {
        if (fatherTag.children[j].type != 'text')
          this.readAllChildsInTag(fatherTag.children[j]);
        else
          this.addContentOfTagInRtfCode(fatherTag.children[j].data);
      }
    }
    this.addClosingFatherTagInRtfCode(fatherTag.name);
  }

  getAmountOfColumnThroughOfFirstChildOfTbodyTag(tableChildren) {
    let count = 0;
    let tbodyIndex = tableChildren.findIndex(value => value.name == 'tbody');
    for(let i = 0; i < tableChildren[tbodyIndex].children.length; i++) {
      if(tableChildren[tbodyIndex].children[i].type != 'text') {
        for(let j = 0; j < tableChildren[tbodyIndex].children[i].children.length; j++) {
          if(tableChildren[tbodyIndex].children[i].children[j].type != 'text')
            count++;
        }
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
    // if(attributes.color != undefined)
    //   this.RtfContentReferences.push({ content: Style.getRtfReferenceColorByTag(attributes.color), tag: true });
  }

  addReferenceTagInRtfCode(referenceTag) {
    this.RtfContentReferences.push({ content: referenceTag, tag: true });
  }

  addOpeningTagInRtfCode(tag) {
    this.RtfContentReferences.push({ content: AllowedTags.getRtfReferenceTag(tag), tag: true });
  }

  addClosingFatherTagInRtfCode(closingFatherTag) {
    this.RtfContentReferences.push({ content: AllowedTags.getRtfReferenceTag('/' + closingFatherTag), tag: true });
  }

  addContentOfTagInRtfCode(contentOfTag) {
    let x = MyString.remove_Enter_HorizontalTab_LineFeed(contentOfTag);
    if(x[0]!= undefined)
      this.RtfContentReferences.push({ content: contentOfTag, tag: false });
  }
}
module.exports = Rtf;