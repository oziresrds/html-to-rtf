function getRtfRefenceColor(tagOptions) {
    let color, rgb, match, style, regex;

    
   //  tagOptions = JSON.stringify(tagOptions);
    console.log('color => ', JSON.stringify(tagOptions));
    regex = new RegExp("color:(.*?);", "g");
    style = color = '';

    while ((match = regex.exec(tagOptions))) {color += match[1]; };
console.log('color => ', color);
    if(color == '') {
       return '';
    }

    color = color.replace(/[\])}[{(rgb ]/g, '');
    rgb = color.split(',');

    console.log('rgb => ', rgb);

    style += setColor(rgb);
    return style;    
}

function verifyIfColorExistsInTagOption(tagOptions) { 
    let color, match, regex;
    regex = new RegExp("color:(.*?);", "g");
    while ((match = regex.exec(tagOptions))) color += match[1];
    return (color != '') ? true : false;
}

function setColor(rgb) {
    if(verifyIfColorExistsInColorTable(rgb))
        return getRtfReferenceColorInColorTable(rgb);
    else {
        addColorInColorTable(rgb);
        console.log('color returned => ', getRtfReferenceColorInColorTable(rgb));
        return getRtfReferenceColorInColorTable(rgb);
    }
}

function verifyIfColorExistsInColorTable(rgb) {
    let hasThisColor = false;
    colorList[1].forEach(value => { 
        if(value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2]) 
            hasThisColor = true; 
    });
    return hasThisColor;
}

function addColorInColorTable(rgb) {
    let rtfReferenceColor;
    colorList[0]++;
    rtfReferenceColor = '\\cf' + colorList[0] + ' ';
    colorList[1].push({red: rgb[0], green: rgb[1], blue: rgb[2], reference: rtfReferenceColor});	
}

function getRtfReferenceColorInColorTable(rgb) {
    let rtfReferenceColor;
    colorList[1].forEach(value => { 
        if(value.red == rgb[0] && value.green == rgb[1] && value.blue == rgb[2]) 
            rtfReferenceColor = value.reference; 
    });
    return rtfReferenceColor;    
}