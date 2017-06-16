var colorTable = [{ amount: 0 }, []];

function getRtfRefenceColor(tagOptions) {
   let color = '', rgb, match, regex;
   regex = new RegExp("color:(.*?);", "g");
   while ((match = regex.exec(tagOptions))) {
      color += match[1]; 
   }
   if(color.includes('rgb')) {
      color = color.replace(/[\])}[{(rgb ]/g, '');
      rgb = color.split(',');
      return getColorInColorTable(rgb);
   }
   return '';    
}

function getColorInColorTable(rgb) {
    if(verifyIfColorExistsInColorTable(rgb))
        return getRtfReferenceColorInColorTable(rgb);
    else {
        addColorInColorTable(rgb);
        return getRtfReferenceColorInColorTable(rgb);
    }
}

function verifyIfColorExistsInColorTable(rgb) {
    let hasThisColor = false, colorsPosition = 1;
    colorTable[colorsPosition].forEach(value => { 
        if(value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2]) 
            hasThisColor = true; 
    });
    return hasThisColor;
}

function addColorInColorTable(rgb) {
    let rtfReferenceColor, amountColorPosition = 0, colorsPosition = 1;
    colorTable[amountColorPosition].amount++;
    rtfReferenceColor = '\\cf' + colorTable[amountColorPosition].amount + ' ';
    colorTable[colorsPosition].push({red: rgb[0], green: rgb[1], blue: rgb[2], reference: rtfReferenceColor});	
}

function getRtfReferenceColorInColorTable(rgb) {
    let rtfReferenceColor;
    colorTable[1].forEach(value => { 
        if(value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2]) 
            rtfReferenceColor = value.reference; 
    });
    return rtfReferenceColor;    
}

function getAllColorsDeclaredInColorTable() {
   let colorTableContent = '';
   colorTable[1].forEach(value => colorTableContent += '\\red'+value.red+'\\green'+value.green+'\\blue'+value.blue+'; ');
   return colorTableContent;
}