import { ChorePage } from './app.po';

describe('chore App', function() {
  let page: ChorePage;

  beforeEach(() => {
    page = new ChorePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
