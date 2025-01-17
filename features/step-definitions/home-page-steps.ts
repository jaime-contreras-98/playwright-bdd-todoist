import { Before, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { POManager } from '../../page-object/pages/pomanager';
import { CustomWorld } from '../../utils/custom-world';
import { LOGIN_CREDENTIALS, LOGIN_INFO} from '../../fixtures/data/constants';
import * as homelocators from '../../page-object/locators/home-page-loc.json';
import * as apiendpoints from '../../fixtures/data/endpoints.json';
import config from '../../utils/config';

var pomanager: POManager;

Before(async function(this: CustomWorld) {
    this.config = config;

    pomanager = new POManager(this.config.page);
});

Given('I create a task with {string}, {string}, {string} and {string}', async(name: string, description: string, dateTime: string, priorityNum: string) => {
    var taskName = "Task Name: " + name;
    var taskDescription = "Task Description: " + description;

    await pomanager.getHomePage().createTaskInbox(taskName, taskDescription, dateTime, priorityNum);
});

Given('I create a task via API with {string}, {string} and {string}', async(taskName: string, taskDescription: string, priorityNum: string) => {
    var token = await pomanager.getLoginPage().getLoginInfoApi(LOGIN_CREDENTIALS.email, LOGIN_CREDENTIALS.password, LOGIN_INFO.token);
    await pomanager.getHomePage().createTaskViaApi(token, taskName, taskDescription, Number(priorityNum));
});

When('I click on inbox button', async() => {
    await pomanager.getHomePage().clickInboxMenu();
});

When('I click task {string}', async(taskName: string) => {
    var taskNameIndex = null;
    const taskAddedName = config.page.locator(homelocators.newTaskDiv.addedTaskNameLbl);
    
    await config.page.waitForRequest('https://www.google-analytics.com/**');
    if((await taskAddedName.allTextContents()).includes(taskName)) {
        await taskAddedName.allTextContents().then(taskNamesArr => {
            for(var i=0; i < taskNamesArr.length; i++)
                if(taskNamesArr[i] === taskName)
                    taskNameIndex = taskNamesArr.indexOf(taskName);
        });
        await taskAddedName.nth(taskNameIndex).click();
    } else throw new Error('Task with that name: ' + taskName + ' does not exists. \n');
});

When('change it with values {string} and {string}', async(newTaskName: string, newTaskDescription: string) => {
    await config.page.locator(homelocators.taskEditorDiv.nameInp).click();
    await config.page.locator(homelocators.taskEditorDiv.nameInp).clear();
    await config.page.locator(homelocators.taskEditorDiv.nameInp).fill(newTaskName);
    await config.page.locator(homelocators.taskEditorDiv.descrInp).clear();
    await config.page.locator(homelocators.taskEditorDiv.descrInp).fill(newTaskDescription);
    await config.page.locator(homelocators.taskEditorDiv.saveBtn).click();
});

Then('I validate presence of task created with {string} and {string}', async(name: string, description: string) => {
    await pomanager.getHomePage().validateTaskExistsInbox(name, description);
});

Then('I validate homepage presence', async () => {
    await pomanager.getHomePage().assertHomeElements();
});

Then('I validate task old name {string} does not exists and validate new {string} and {string}', async(oldName: string, newName: string, newDescription: string) => {
    await pomanager.getHomePage().validateTaskModifiedName(oldName, newName, newDescription);
});
