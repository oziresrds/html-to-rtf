import { EditorPacsPage } from './app.po';

describe('editor-pacs App', () => {
  let page: EditorPacsPage;

  beforeEach(() => {
    page = new EditorPacsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
