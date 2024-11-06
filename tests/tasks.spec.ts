import { test } from '@playwright/test';
import { POManager } from '../page-object/pages/pomanager';
import * as homedata from '../fixtures/home-data.json';
import * as constants from '../fixtures/data/constants';

let pomanager : POManager;
let loginPage: any;
let homePage: any;

test.beforeEach(async({page}) => {
    pomanager = new POManager(page);
    loginPage = pomanager.getLoginPage();
    homePage = pomanager.getHomePage();

    const cookieSession = await loginPage.getLoginInfoApi(constants.LOGIN_CREDENTIALS.email, constants.LOGIN_CREDENTIALS.password, constants.LOGIN_INFO.cookie);
    await loginPage.insertTokenSession(cookieSession);
});

test('Create a new Task', async() => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, null, null);
});

test('Create a new Task for Today as Priority 2', async() => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, homedata.days.today, homedata.priority.two);
});
