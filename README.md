# HTML To RTF (Browser and Server)
>This project convert html to rtf format in the Browser (v2.0.0+) and the server with NodeJS.

## Installation
```
$ npm install html-to-rtf
```

## Changelog
```
* Encoding string correctly (v2.0.1)
* Setting correct space and fix some insecure dependencies (v2.0.4)
* Improving better control of spaces (v2.1.0)
```

## Starting in the Browser
```html
<html>
    <head>
      <title>Teste HTML TO RTF</title>
      <script src="./node_modules/html-to-rtf/app/browser/bundle.js"></script>
      <script type="text/javascript">
        window.onload = function() {
            const html =`<p style="color:#333;" align="center">text of p<b>start b <i>italic with bold</i>final text of b</b><i>italic<i>final text of p </p>`;

            document.getElementById('html').innerHTML = html;
            document.getElementById('rtf').innerHTML = htmlToRtf(html);
        }
      </script>

      <link rel="stylesheet" href="./node_modules/html-to-rtf/app/browser/style.css">
    </head>
    <body>
        <h1>HTML To RTF Example:</h1>
        <div class="container">
            <h2>HTML</h2>
            <textarea id="html" readonly></textarea>
        </div>

        <div class="container">
            <h2>RTF</h2>
            <textarea id="rtf" readonly></textarea>
        </div>
    </body>
  </html>
```
##### Observation:
#
>There is a file example (index.html) in  "./node_modules/html-to-rtf/app/browser/index.html"
#
#
## Starting in the Server
```javascript
var htmlToRtf = require('html-to-rtf');
var html = `
<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
<div>
	<p style="color:#333; margin:5px;" class="test" align="center">
	    text of paragraph <b>text with bold <i>text with italic and bold</i></b><i>text with italic</i>
	</p>
	<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
	<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
	<table>
		<tbody>
			<tr>
                <td><mark>column 1</mark></td>
                <td>column 2</td>
				<td><mark>column 3</mark></td>
				<td>column 4</td>
			</tr>
			<tr>
				<td>content 1</td>
				<td>content 2<br></td>
				<td>content 3<br></td>
				<td>content 4<br></td>
			</tr>
		</tbody>
	</table>
</div>
`
htmlToRtf.saveRtfInFile('<Path>/<FileName>.rtf', htmlToRtf.convertHtmlToRtf(html))
```

>  Now test in your preferred text editor (wordpad, word, libreoffice, ...).
##

##### Important:
#
> You can't copy the output of terminal.
> Save the output at a file.rtf

### Allowed html tags
```html
<b>, <br>, <center>, <div>, <em>, <font>, <h1>, <h2>, <h3>, <h4>,
<h5>, <h6>, <i>, <li>, <mark>, <p>, <ol>, <s>, <span>, <sub>, <sup>,
<strong>, <table>, <td>, <th>, <tr>, <u>, <ul>
```
### Allowed style properties

> color(Hex and Rgb), font-size(px), text-align


## Running the tests
```
$ gulp tests
```

## Author

> * **Ozires R.S.O.F**

## License
This project is licensed under the MIT License
