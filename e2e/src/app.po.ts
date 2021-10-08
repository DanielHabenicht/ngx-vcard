import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getNormalDownloadButton() {
    return element(by.id('downloadButtonNormal'));
  }

  getFunctionDownloadButton() {
    return element(by.id('downloadButtonFunction'));
  }
}
