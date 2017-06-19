var colorTable = [{ amount: 0 }, []];

function getRtfReferenceColor(tagOptions) {
	console.log("RECeBI => ", tagOptions);
	let color = '', rgb, match, regex;
	regex = new RegExp("color:(.*?);", "g");
	while ((match = regex.exec(tagOptions))) {
		color += match[1];
	}
	if (color.includes('rgb')) {
		color = color.replace(/[\])}[{(rgb ]/g, '');
		rgb 	= color.split(',');
		return getColorInColorTable(rgb);
	}
	else if(color.includes('#')) {
		color = color.replace(/[# ]/g, '');
		rgb 	= convertColorInHexToRgb(color);
		return getColorInColorTable(rgb);
	}
	return '';
}

function convertColorInHexToRgb(hexColor) {
	let rgb = [];
	hexColor = (hexColor.length == 3) ? hexColor+''+hexColor : hexColor;
	rgb[2] = Math.pow(16, 1) * convertOneCharInHexToDec(hexColor[4]) + Math.pow(16, 0) * convertOneCharInHexToDec(hexColor[5]);
	rgb[1] = Math.pow(16, 1) * convertOneCharInHexToDec(hexColor[2]) + Math.pow(16, 0) * convertOneCharInHexToDec(hexColor[3]);
	rgb[0] = Math.pow(16, 1) * convertOneCharInHexToDec(hexColor[0]) + Math.pow(16, 0) * convertOneCharInHexToDec(hexColor[1]);
	return rgb;
}

function convertOneCharInHexToDec(value) {
	let number = '';
	value = (parseInt(value) >= 0 && parseInt(value) <= 9) ? value : value.toUpperCase();
	switch(value){
		case 'A': number = 10; break;
		case 'B': number = 11; break;
		case 'C': number = 12; break;
		case 'D': number = 13; break;
		case 'E': number = 14; break;
		case 'F': number = 15; break;
		default : number = value;
	}
	return parseInt(number);
}

function getColorInColorTable(rgb) {
	if (verifyIfColorExistsInColorTable(rgb))
		return getRtfReferenceColorInColorTable(rgb);
	else {
		addColorInColorTable(rgb);
		return getRtfReferenceColorInColorTable(rgb);
	}
}

function verifyIfColorExistsInColorTable(rgb) {
	let hasThisColor = false, colorsPosition = 1;
	colorTable[colorsPosition].forEach(value => {
		if (value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2])
			hasThisColor = true;
	});
	return hasThisColor;
}

function addColorInColorTable(rgb) {
	let rtfReferenceColor, amountColorPosition = 0, colorsPosition = 1;
	colorTable[amountColorPosition].amount++;
	rtfReferenceColor = '\\cf' + colorTable[amountColorPosition].amount + ' ';
	colorTable[colorsPosition].push({ red: rgb[0], green: rgb[1], blue: rgb[2], reference: rtfReferenceColor });
}

function getRtfReferenceColorInColorTable(rgb) {
	let rtfReferenceColor;
	colorTable[1].forEach(value => {
		if (value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2])
			rtfReferenceColor = value.reference;
	});
	return rtfReferenceColor;
}

function getAllColorsDeclaredInColorTable() {
	let colorTableContent = '';
	colorTable[1].forEach(value => colorTableContent += '\\red' + value.red + '\\green' + value.green + '\\blue' + value.blue + ';');
	return colorTableContent;
}