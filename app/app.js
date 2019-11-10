const Rtf = require('./src/rtf/rtf.class');

var htmlOfExample = `
<html>
	<head>
		<style>
			.test {
				color: rgb(20, 20, 20);
				background:#333;
			}
		</style>
	</head>
	<body>
		<h1>Title <span style="color:rgb(255,0,0);">with</span> tag h1<h1>
		<div id="content">
			<p style="color:#333; margin:5px;" class="test" align="center">text of p<b>start b <i>italic with  bold</i>final text of b</b><i>italic</i>final text of p</p>
			<p style="color:rgb(255,0,0);" align="right">red paragraph => right with tag</p>
			<p style="color:rgb(0,0,255); text-align:center;">blue paragraph => center with style</p>
			<table>
					<tbody>
						<tr>
							<td>
								column 1
							</td>
							<td>
								column 2
							</td>
							<td>
								column 3
							</td>
							<td>
								column 4
							</td>
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
	</body>
</html>`;

let htmlToRtf = new Rtf();
htmlToRtf.convertHtmlToRtf(htmlOfExample);
// htmlToRtf.saveRtfInFile('filePath', htmlToRtf.convertHtmlToRtf(htmlOfExample));