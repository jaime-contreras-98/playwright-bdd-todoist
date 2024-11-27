import { Page, expect, request } from '@playwright/test';
import * as homelocators from '../../page-object/locators/home-page-loc.json';
import * as homedata from '../../fixtures/home-data.json';
import * as apiendpoints from '../../fixtures/data/endpoints.json';

export class HomePage {

    private page: Page;

    constructor(page: any) {
        this.page = page;
    };

    public async assertHomeElements() {
        await expect(this.page.locator(homelocators.textLabel)).toHaveText(homedata.days.today);
        await expect(this.page.locator(homelocators.textLabel)).toBeVisible();
    };

    public async clickInboxMenu() {
        await this.page.locator(homelocators.sideBar.inboxBtn).hover();
        await this.page.locator(homelocators.sideBar.inboxBtn).click({ force: true });
        await expect(this.page.locator(homelocators.textLabel)).toHaveText(homedata.sideBarOptions.inbox);
    };

    public async createTaskInbox(taskName: string, taskDescription: string, dateTime: string, priority: string) {
        await this.clickInboxMenu();
        await this.page.locator(homelocators.sideBar.addTaskBtn).click();
        await this.page.locator(homelocators.newTaskDiv.taskNameInp).fill(taskName);
        await this.page.locator(homelocators.newTaskDiv.descriptionInp).fill(taskDescription);
        if (dateTime != null) {
            await this.page.locator(homelocators.newTaskDiv.dueDateBtn).click();
            await this.page.locator(homelocators.newTaskDiv.dueDateList).getByText(dateTime).click();
        }
        if (priority != null) {
            await this.page.locator(homelocators.newTaskDiv.priorityBtn).click();
            await this.page.locator(homelocators.newTaskDiv.priorityList).getByText(priority).click();
        }
        await this.page.locator(homelocators.newTaskDiv.addTaskBtn).click();

        await expect(this.page.locator(homelocators.toastContainer.toastDiv)).toBeVisible();
        await expect(this.page.locator(homelocators.toastContainer.toastText)).toHaveText(homedata.tasks.toastNew);
    };

    public async createSubTaskInbox(taskName: string, subTaskName: string, taskDescription: string, dateTime: string, priority: string) {
        await this.findTaskName(taskName);
        await this.page.locator(homelocators.taskEditorDiv.addSubTaskBtn).click();
        await this.page.locator(homelocators.newSubTaskDiv.taskNameInp).fill(subTaskName);
        await this.page.locator(homelocators.newSubTaskDiv.descriptionInp).fill(taskDescription);
        if (dateTime != null) {
            await this.page.locator(homelocators.newSubTaskDiv.dueDateBtn).click();
            await this.page.locator(homelocators.newSubTaskDiv.dueDateList).getByText(dateTime).click();
        }
        if (priority != null) {
            await this.page.locator(homelocators.newSubTaskDiv.priorityBtn).click();
            await this.page.locator(homelocators.newSubTaskDiv.priorityList).getByText(priority).click();
        }
        await this.page.locator(homelocators.newSubTaskDiv.addTaskBtn).click();
    };

    public async findTaskName(taskName: string) {
        var taskNameIndex = null;
        const taskAddedName = this.page.locator(homelocators.newTaskDiv.addedTaskNameLbl);

        try {
            if ((await taskAddedName.allTextContents()).includes(taskName)) {
                await taskAddedName.allTextContents().then(taskNamesArr => {
                    for (var i = 0; i < taskNamesArr.length; i++)
                        if (taskNamesArr[i] === taskName)
                            taskNameIndex = taskNamesArr.indexOf(taskName);
                });
                await taskAddedName.nth(taskNameIndex).click();
            }
        } catch (err) {
            throw new Error('Task with that name: ' + taskName + ' does not exists. \n' + err);
        }
    };

    public async modifyTaskInbox(oldTaskName: string, newTaskName: string, newTaskDescription: string) {
        await this.findTaskName(oldTaskName);
        await this.page.locator(homelocators.taskEditorDiv.nameInp).click();
        await this.page.locator(homelocators.taskEditorDiv.nameInp).clear();
        await this.page.locator(homelocators.taskEditorDiv.nameInp).fill(newTaskName);
        await this.page.locator(homelocators.taskEditorDiv.descrInp).clear();
        await this.page.locator(homelocators.taskEditorDiv.descrInp).fill(newTaskDescription);
        await this.page.locator(homelocators.taskEditorDiv.saveBtn).click();
    };

    public async deleteTaskInbox(taskName: string) {
        await this.findTaskName(taskName);
        await this.page.locator(homelocators.taskEditorDiv.moreOptionsBtn).click();
        await this.page.locator(homelocators.taskEditorDiv.optionsMenu.deleteBtn).click();
        await this.page.locator(homelocators.taskEditorDiv.optionsMenu.dialog.deleteBtn).click();
    };

    public async checkTaskInbox(taskName: string) {
        await this.findTaskName(taskName);
        await this.page.locator(homelocators.taskEditorDiv.checkTaskBtn).click();
    };

    public async validateTaskModifiedName(oldTaskName: string, newTaskName: string, newTaskDescription: string) {
        const expectTaskLoc = '//div /div';
        expect(await this.page.locator(homelocators.taskEditorDiv.nameInp).locator(expectTaskLoc)).not.toHaveText(oldTaskName);
        expect(await this.page.locator(homelocators.taskEditorDiv.nameInp).locator(expectTaskLoc)).toHaveText(newTaskName);
        expect(await this.page.locator(homelocators.taskEditorDiv.descrInp).locator(expectTaskLoc)).toHaveText(newTaskDescription);
    };

    public async validateTaskExistsInbox(taskName: string, taskDescription: string) {
        expect(await this.page.locator(homelocators.newTaskDiv.addedTaskNameLbl).last()).toContainText(taskName);
        expect(await this.page.locator(homelocators.newTaskDiv.addedTaskDescrLbl).last()).toContainText(taskDescription);
    };

    public async validateSubTaskExistsInbox(taskName: string, taskDescription: string) {
        expect(await this.page.locator(homelocators.newSubTaskDiv.subTasksLbl)).toContainText(homedata.subTasks.name);
        expect(await this.page.locator(homelocators.newSubTaskDiv.addedTaskNameLbl).last()).toContainText(taskName);
        expect(await this.page.locator(homelocators.newSubTaskDiv.addedTaskDescrLbl).last()).toContainText(taskDescription);
    };

    public async validateTaskNotExists(taskName: string) {
        expect((await this.page.locator(homelocators.newTaskDiv.addedTaskNameLbl).allTextContents()).includes(taskName)).toBeFalsy();
        expect((await this.page.locator(homelocators.newTaskDiv.addedTaskNameLbl).allTextContents()).includes(taskName)).not.toBeTruthy();
    };

    public async validateTaskWasChecked() {
        const buttons = this.page.locator(homelocators.taskEditorDiv.sideMenu.allBtns);
        expect(await this.page.locator(homelocators.alert.alertDiv)).toBeVisible();
        expect(await this.page.locator(homelocators.alert.alertDiv)).toContainText(homedata.tasks.checkedMsg);
        expect(await this.page.locator(homelocators.taskEditorDiv.checkTaskBtn)).toHaveAttribute('aria-checked', 'true');

        for (var i = 0; i < await buttons.count(); i++)
            expect(await buttons.nth(i)).toHaveAttribute('aria-disabled', 'true');
    };

    public async createTaskViaApi(token: string, taskName: string, taskDescription: string, priorityNum: number) {
        const context = await request.newContext();
        const response = await context.post(apiendpoints.tasks, {
            headers: {
                'Authorization': token
            },
            data: {
                'content': taskName,
                'description': taskDescription,
                'priority': priorityNum
            }
        });
        const responseBody = await response.json();
        await expect(response.status()).toBe(200);
        await expect(responseBody.content).toBe(taskName);
        await expect(responseBody.description).toBe(taskDescription);
        await expect(responseBody.priority).toBe(priorityNum);
    };
}