class MyString {
  static remove_Enter_HorizontalTab_LineFeed(stringValue) {
    const asciiOfHorizontalTab = 9;
    const lineFeed = 10;
    let newstringValue = '';
    for(let i = 0; i < stringValue.length; i++) {
      if(stringValue[i].charCodeAt(0) != asciiOfHorizontalTab && stringValue[i] != '\n' && stringValue[i].charCodeAt(0) != lineFeed) 
        newstringValue += stringValue[i];
    }
    return newstringValue;
  }
}
module.exports = MyString;