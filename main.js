const _rtf = require('./app/src/rtf/rtf.class');
const rtf = new _rtf();

function htmlToRtf(html) {
    return rtf.convertHtmlToRtf(html);
}

window.htmlToRtf = htmlToRtf;