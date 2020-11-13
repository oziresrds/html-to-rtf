const Rtf = require('./app/src/rtf/rtf.class');
var htmlOfExample = `
<!-- Translation from RTF performed by UnRTF, version 0.21.10 -->
<!--font table contains 1 fonts total-->\n
<p><span style=\"font-size: 11pt;\"> </span></p>\n
<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n
<tbody>\n
<tr>\n
<td style=\"text-align: justify;\" colspan=\"2\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">teste editado no vscode</span></span></td>\n
<td style=\"text-align: justify;\" colspan=\"4\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">teste editado no vscode</span></span></td>\n
</tr>\n
<tr>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">12</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">748</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">12</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
</tr>\n
<tr>\n
<td style=\"text-align: justify;\" colspan=\"2\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">950</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">8fgdg</span></span></td>\n
<td style=\"text-align: justify;\" colspan=\"3\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">12</span></span></td>\n
</tr>\n
<tr>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">9</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">12</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
<td style=\"text-align: justify;\"><span style=\"font-size: 11pt;\"><span style=\"color: #000000;\">11</span></span></td>\n
</tr>\n
</tbody>\n
</table>\n`;

let htmlToRtf = new Rtf();
// htmlToRtf.convertHtmlToRtf(htmlOfExample);
htmlToRtf.saveRtfInFile('/mnt/c/Users/lucas/OneDrive/Documentos/table.rtf', htmlToRtf.convertHtmlToRtf(htmlOfExample));
