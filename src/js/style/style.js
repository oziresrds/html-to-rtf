function getRtfFontSizeReference(value) {
  const ONE_PIXEL_IN_POINT = 0.75;
  let valueWithoutUnit;

  if(value.includes('px')) {
    valueWithoutUnit = value.replace('px', '');
    return '\\fs' + Math.floor(parseInt(valueWithoutUnit) * ONE_PIXEL_IN_POINT);
  }
  return '';
}