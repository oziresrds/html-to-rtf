var alignmentReferenceList = [
  { name: 'center',   reference: '\\qc ' },
  { name: 'left',     reference: '\\ql ' },
  { name: 'right',    reference: '\\qr ' },
  { name: 'justify',  reference: '\\qj ' }
];

function getAlignmentReferenceList(tagName) {
  let alignmentReference = '';
  alignmentReferenceList.forEach(value => {
    if(value.name == tagName.trim())
      alignmentReference = value.reference;
  });
  return alignmentReference;
}

function getRtfAlignmentReference(styleTag) {
	let alignTag = '', match, regex;
  if(styleTag.includes('text-align')) {
    regex = new RegExp("text-align:(.*?);", "g");
    while ((match = regex.exec(styleTag))) {
      alignTag += match[1];
    }
  }else {
    alignTag = styleTag;
  }
  return getAlignmentReferenceList(alignTag);
}