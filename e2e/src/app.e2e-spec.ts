import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display download Button', () => {
    expect(page.getNormalDownloadButton().getText()).toEqual('Download VCard!');
  });

  it('should download the vCard File - normal', () => {
    const path = require('path');
    const downloadsPath = path.resolve(__dirname, './');
    const absFilePath =
      (downloadsPath as string).slice(0, -3) + 'downloads/John Doe.vcf';
    const fs = require('fs');

    if (fs.existsSync(absFilePath)) {
      // Make sure the browser doesn't have to rename the download.
      fs.unlinkSync(absFilePath);
    }

    page.getNormalDownloadButton().click();

    browser.driver
      .wait(function () {
        // Wait until the file has been downloaded.
        // We need to wait thus as otherwise protractor has a nasty habit of
        // trying to do any following tests while the file is still being
        // downloaded and hasn't been moved to its final location.
        return fs.existsSync(absFilePath);
      }, 30000)
      .then(function () {
        // Do whatever checks you need here.  This is a simple comparison;
        // for a larger file you might want to do calculate the file's MD5
        // hash and see if it matches what you expect.
        expect(fs.readFileSync(absFilePath, { encoding: 'utf8' })).toEqual(
          `BEGIN:VCARD\nVERSION:4.0\nFN:John Doe\nN:Doe;John;;;\nEND:VCARD\n`
        );
      });
  });

  it('should download the vCard File - function', () => {
    const path = require('path');
    const downloadsPath = path.resolve(__dirname, './');
    const absFilePath =
      (downloadsPath as string).slice(0, -3) + 'downloads/John Doe.vcf';
    const fs = require('fs');

    if (fs.existsSync(absFilePath)) {
      // Make sure the browser doesn't have to rename the download.
      fs.unlinkSync(absFilePath);
    }

    page.getFunctionDownloadButton().click();

    browser.driver
      .wait(function () {
        // Wait until the file has been downloaded.
        // We need to wait thus as otherwise protractor has a nasty habit of
        // trying to do any following tests while the file is still being
        // downloaded and hasn't been moved to its final location.
        return fs.existsSync(absFilePath);
      }, 30000)
      .then(function () {
        // Do whatever checks you need here.  This is a simple comparison;
        // for a larger file you might want to do calculate the file's MD5
        // hash and see if it matches what you expect.
        expect(fs.readFileSync(absFilePath, { encoding: 'utf8' })).toEqual(
          `BEGIN:VCARD\nVERSION:4.0\nFN:John Auto Doe\nN:Doe;John;Auto;;\nEND:VCARD\n`
        );
      });
  });
});
