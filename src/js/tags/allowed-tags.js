var listOfAllowedTags = [
   { opening: 'p',      openingRtf: '{\\pard ',    closing: '/p',       closingRtf: ' \\sb70 \\par}\n' },
   { opening: 'b',      openingRtf: '{\\b ',       closing: '/b',       closingRtf: ' }' },
   { opening: 'i',      openingRtf: '{\\i ',       closing: '/i',       closingRtf: ' }' },
   { opening: 'br',     openingRtf: ' \\line ',    closing: '/br',      closingRtf: ' \\line ' },
   { opening: 'strong', openingRtf: '{\\b ',       closing: '/strong',  closingRtf: ' }' },
   { opening: 'u',      openingRtf: '{\\ul ',      closing: '/u',       closingRtf: ' }' },
   { opening: 's',      openingRtf: '{\\strike ',  closing: '/s',       closingRtf: ' }' },
   { opening: 'center', openingRtf: '{\\pard\\qr ',      closing: '/center',      closingRtf: ' \\par}' }
];