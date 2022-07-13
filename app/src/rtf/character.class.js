class Character {

    static asciiToRtfScape(text) {
        if (!text) {
            return text;
        }

        this.getTableData().forEach(item => {
            const regex = new RegExp(item.character, 'g');
            text = text.replace(regex, item.rtf_escape);
        });

        return text;
    }

    /**
     * RTF ESCAPE 
     * https://www.oreilly.com/library/view/rtf-pocket-guide/9781449302047/ch04.html
     */
    static getTableData() {
        const table = [
            { ascii_code: '33', rtf_escape: '\\\'21', character: '!', character_name: 'Exclamation mark' },
            { ascii_code: '34', rtf_escape: '\\\'22', character: '"', character_name: 'Double quote' },
            { ascii_code: '39', rtf_escape: '\\\'27', character: "'", character_name: 'Apostrophe' },
            { ascii_code: '123', rtf_escape: '\\\'7b', character: '{', character_name: 'Left curly brace' },
            { ascii_code: '125', rtf_escape: '\\\'7d', character: '}', character_name: 'Right curly brace' },
            { ascii_code: '145', rtf_escape: '\\\'91', character: '‘', character_name: 'Left single quote' },
            { ascii_code: '146', rtf_escape: '\\\'92', character: '’', character_name: 'Right single quote' },
            { ascii_code: '147', rtf_escape: '\\\'93', character: '“', character_name: 'Left double quote' },
            { ascii_code: '148', rtf_escape: '\\\'94', character: '”', character_name: 'Right double quote' },
            { ascii_code: '149', rtf_escape: '\\\'95', character: '•', character_name: 'Bullet' },
            { ascii_code: '192', rtf_escape: '\\\'c0', character: 'À', character_name: 'A-grave' },
            { ascii_code: '193', rtf_escape: '\\\'c1', character: 'Á', character_name: 'A-acute' },
            { ascii_code: '194', rtf_escape: '\\\'c2', character: 'Â', character_name: 'A-circumflex' },
            { ascii_code: '195', rtf_escape: '\\\'c3', character: 'Ã', character_name: 'A-tilde' },
            { ascii_code: '196', rtf_escape: '\\\'c4', character: 'Ä', character_name: 'A-diaeresis' },
            { ascii_code: '199', rtf_escape: '\\\'c7', character: 'Ç', character_name: 'C-cedilla' },
            { ascii_code: '200', rtf_escape: '\\\'c8', character: 'È', character_name: 'E-grave' },
            { ascii_code: '201', rtf_escape: '\\\'c9', character: 'É', character_name: 'E-acute' },
            { ascii_code: '204', rtf_escape: '\\\'cc', character: 'Ì', character_name: 'I-grave' },
            { ascii_code: '205', rtf_escape: '\\\'cd', character: 'Í', character_name: 'I-acute' },
            { ascii_code: '210', rtf_escape: '\\\'d2', character: 'Ò', character_name: 'O-grave' },
            { ascii_code: '211', rtf_escape: '\\\'d3', character: 'Ó', character_name: 'O-acute' },
            { ascii_code: '212', rtf_escape: '\\\'d4', character: 'Ô', character_name: 'O-circumflex' },
            { ascii_code: '213', rtf_escape: '\\\'d5', character: 'Õ', character_name: 'O-tilde' },
            { ascii_code: '217', rtf_escape: '\\\'d9', character: 'Ù', character_name: 'U-grave' },
            { ascii_code: '218', rtf_escape: '\\\'da', character: 'Ú', character_name: 'U-acute' },
            { ascii_code: '224', rtf_escape: '\\\'e0', character: 'à', character_name: 'a-grave' },
            { ascii_code: '225', rtf_escape: '\\\'e1', character: 'á', character_name: 'a-acute' },
            { ascii_code: '226', rtf_escape: '\\\'e2', character: 'â', character_name: 'a-circumflex' },
            { ascii_code: '227', rtf_escape: '\\\'e3', character: 'ã', character_name: 'a-tilde' },
            { ascii_code: '231', rtf_escape: '\\\'e7', character: 'ç', character_name: 'c-cedilla' },
            { ascii_code: '232', rtf_escape: '\\\'e8', character: 'è', character_name: 'e-grave' },
            { ascii_code: '233', rtf_escape: '\\\'e9', character: 'é', character_name: 'e-acute' },
            { ascii_code: '234', rtf_escape: '\\\'ea', character: 'ê', character_name: 'e-circumflex' },
            { ascii_code: '236', rtf_escape: '\\\'ec', character: 'ì', character_name: 'i-grave' },
            { ascii_code: '237', rtf_escape: '\\\'ed', character: 'í', character_name: 'i-acute' },
            { ascii_code: '242', rtf_escape: '\\\'f2', character: 'ò', character_name: 'o-grave' },
            { ascii_code: '243', rtf_escape: '\\\'f3', character: 'ó', character_name: 'o-acute' },
            { ascii_code: '244', rtf_escape: '\\\'f4', character: 'ô', character_name: 'o-circumflex' },
            { ascii_code: '245', rtf_escape: '\\\'f5', character: 'õ', character_name: 'o-tilde' },
            { ascii_code: '249', rtf_escape: '\\\'f9', character: 'ù', character_name: 'u-grave' },
            { ascii_code: '250', rtf_escape: '\\\'fa', character: 'ú', character_name: 'u-acute' }
        ];
        return table;
    }
}

module.exports = Character;