import { test } from '@playwright/test';
import { POManager } from '../page-object/pages/pomanager';
import { HomePage } from '../page-object/pages/home-page';
import * as homedata from '../fixtures/home-data.json';
import * as constants from '../fixtures/data/constants';

let pomanager: POManager;
let loginPage: any;
let homePage: any;
let token: HomePage;

test.beforeEach(async ({ page }) => {
    pomanager = new POManager(page);
    loginPage = pomanager.getLoginPage();
    homePage = pomanager.getHomePage();

    token = await loginPage.getLoginInfoApi(constants.LOGIN_CREDENTIALS.email, constants.LOGIN_CREDENTIALS.password, constants.LOGIN_INFO.token);
    const cookieSession = await loginPage.getLoginInfoApi(constants.LOGIN_CREDENTIALS.email, constants.LOGIN_CREDENTIALS.password, constants.LOGIN_INFO.cookie);
    await loginPage.insertTokenSession(cookieSession);
});

test('Create a new Task', async () => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, null, null);
    await homePage.validateTaskExistsInbox(constants.TASKS.name, constants.TASKS.descr);
});

test('Create a new Task for Today as Priority 2', async () => {
    await homePage.createTaskInbox(constants.TASKS.name, constants.TASKS.descr, homedata.days.today, homedata.priority.two);
    await homePage.validateTaskExistsInbox(constants.TASKS.name, constants.TASKS.descr);
});

test('Modify a task created via API', async () => {
    await homePage.createTaskViaApi(token, constants.TASKS.name, constants.TASKS.descr, homedata.priority.num[1]);
    await homePage.clickInboxMenu();
    await homePage.validateTaskExistsInbox(constants.TASKS.name, constants.TASKS.descr);
    await homePage.modifyTaskInbox(constants.TASKS.name, constants.TASKS.newName, constants.TASKS.newDescr);
    await homePage.validateTaskModifiedName(constants.TASKS.name, constants.TASKS.newName, constants.TASKS.newDescr);
});

test('Delete a task created via API', async () => {
    await homePage.createTaskViaApi(token, constants.TASKS.name, constants.TASKS.descr, homedata.priority.num[1]);
    await homePage.clickInboxMenu();
    await homePage.validateTaskExistsInbox(constants.TASKS.name, constants.TASKS.descr);
    await homePage.deleteTaskInbox(constants.TASKS.name);
    await homePage.validateTaskNotExists(constants.TASKS.name);
});

test.only('Check a task created via API', async () => {
    await homePage.createTaskViaApi(token, constants.TASKS.name, constants.TASKS.descr, homedata.priority.num[1]);
    await homePage.clickInboxMenu();
    await homePage.validateTaskExistsInbox(constants.TASKS.name, constants.TASKS.descr);

});

test('Add a subtask to task created via API', async () => {

});