# Html To Rtf
This project convert html to rtf format in the server.

## Prerequisites
This project work with NodeJS in the server side
[NodeJS]: <https://nodejs.org>

## Installation
```
$ npm install html-to-rtf
```
## Getting Started
Go to the folder html-to-rtf/app in the node_modules and run:
```
$ node app.js
```
Into the app.js already have an example and it will be saved in current.rtf in the folder /files at the module. 
Attention with the white spaces.

#### Rtf example:
saved in /files/current.rtf:
```
{\rtf1\ansi\deff0{\fonttbl {\f0\fnil\fcharset0 Calibri;}{\f1\fnil\fcharset2 Symbol;}}{\colortbl ;\red51\green51\blue51;\red255\green0\blue0;\red0\green0\blue255;}{\pard{\pard\cf1\qc text of p {\b start b {\i italic with  bold } final text of b }{\i italic } final text of p \sb70\par}{\pard\cf2\qr red paragraph => right with tag \sb70\par}{\pard\cf3\qc blue paragraph => center with style \sb70\par}{{\trowd\trgaph10\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx2125\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx4250\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx6375\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx8500{\pard\intbl\qc column 1 \cell}{\pard\intbl\qc column 2 \cell}{\pard\intbl\qc column 3 \cell}{\pard\intbl\qc column 4 \cell}\row}{\trowd\trgaph10\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx2125\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx4250\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx6375\clbrdrt\brdrw15\brdrs\clbrdrl\brdrw15\brdrs\clbrdrb\brdrw15\brdrs\clbrdrr\brdrw15\brdrs\cellx8500{\pard\intbl\qc content 1 \cell}{\pard\intbl\qc content 2 \line\cell}{\pard\intbl\qc content 3 \line\cell}{\pard\intbl\qc content 4 \line\cell}\row}}\sb70\par}}
```
##### Now test in your preferred text editor (wordpad, word, libreoffice, ...).
##

### Allowed html tags
```
<b>, <br>, <center>, <div>, <font>, <h1>, <h2>, <h3>, <h4>,
<h5>, <h6>, <i>, <li>, <p>, <ol>, <s>, <span>, <sub>, <sup>,
<strong>, <table>, <td>, <th>, <tr>, <u>, <ul>
```
### Allowed style properties
```
color(Hex and Rgb), font-size(px), text-align
```

## Running the tests
```
$ gulp tests
```

## Author

* **Ozires R.S.O.F**

## License
This project is licensed under the MIT License
