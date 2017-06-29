const cheerio   = require('cheerio');
const $         = cheerio.load('');
const Color     = require('./color.class');
const Alignment = require('./alignment.class');
const FontSize  = require('./font-size.class');
const AllowedStyleTags = require('./allowed-style-tags.class');

class Style {
  static getRtfReferenceColor(value) {
    return Color.getRtfReferenceColor(value);
  }

  static getRtfReferenceColorByTag(value) {
    return Color.getRtfReferenceColorByTag(value);
  }

  static getRtfColorTable() {
    return Color.getRtfColorTable();
  }

  static getRtfAlignmentReference(value) {
    Alignment.getRtfAlignmentReference(value);
  }

  static getRtfFontSizeReference(value) {
    return FontSize.getRtfFontSizeReference(value);
  }

  static getRtfReferencesInStyleProperty(styleValue) {
    let fictitiousTagWithTruthStyle = "<span style='"+styleValue+"'></span>";
    let listOfRtfReferences = '';
    
    AllowedStyleTags.getAllowedTags().forEach(value => {
      if($(fictitiousTagWithTruthStyle).css(value.propertyName) != undefined) {
        switch(value.propertyName) {
          case 'color': listOfRtfReferences       += Style.getRtfReferenceColorByTag($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
          case 'font-size': listOfRtfReferences   += Style.getRtfFontSizeReference($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
          case 'text-align': listOfRtfReferences  += Style.getAlignmentReferenceList($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
        }
      }
    });
    return listOfRtfReferences;
  }
}
module.exports = Style;