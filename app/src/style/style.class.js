const cheerio   = require('cheerio');
const $         = cheerio.load('');
const Color     = require('../color/color.class');
const Alignment = require('../alignment/alignment.class');
const FontSize  = require('../font-size/font-size.class');
const AllowedStyleTags = require('../allowed-tags/allowed-style-tags.class');

class Style {
  static getRtfReferenceColor(value) {
    return Color.getRtfReferenceColor(value);
  }

  static getRtfColorTable() {
    return Color.getRtfColorTable();
  }

  static getRtfAlignmentReference(value) {
    return Alignment.getRtfAlignmentReference(value);
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
          case 'color': listOfRtfReferences       += this.getRtfReferenceColor($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
          case 'font-size': listOfRtfReferences   += this.getRtfFontSizeReference($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
          case 'text-align': listOfRtfReferences  += this.getRtfAlignmentReference($(fictitiousTagWithTruthStyle).css(value.propertyName)); break;
        }
      }
    });
    return listOfRtfReferences;
  }
}
module.exports = Style;