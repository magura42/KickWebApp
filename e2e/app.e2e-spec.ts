import { KickWebAppPage } from './app.po';

describe('kick-web-app App', () => {
  let page: KickWebAppPage;

  beforeEach(() => {
    page = new KickWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
