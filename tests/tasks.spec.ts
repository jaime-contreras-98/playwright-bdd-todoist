import { test } from '@playwright/test';
import { POManager } from '../page-object/pages/pomanager';
import * as basedata from '../fixtures/base-data.json';
import * as homedata from '../fixtures/home-data.json';
import * as constants from '../fixtures/data/constants';

let pomanager : POManager;
let basePage: any;
let loginPage: any;
let homePage: any;

test.beforeEach(async({page}) => {
    pomanager = new POManager(page);
    basePage = pomanager.getBasePage();
    loginPage = pomanager.getLoginPage();
    homePage = pomanager.getHomePage();

    await basePage.visitHomePage();
    await basePage.clickLinkHeader(basedata.links.login);
    await loginPage.login(constants.LOGIN_CREDENTIALS.email, constants.LOGIN_CREDENTIALS.password);
    await homePage.assertHomeElements();
});

test('Create a new Task', async() => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, null, null);
});

test('Create a new Task for Today as Priority 2', async() => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, homedata.days.today, homedata.priority.two);
});
