var alignmentReferenceList = [
  { name: 'center',   reference: '\\qc' },
  { name: 'left',     reference: '\\ql' },
  { name: 'right',    reference: '\\qr' },
  { name: 'justify',  reference: '\\qj' }
];

class Alignment {
  static getAlignmentReferenceList(tagName) {
    let alignmentReference = '';
    alignmentReferenceList.forEach(value => {
      if(value.name == tagName.trim())
        alignmentReference = value.reference;
    });
    return alignmentReference;
  }

  static getRtfAlignmentReference(styleTag) {
    let alignTag = '', match, regex;
    if(styleTag.includes('text-align')) {
      regex = new RegExp("text-align:(.*?);", "g");
      while ((match = regex.exec(styleTag))) {
        alignTag += match[1];
      }
    }else {
      alignTag = styleTag;
    }
    return this.getAlignmentReferenceList(alignTag);
  }
}
module.exports = Alignment;