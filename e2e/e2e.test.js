import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popover test', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('open page', async () => {
    await page.goto(baseUrl);
  });

  test('show popover on click', async () => {
    const popover = await page.evaluate(() => {
      const holder = document.querySelector(".popover-holder");
      holder.click();
      return document.querySelector(".popover");
    });
    expect(popover).toBeTruthy();
  });

  test('popover title', async () => {
    const {popoverTitle, expectedTitle} = await page.evaluate(() => {
      const holder = document.querySelector(".popover-holder");
      const popover = document.querySelector(".popover");
      return holder.title, popover.querySelector(".popover__title").textContent;
    });
    expect(popoverTitle).toBe(expectedTitle);
  });

  test('popover message', async () => {
    const { popoverMessage, expectedMessage } = await page.evaluate(() => {
      const holder = document.querySelector(".popover-holder");
      const popover = document.querySelector(".popover");
      return holder.dataset.content, popover.querySelector(".popover__message").textContent;
    });
    expect(popoverMessage).toBe(expectedMessage);
  });

  test('remove popover on click', async () => {
    const popover = await page.evaluate(() => {
      const holder = document.querySelector(".popover-holder");
      holder.click();
      return document.querySelector(".popover");
    });
    expect(popover).toBeNull();
  });
});