class Table {
  constructor() {
    this.rtfReferenceRow = '\\clbrdrt\\brdrw15\\brdrs\\clbrdrl\\brdrw15\\brdrs\\clbrdrb\\brdrw15\\brdrs\\clbrdrr\\brdrw15\\brdrs\\cellx';
    this.amountOfColumns = 0;
    this.defaultLengthOfPageInTwips = 8500;
  }

  setAmountOfColumns(amountOfColumns) {
    this.amountOfColumns = amountOfColumns;
  }

  getAmountOfColumns() {
    return this.amountOfColumns;
  }

  getCellLength(colSpan) {
    return Math.floor(this.defaultLengthOfPageInTwips/parseInt(colSpan));
  }

  getRtfReferenceRow() {
    return this.rtfReferenceRow;
  }

  buildCellsLengthOfEachColumn(cells) {
    let cellGroup = '';
    let currentIndex = 0;
    cells.forEach((colSpan) => {
      let cellSize = this.getCellLength(this.getAmountOfColumns() - colSpan + 1);
      cellGroup += this.rtfReferenceRow + (cellSize * currentIndex + cellSize);
      currentIndex += colSpan;
    });
    return cellGroup;
  }
}
module.exports = Table;