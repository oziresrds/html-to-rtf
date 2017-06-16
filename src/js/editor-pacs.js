var rtfHeader = "{\\rtf1\\ansi\\deff1 {\\fonttbl {\\f0 SHOWCARD GOTHIC;}{\\f1 Times New Roman;}}";
var rtfClosing = "}";
var rtfColorTable = '{\\colortbl ;';
var rtfColorTableClosing = '}';
var RtfContentReferences = [];

function buildRtf(){
   rtfColorTable += getAllColorsDeclaredInColorTable() + rtfColorTableClosing;
   rtfHeader += rtfColorTable;
   console.log('Final RTF => \n', (rtfHeader + getRtfContentReferences() + rtfClosing));
}

function getRtfContentReferences() {
   let rtfReference = '';
   RtfContentReferences.forEach(value => rtfReference += value);
   return rtfReference;
}

function convertHtmlToRtf() {
   let treeOfTags = document.getElementById('content').childNodes;
   for(let i = 0; i<treeOfTags.length; i++) 
      readAllChildsInTag(treeOfTags[i]);
   buildRtf();
}

function readAllChildsInTag(fatherTag) {
   if(verifyIfFatherTagNameIsDifferentOfTextTagAndHasChild(fatherTag)) {     
      addOpeningTagInRtfCode(fatherTag.nodeName);
      verifyExistsAttributes(fatherTag.attributes);
   }
   if(verifyIfFatherTagHasChildsAndAmountChildsIsBiggerThanOne(fatherTag)) {
      let fatherTagChilds = fatherTag.childNodes;
      for(let j = 0; j< fatherTagChilds.length; j++) {
         if(fatherTagChilds[j].hasChildNodes())
            readAllChildsInTag(fatherTagChilds[j]);
         else
            addValueInRtfCode(fatherTagChilds[j].nodeValue);
      }
      addClosingFatherTagInRtfCode(fatherTag.nodeName);
   }else {
      if(verifyIfFatherTagHasChildTextTagWithValue(fatherTag.childNodes)) {
         addValueInRtfCode(fatherTag.childNodes[0].nodeValue);
         addClosingFatherTagInRtfCode(fatherTag.childNodes[0].parentElement.nodeName);
      }
   }
}

function verifyExistsAttributes(attributes) {
      verifyExistingStyles(attributes['style'].nodeValue);
      if(attributes['align']) {
         addRefenceAlignmentInRtfCode(attributes['align'].nodeValue);
      }
}

function verifyExistingStyles(styleTag) {
   if(styleTag.includes('color')) {
      addRefenceColorInRtfCode(styleTag);
   }
}

function verifyIfFatherTagNameIsDifferentOfTextTagAndHasChild(fatherTag) {
   return fatherTag.nodeName != '#text' && fatherTag.hasChildNodes();
}

function addRefenceColorInRtfCode(styleTag) {
   let colorReference = getRtfRefenceColor(styleTag);
   if(colorReference != '')
      RtfContentReferences.push(colorReference); 
}

function addOpeningTagInRtfCode(tag) {
   RtfContentReferences.push(getRtfReferenceTag(tag));
}

function addClosingFatherTagInRtfCode(closingFatherTag) {
   RtfContentReferences.push(getRtfReferenceTag('/'+closingFatherTag));
}

function addValueInRtfCode(tag) {
   RtfContentReferences.push(tag);
}

function verifyIfFatherTagHasChildTextTagWithValue(fatherTag) {
   return fatherTag.length > 0;
}

function verifyIfFatherTagHasChildsAndAmountChildsIsBiggerThanOne(fatherTag) {
   return fatherTag.hasChildNodes() && fatherTag.childNodes.length > 1;
}

function getRtfReferenceTag(tagName) {
   tagName = tagName.toLowerCase();
    for(let i = 0; i<listOfAllowedTags.length; i++) {
        if(listOfAllowedTags[i].opening == tagName) 
            return listOfAllowedTags[i].openingRtf;
        if(listOfAllowedTags[i].closing == tagName)
            return listOfAllowedTags[i].closingRtf;
    }
    return '';
}
