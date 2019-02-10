const HtmlTags = require('./html-tags.module');

const DEAFAULT_TAG = {openingRtf: '{\\pard', closingRtf: '\\sb70\\par}'};

class AllowedHtmlTags {
  static getRtfReferenceTag(tagName) {
    let allowedTag;

    tagName = tagName.toLowerCase();
    allowedTag = this.getAllowedTag(tagName);

    if(allowedTag) {
      return tagName == allowedTag.opening ? allowedTag.openingRtf : allowedTag.closingRtf;
    }
    return undefined
  }

  static isKnowedTag(tag) {
    let isKnowedTag = this.getAllowedTag(tag);
    return Boolean(isKnowedTag);
  }

  static getAllowedTag(tag) {
    tag = tag.toLowerCase();
    return HtmlTags.find(knowedTag => knowedTag.opening == tag || knowedTag.closing == tag);
  }

}
module.exports = AllowedHtmlTags;