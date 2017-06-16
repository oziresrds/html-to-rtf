function addRefenceAlignmentInRtfCode(alignment) {
   addValueInRtfCode(getRtfAlignmentReference(alignment));
}

function getRtfAlignmentReference(alignment) {
   let value;
   switch(alignment) {
      case 'center': value = '\\qc '; break;
      case 'left': value = '\\ql '; break;
      case 'right': value = '\\qr '; break;
      case 'justify': value = '\\qj '; break;
   }
   return value;
}