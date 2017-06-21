var listOfAllowedTags = [
   { opening: 'b',        openingRtf: '{\\b ',        closing: '/b',          closingRtf: ' }' },
   { opening: 'br',       openingRtf: ' \\line ',     closing: '/br',         closingRtf: ' \\line ' },
   { opening: 'center',   openingRtf: '{\\pard\\qr ', closing: '/center',     closingRtf: ' \\par}' },
   { opening: 'div',      openingRtf: '{\\pard ',     closing: '/div',        closingRtf: ' \\sb70 \\par}' },
   { opening: 'font',     openingRtf: '{ ',           closing: '/font',        closingRtf: ' }' },
   { opening: 'i',        openingRtf: '{\\i ',        closing: '/i',          closingRtf: ' }' },
   { opening: 'p',        openingRtf: '{\\pard ',     closing: '/p',          closingRtf: ' \\sb70 \\par}' },
   { opening: 's',        openingRtf: '{\\strike ',   closing: '/s',          closingRtf: ' }' },
   { opening: 'span',     openingRtf: '{ ',           closing: '/span',       closingRtf: ' }' },
   { opening: 'sub',      openingRtf: '{\\sub ',      closing: '/sub',        closingRtf: ' }' },
   { opening: 'sup',      openingRtf: '{\\super ',    closing: '/sup',        closingRtf: ' }' },
   { opening: 'strong',   openingRtf: '{\\b ',        closing: '/strong',     closingRtf: ' }' },
   { opening: 'td',       openingRtf: '{\\pard\\intbl\\qc ',  closing: '/td',       closingRtf: ' \\cell}' },
   { opening: 'th',       openingRtf: '{\\pard\\intbl\\qc ',  closing: '/th',       closingRtf: ' \\cell}' },
   { opening: 'tr',       openingRtf: '{\\trowd\\trgaph0 ',  closing: '/tr',       closingRtf: ' \\row}' },
   { opening: 'u',        openingRtf: '{\\ul ',       closing: '/u',          closingRtf: ' }' }
];