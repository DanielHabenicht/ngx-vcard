import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getDownloadButton() {
    return element(by.id('downloadButton'));
  }
}
