class MyString {
  static escapeCharacters(stringValue) {
    stringValue = String(stringValue);

    stringValue = stringValue.replace(/([\n\r\t\f\s]+)|([{}\\])|([^\x00-\x7F])/g,
        function (c, isSpace, isSpecial, isNonAscii7) {
            if (isSpace) {
                return ' ';
            } else if (isSpecial) {
                return '\\' + c;
            } else if (isNonAscii7) {
                var cc = c.charCodeAt();
                return '\\u' + String(cc <= 32767 ? cc : cc -65535) + '?';
            }
            return undefined;
        }
    );

    return stringValue.trim();
  }

  static convertOneCharInHexToDec(value) {
    if (String(value).match(/0-9a-fA-F/))
        return parseInt(value, 16);
    return undefined;
  }

  static hasOnlyWhiteSpace(content) {
    return content.match(/^\s+$/g);
  } 

}
module.exports = MyString;
