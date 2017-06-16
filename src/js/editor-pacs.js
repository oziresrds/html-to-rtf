var divHtmlIndex;
var divHtml;
var tagName = '';
var tagContent = '';
var tagOptions = '';
var rtfStringHeader = "{\\rtf1\\ansi\\deff1 {\\fonttbl {\\f0 SHOWCARD GOTHIC;}{\\f1 Times New Roman;}}";
var rtfStringHeaderFooter = '{\\colortbl ;}';
var rtfStringFooter = "}";
var rtfStringContent = '';
var rtfString = '';
var rtfColorTableContent = '';
var rtfColorTableHead = '{\\colortbl ;';
var rtfColorTableFooter = '}';

var newRtfTag = '';
var tagRtf = '';

var RTF = [];

var newListOfTags = [
   { tag: 'P', openingRtf: '{\\pard ', closing: '/p', closingRtf: ' \\sb70 \\par}\n' },
   { opening: 'b', openingRtf: '{\\b ', closing: '/b', closingRtf: ' }' },
   { opening: 'i', openingRtf: '{\\i ', closing: '/i', closingRtf: ' }' },
   { opening: 'br', openingRtf: ' \\line ', closing: '/br', closingRtf: ' \\line ' },
   { opening: 'strong', openingRtf: '{\\b ', closing: '/strong', closingRtf: ' }' },
   { opening: 'strong', openingRtf: '{\\b ', closing: '/strong', closingRtf: ' }' }
];

var colorList = [
    [2], [
        { red: '01', green: '55', blue: '77', reference: '\\cf1'},
        { red: '59', green: '0', blue: '164', reference: '\\cf2'}
    ]
];

function convertHtmlToRtf() {
    divHtml = $("#content").html();

   //  test dom node
   console.log('######################################################');
   var contentTags = document.getElementById('content').childNodes;
   var txt = '';
   var nomeDaTag = '';
   var fatherTag = '';

   for(var i = 0; i<contentTags.length; i++) {
      fatherTag = contentTags[i];   
      readAllChildInTag(fatherTag);
   }

   console.log('RTF => ', RTF);
   console.log('######################################################');
   // final test dom node

    console.log(divHtml);
    for (divHtmlIndex = 0; divHtmlIndex < divHtml.length; divHtmlIndex++) {
        if (divHtml[divHtmlIndex] == '<') {
            doWhileIndexIsDifferentToWhiteSpaceAndBiggerThan();
            console.log(tagName);
            rtfStringContent += verifyTag(tagName);
            tagName = '';

            if (divHtml[divHtmlIndex] == ' ')
                ifExistWhiteSpaceBetweenTagAndTagOptions();
            else {
                if (divHtml[divHtmlIndex] == '>') 
                    ifNotExistWhiteSpaceBetweenTagAndTagOptions();
            }
        }
    }
    generateRtfColorTable();

{    rtfColorTableHead += rtfColorTableContent + '}';
    rtfStringHeader += rtfColorTableHead
    console.log('rtf => ', rtfStringContent);
    console.log('rtfStringHeader => ', rtfStringHeader);
    console.log('rtfStringFooter =>', rtfStringFooter);
    console.log('Final => \n', (rtfString += rtfStringHeader + rtfStringContent + rtfStringFooter));}

}

// #####################################
function readAllChildInTag(fatherTag) {
   if(fatherTag.nodeName != '#text' && fatherTag.hasChildNodes()) {
      RTF.push(verifyTag(fatherTag.nodeName));
      console.log(fatherTag.nodeName);
      console.log('FATHER => ', fatherTag.attributes['style'].nodeValue);
      console.log('colorRef => ', getRtfRefenceColor(fatherTag.attributes['style']));
      
   }
   if(fatherTag.hasChildNodes() && fatherTag.childNodes.length >1) {
      let nomeDaTag = fatherTag.childNodes;
      for(let j = 0; j< nomeDaTag.length; j++) {
         if(nomeDaTag[j].hasChildNodes())
            readAllChildInTag(nomeDaTag[j]);
         else {
            RTF.push(nomeDaTag[j].nodeValue);
            console.log(nomeDaTag[j].nodeValue);
         }
      }
      RTF.push(verifyTag('/'+fatherTag.nodeName));
      console.log(fatherTag.nodeName); 
   }else {
      if(fatherTag.childNodes.length>0) {
         console.log(fatherTag.childNodes[0].nodeValue);
         RTF.push(fatherTag.childNodes[0].nodeValue);
         RTF.push(verifyTag('/'+fatherTag.childNodes[0].parentElement.nodeName));
         console.log(fatherTag.childNodes[0].parentElement.nodeName);
      }
   }
}

function verifyIfExistsChildInTag(tagReference) {
   return tagReference.hasChildNodes()
}
// #####################################

function generateRtfColorTable() {
    colorList[1].forEach(value => rtfColorTableContent += '\\red'+value.red+'\\green'+value.green+'\\blue'+value.blue+'; ');
}

function ifNotExistWhiteSpaceBetweenTagAndTagOptions() {
    doWhileIndexIsDifferentToLessThanContent();
    console.log(tagContent);
    rtfStringContent += tagContent;
    tagContent = '';
    divHtmlIndex--;
}

function ifExistWhiteSpaceBetweenTagAndTagOptions() {
    doWhileIndexIsDifferentToBiggerThanOptions();

    if (divHtml[divHtmlIndex] == '>') {
        doWhileIndexIsDifferentToLessThan();

        console.log(tagContent);
        rtfStringContent += tagContent;
        tagContent = '';
        divHtmlIndex--;
    }			
}

function doWhileIndexIsDifferentToLessThanContent() {
    while (divHtml[divHtmlIndex] != '<' && divHtmlIndex < divHtml.length) {
        if (divHtml[divHtmlIndex] != '>') {
            tagContent += divHtml[divHtmlIndex];
        }
        divHtmlIndex++;
    }
}

function doWhileIndexIsDifferentToBiggerThanOptions() {
    while (divHtml[divHtmlIndex] != '>' && divHtmlIndex < divHtml.length) {
        tagOptions += divHtml[divHtmlIndex];
        divHtmlIndex++;
    }

    rtfStringContent += setStyles(tagOptions);
    
    console.log(tagOptions);
    tagOptions = '';
}

function setStyles(tagOptions) {
    return verifyIfExistTagsOfStylesAndReturnTheRtfValue(tagOptions);
}

function verifyIfExistTagsOfStylesAndReturnTheRtfValue(tagOptions) {
    let style = '';
    style += getRtfRefenceColor(tagOptions);
    return style;   
}

function doWhileIndexIsDifferentToWhiteSpaceAndBiggerThan() {
    while (divHtml[divHtmlIndex] != ' ' && divHtml[divHtmlIndex] != '>' && divHtmlIndex < divHtml.length) {
        if (divHtml[divHtmlIndex] != '<') {
            tagName += divHtml[divHtmlIndex];
        }
        divHtmlIndex++;
    }
}

function doWhileIndexIsDifferentToLessThan() {
    while (divHtml[divHtmlIndex] != '<' && divHtmlIndex < divHtml.length) {
        if (divHtml[divHtmlIndex] != '>') {
            tagContent += divHtml[divHtmlIndex];
        }
        divHtmlIndex++;
    }
}

function verifyTag(tagName) {
   tagName = tagName.toLowerCase();
    var listOfTags = [
        { opening: 'p', openingRtf: '{\\pard ', closing: '/p', closingRtf: ' \\sb70 \\par}\n' },
        { opening: 'b', openingRtf: '{\\b ', closing: '/b', closingRtf: ' }' },
        { opening: 'i', openingRtf: '{\\i ', closing: '/i', closingRtf: ' }' },
        { opening: 'br', openingRtf: ' \\line ', closing: '/br', closingRtf: ' \\line ' },
        { opening: 'strong', openingRtf: '{\\b ', closing: '/strong', closingRtf: ' }' },
        { opening: 'strong', openingRtf: '{\\b ', closing: '/strong', closingRtf: ' }' },
        { opening: 'em', openingRtf: '{\\em ', closing: '/em', closingRtf: ' }' },
        { opening: 'u', openingRtf: '{\\u ', closing: '/u', closingRtf: ' }' },
        { opening: 's', openingRtf: '{\\s ', closing: '/s', closingRtf: ' }' }
    ];

    for(var i = 0; i<listOfTags.length; i++) {
        if(listOfTags[i].opening == tagName) 
            return listOfTags[i].openingRtf;

        if(listOfTags[i].closing == tagName)
            return listOfTags[i].closingRtf;
    }
    return '';
}
