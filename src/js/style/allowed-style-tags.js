let allowedStyleTags = [
  { propertyName: 'color', allowed: true },
  { propertyName: 'font-size', allowed: true },
  { propertyName: 'text-align', allowed: true }
];

function getRtfPropertyNameReference(classe) {
  let listOfRtfReferences = '';
  allowedStyleTags.forEach(value => {
    if(value.allowed) {
      console.log('propertyName => ', value.propertyName, ' value => ', $('.'+classe).css(value.propertyName));

      switch(value.propertyName) {
        case 'color': listOfRtfReferences += getRtfReferenceColorByTag($('.'+classe).css(value.propertyName)); break;
        case 'font-size': listOfRtfReferences += getRtfFontSizeReference($('.'+classe).css(value.propertyName)); break;
        case 'text-align': listOfRtfReferences += getAlignmentReferenceList($('.'+classe).css(value.propertyName)); break;
      }
    }
  });
  return listOfRtfReferences;
}