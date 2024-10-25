import {Page, expect} from '@playwright/test';
import * as homelocators from '../../page-object/locators/home-page-loc.json';
import * as homedata from '../../fixtures/home-data.json';

export class HomePage {

    private page: Page;
    
    constructor(page: any) {
        this.page = page;
    }

    public async assertHomeElements(){
        await expect(this.page.locator(homelocators.textLabel)).toHaveText(homedata.days.today);
        await expect(this.page.locator(homelocators.textLabel)).toBeVisible();
    }

    public async createTaskInbox(taskName: string, taskDescription: string, dateTime: string, priority: string) {
        await this.page.locator(homelocators.sideBar.inboxBtn).hover();
        await this.page.locator(homelocators.sideBar.inboxBtn).click({force: true});
        await expect(this.page.locator(homelocators.textLabel)).toHaveText(homedata.sideBarOptions.inbox);

        await this.page.locator(homelocators.sideBar.addTaskBtn).click();
        await this.page.locator(homelocators.newTaskDiv.taskNameInp).fill(taskName);
        await this.page.locator(homelocators.newTaskDiv.descriptionInp).fill(taskDescription);
        if(dateTime != null){
            await this.page.locator(homelocators.newTaskDiv.dueDateBtn).click();
            await this.page.locator(homelocators.newTaskDiv.dueDateList).getByText(dateTime).click();
        }
        if(priority != null) {
            await this.page.locator(homelocators.newTaskDiv.priorityBtn).click();
            await this.page.locator(homelocators.newTaskDiv.priorityList).getByText(priority).click();
        }
        await this.page.locator(homelocators.newTaskDiv.addTaskBtn).click();

        await expect(this.page.locator(homelocators.toastContainer.toastDiv)).toBeVisible();
        await expect(this.page.locator(homelocators.toastContainer.toastText)).toHaveText(homedata.tasks.toastNew);
    }

    public async validateTaskExistsInbox(taskName: string, taskDescription: string) {
        await expect(this.page.locator(homelocators.newTaskDiv.addedTaskNameLbl).last()).toContainText(taskName);
        await expect(this.page.locator(homelocators.newTaskDiv.addedTaskDescrLbl).last()).toContainText(taskDescription);
    };

}