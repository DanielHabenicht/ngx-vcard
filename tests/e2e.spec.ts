import { test, expect } from '@playwright/test';

test('check download button ', async ({ page, baseURL }) => {
  await page.goto(baseURL!);

  await expect(page.getByText('Download VCard!')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');

  page.getByText('Download VCard!').click();
  const download = await downloadPromise;

  const path = require('path');
  const downloadsPath = path.resolve(__dirname, './');
  const absFilePath = path.join(downloadsPath, 'downloads/John Doe.vcf');
  await download.saveAs(absFilePath);

  const fs = require('fs');
  expect(fs.readFileSync(absFilePath, { encoding: 'utf8' })).toEqual(
    `BEGIN:VCARD\nVERSION:4.0\nFN:John Doe\nN:Doe;John;;;\nEND:VCARD\n`,
  );
});

test('check donwload function', async ({ page, baseURL }) => {
  await page.goto(baseURL!);

  await expect(page.getByText('Download generated VCard!')).toBeVisible();

  const downloadPromise = page.waitForEvent('download');

  page.getByText('Download generated VCard!').click();
  const download = await downloadPromise;

  const path = require('path');
  const downloadsPath = path.resolve(__dirname, './');
  const absFilePath = path.join(downloadsPath, 'downloads/John Doe.vcf');
  await download.saveAs(absFilePath);

  const fs = require('fs');
  expect(fs.readFileSync(absFilePath, { encoding: 'utf8' })).toEqual(
    `BEGIN:VCARD\nVERSION:4.0\nFN:John Auto Doe\nN:Doe;John;Auto;;\nEND:VCARD\n`,
  );
});
