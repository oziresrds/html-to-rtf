var listOfAllowedTags = [
   { opening: 'div',      openingRtf: '{\\pard ',    closing: '/div',       closingRtf: ' \\sb70 \\par}' },
   { opening: 'p',      openingRtf: '{\\pard ',    closing: '/p',       closingRtf: ' \\sb70 \\par}' },
   { opening: 'center', openingRtf: '{\\pard\\qr ', closing: '/center', closingRtf: ' \\par}' },
   { opening: 'b',      openingRtf: '{\\b ',       closing: '/b',       closingRtf: ' }' },
   { opening: 'i',      openingRtf: '{\\i ',       closing: '/i',       closingRtf: ' }' },
   { opening: 'br',     openingRtf: ' \\line ',    closing: '/br',      closingRtf: ' \\line ' },
   { opening: 'strong', openingRtf: '{\\b ',       closing: '/strong',  closingRtf: ' }' },
   { opening: 'u',      openingRtf: '{\\ul ',      closing: '/u',       closingRtf: ' }' },
   { opening: 's',      openingRtf: '{\\strike ',  closing: '/s',       closingRtf: ' }' },
   { opening: 'sup',    openingRtf: '{\\super ',    closing: '/sup',    closingRtf: ' }' },
   { opening: 'sub',    openingRtf: '{\\sub ',    closing: '/sub',       closingRtf: ' }' }
];