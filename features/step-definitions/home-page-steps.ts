import { Before, Given, When, Then } from '@cucumber/cucumber';
import { POManager } from '../../page-object/pages/pomanager';
import { CustomWorld } from '../../utils/custom-world';
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

Then('I validate presence of task created with {string} and {string}', async(name: string, description: string) => {
    await pomanager.getHomePage().validateTaskExistsInbox(name, description);
});


Then('I validate homepage presence', {timeout:30000}, async () => {
    await pomanager.getHomePage().assertHomeElements();
});
