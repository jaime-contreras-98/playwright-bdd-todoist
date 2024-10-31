import { test } from '@playwright/test';
import { POManager } from '../page-object/pages/pomanager';
import * as basedata from '../fixtures/base-data.json';
import * as constants from '../fixtures/data/constants';

let pomanager: POManager;
let basePage: any;
let loginPage: any;
let homePage: any;

test.beforeEach(async ({ page }) => {
  pomanager = new POManager(page);
  basePage = pomanager.getBasePage();
  loginPage = pomanager.getLoginPage();
  homePage = pomanager.getHomePage();

  await basePage.visitHomePage();
  await basePage.clickLinkHeader(basedata.links.login);
});

test('Basic incorrect login todoist', async () => {
  await loginPage.login(constants.LOGIN_CREDENTIALS.fakeEmail, constants.LOGIN_CREDENTIALS.fakePassword);
  await loginPage.assertIncorrectLoginMsg();
});

test('Basic correct login todoist', async () => {
  await loginPage.login(constants.LOGIN_CREDENTIALS.email, constants.LOGIN_CREDENTIALS.password);
  await homePage.assertHomeElements();
});