var allowedStyleTags = [
  { propertyName: 'color', allowed: true },
  { propertyName: 'font-size', allowed: true },
  { propertyName: 'text-align', allowed: true },
  { propertyName: 'background', allowed: false }
];

class AllowedStyleTags {
  static tagIsAllowed(propertyName) {
    let isAllowed = false;
    for(let i = 0; i < allowedStyleTags; i++) {
      if(value.propertyName == propertyName)
        return (value.allowed == true) ? true : false;
    }
    return isAllowed;
  }

  static getAllowedTags() {
    let allowedTags = [];
    allowedStyleTags.forEach((value) => {
      if(value.allowed)
        allowedTags.push(value);
    });
    return allowedTags;
  }
}
module.exports = AllowedStyleTags;


