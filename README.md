# Html To Rtf

This project convert html to rtf format in the server.

## Prerequisites

This project work with NodeJS in the server side

```
* [NodeJS](https://nodejs.org/)
```

## Installation

```
npm install html-to-rtf
```

## Getting Started

```
const Rtf = require('./src/rtf/rtf.class');

let html = '<html><body><p style='color: rgb(255, 0, 0); text-align: center;'>my first <b>paragraph</b></p></body></html>';
let rtf = new Rtf();

console.log(rtf.convertHtmlToRtf(html));
```

## Running the tests

```
gulp tests
```

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

## Author

* **Ozires R.S.O.F**

## License

This project is licensed under the MIT License

