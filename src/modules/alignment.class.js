var alignmentReferenceList = [
  { name: 'center',   reference: '\\qc' },
  { name: 'left',     reference: '\\ql' },
  { name: 'right',    reference: '\\qr' },
  { name: 'justify',  reference: '\\qj' }
];

class Alignment {
  static getRtfAlignmentReference(propertyName) {
    console.log('RECEBI=> ', propertyName);
    let alignmentReference = '';
    alignmentReferenceList.forEach(value => {
      if(value.name == propertyName.trim())
        alignmentReference = value.reference;
    });
    console.log('RETURN=> ', alignmentReference);
    return alignmentReference;
  }
}
module.exports = Alignment;