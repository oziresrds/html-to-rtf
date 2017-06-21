var rtfHeader = "{\\rtf1\\ansi\\deff1 {\\fonttbl {\\f0 SHOWCARD GOTHIC;}{\\f1 Times New Roman;}}";
var rtfClosing = "}";
var rtfColorTable = '{\\colortbl ;';
var rtfColorTableClosing = '}';
var RtfContentReferences = [];

var amountOfColumnInTable = 0;
var isTableTag = false;
var cellLength;
var currentRowNumber = 0;

function buildRtf() {
	let rtfWithWhiteSpaces;
	rtfColorTable += getAllColorsDeclaredInColorTable() + rtfColorTableClosing;
	rtfHeader += rtfColorTable;
	console.log('Final RTF => \n', (rtfHeader + getRtfContentReferences() + rtfClosing));
}

function getRtfContentReferences() {
	let rtfReference = '';
	RtfContentReferences.forEach(value => {
		if(value.content != null){
			if(value.tag == true)
				rtfReference += removeWhiteSpaceInString(value.content) + ' ';
			else
				rtfReference += removeEnterAndHorizontalTabInString(value.content);
		}
	});
	return rtfReference;
}

function removeWhiteSpaceInString(stringValue) {
	let newstringValue = '';
	for(let i = 0; i<stringValue.length; i++) {
		if(stringValue[i] != ' ')
			newstringValue += stringValue[i];
	}
	return newstringValue;
}

function removeEnterAndHorizontalTabInString(stringValue) {
	let newstringValue = '';
	const asciiOfHorizontalTab = 9;
	for(let i = 0; i < stringValue.length; i++) {
		if(stringValue[i].charCodeAt(0) != asciiOfHorizontalTab && stringValue[i] != '\n') 
			newstringValue += stringValue[i];
	}
	return newstringValue;
}

function convertHtmlToRtf() {
	let treeOfTags = document.getElementById('content').childNodes;
	console.log('HTML => ', treeOfTags);
	for (let i = 0; i < treeOfTags.length; i++)
		readAllChildsInTag(treeOfTags[i]);
	buildRtf();
}

function readAllChildsInTag(fatherTag) {
	if (verifyIfFatherTagNameIsDifferentOfTextTagAndHasChild(fatherTag)) {
		addOpeningTagInRtfCode(fatherTag.nodeName);
		if(fatherTag.nodeName.toLowerCase() == 'tr') {
			RtfContentReferences.push({ content: buildCellsLengthOfEachColumn(fatherTag), tag: true });
		}

		verifyExistsAttributes(fatherTag.attributes);
		if(fatherTag.nodeName.toLowerCase() == 'table') {
			isTableTag = true;
			amountOfColumnInTable = fatherTag.children[0].children[0].children.length;
			cellLength = Math.floor(8503/parseInt(amountOfColumnInTable));
		}
	}
	if (verifyIfFatherTagHasChildsAndAmountChildsIs_BiggerThanOneOrDiffentToTextTag(fatherTag)) {
		let fatherTagChilds = fatherTag.childNodes;
		for (let j = 0; j < fatherTagChilds.length; j++) {
			if (fatherTagChilds[j].hasChildNodes())
				readAllChildsInTag(fatherTagChilds[j]);
			else
				RtfContentReferences.push({ content: fatherTagChilds[j].nodeValue, tag: false });
		}
		addClosingFatherTagInRtfCode(fatherTag.nodeName);
		
	} else {
		if (verifyIfFatherTagHasChildTextTagWithValue(fatherTag.childNodes)) {
			RtfContentReferences.push({ content: fatherTag.childNodes[0].nodeValue, tag: false });
			addClosingFatherTagInRtfCode(fatherTag.childNodes[0].parentElement.nodeName);
		}
	}
}

function buildCellsLengthOfEachColumn() {
	let cellGroup = '';
	let colorListInPositionOne = '1';
	let colorListInPositionTwo = '2';
	let color = (currentRowNumber%2 == 0) ? colorListInPositionTwo : colorListInPositionOne;
	for(let rowNumber = 0; rowNumber < amountOfColumnInTable; rowNumber++)
		cellGroup += ('\\trcbpat'+color+'\\clbrdrt \\brdrw15\\brdrs\\clbrdrl \\brdrw15\\brdrs\\clbrdrb \\brdrw15\\brdrs\\clbrdrr \\brdrw15\\brdrs\\cellx'+(cellLength*rowNumber+cellLength));
	currentRowNumber++;
	return cellGroup;
}

function verifyExistsAttributes(attributes) {
	if(attributes['style'])
		verifyExistingStyles(attributes['style'].nodeValue);
	if(attributes['color'])
		RtfContentReferences.push({ content: getRtfReferenceColorByTag(attributes['color'].nodeValue), tag: true });
	if(attributes['align'])
		addReferenceAlignmentInRtfCode(attributes['align'].nodeValue);
}

function verifyExistingStyles(styleTag) {
	if (styleTag.includes('color'))
		addRefenceColorInRtfCode(styleTag);
	if(styleTag.includes('text-align'))
		addReferenceAlignmentInRtfCode(styleTag);
}

function verifyIfFatherTagNameIsDifferentOfTextTagAndHasChild(fatherTag) {
	return fatherTag.nodeName != '#text' && fatherTag.hasChildNodes();
}

function addRefenceColorInRtfCode(styleTag) {
	let colorReference = getRtfReferenceColor(styleTag);
	if (colorReference != '')
		RtfContentReferences.push({ content: colorReference, tag: true });
}

function addReferenceAlignmentInRtfCode(styleTag) {
	let alignmentReference = getRtfAlignmentReference(styleTag);
	RtfContentReferences.push({ content: alignmentReference, tag: true });
}

function addOpeningTagInRtfCode(tag) {
	RtfContentReferences.push({ content: getRtfReferenceTag(tag), tag: true });
}

function addClosingFatherTagInRtfCode(closingFatherTag) {
	RtfContentReferences.push({ content: getRtfReferenceTag('/' + closingFatherTag), tag: true });
}

function verifyIfFatherTagHasChildTextTagWithValue(fatherTag) {
	return fatherTag.length > 0;
}

function verifyIfFatherTagHasChildsAndAmountChildsIs_BiggerThanOneOrDiffentToTextTag(fatherTag) {
	return fatherTag.hasChildNodes() && (fatherTag.childNodes.length > 1 || fatherTag.nodeName !='#text');
}

function getRtfReferenceTag(tagName) {
	tagName = tagName.toLowerCase();
	for (let i = 0; i < listOfAllowedTags.length; i++) {
		if (listOfAllowedTags[i].opening == tagName)
			return listOfAllowedTags[i].openingRtf;
		if (listOfAllowedTags[i].closing == tagName)
			return listOfAllowedTags[i].closingRtf;
	}
	return '';
}
