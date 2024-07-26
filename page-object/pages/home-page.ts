import {Page, expect} from '@playwright/test';
import * as homelocators from '../../page-object/locators/home-page-loc.json';
import * as homedata from '../../fixtures/home-data.json';

export class HomePage {

    private page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

    public async assertHomeElements(){
        await expect(this.page.locator(homelocators.todayLabel)).toHaveText(homedata.days.today);
        await expect(this.page.locator(homelocators.todayLabel)).toBeVisible();
    }

}