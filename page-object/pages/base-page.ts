import {Page, expect} from '@playwright/test';
import * as baselocators from '../../page-object/locators/base-page-loc.json';

export class BasePage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async visitHomePage() {
        await this.page.goto('/');
    }

    public async clickLinkHeader(linkName: string) {
        switch(linkName) {
            case 'Log in':
                await this.page.locator(baselocators.loginLink).click();
                break;
            default:
                console.log('Invalid option.');
        }
    }

}