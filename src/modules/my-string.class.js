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

  static convertOneCharInHexToDec(value) {
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
}
module.exports = MyString;