const Rtf 			= require('./src/rtf/rtf.class');

var htmlOfExample = `
<head>
	<style>
		.test {
			color: rgb(20, 20, 20);
			background:#333;
		}
	</style>
</head>
<body>
<div id="content">
	<p style="color:#333; margin:5px;" class="test" align="center">texto de p<b>negrito <i>italico com  negrito</i>texto final b</b><i>italico</i>texto final de p</p>
	<p style="color:rgb(255,0,0);" align="right">paragrafo vermelho => right with tag</p>
	<p style="color:rgb(0,0,255); text-align:center;">paragrafo blue => center with style</p>
	<table>
			<tbody>
				<tr>
					<td>
						coluna1
					</td>
					<td>
						coluna2
					</td>
					<td>
						coluna3
					</td>
					<td>
						coluna4
					</td>
				</tr>
				<tr>
					<td>conteudo1</td>
					<td>conteudo2<br></td>
					<td>conteudo3<br></td>
					<td>conteudo1<br></td>
				</tr>
			</tbody>
		</table>
</div>
</body>`;

var rtf = new Rtf();
rtf.saveInFolderFiles(rtf.convertHtmlToRtf(htmlOfExample));

