
import { Before, Given, When, Then } from '@cucumber/cucumber';
import {Page,expect} from '@playwright/test';
import * as baselocators from '../../page-object/locators/base-page-loc.json';
import * as loginlocators from '../../page-object/locators/login-page-loc.json';
import * as logindata from '../../fixtures/login-data.json';
import * as constants from '../../fixtures/constants';

const playwright = require('@playwright/test');

var page: Page;

Before(async() => {
  const browser = await playwright.chromium.launch({headless: false});
  const context = await browser.newContext();
  page = await context.newPage();
});

Given('I click on {string} on header bar', async (headerBtn: string) => {
  await page.goto('https://todoist.com/');
  await page.locator(baselocators.loginLink).click();
});

When('I login with {string} and {string} as my credentials', async (username: string, password: string) => {
  await page.locator(loginlocators.emailInput).fill(constants.LOGIN_CREDENTIALS.fakeEmail); // username
  await page.locator(loginlocators.passwordInput).fill(constants.LOGIN_CREDENTIALS.fakePassword); // password
  await page.locator(loginlocators.loginBtn).click();
});

Then('I validate wrong user message', async () => {
  await expect(page.locator(loginlocators.errorMsgLabel)).toHaveText(logindata.wrongCredentials);
  await expect(page.locator(loginlocators.errorMsgLabel)).toBeVisible();
});
