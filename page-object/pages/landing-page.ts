import 'dotenv/config';
import {Page} from '@playwright/test';
import * as baselocators from '../locators/landing-page-loc.json';

export class BasePage {

    private page: Page;

    constructor(page: any) {
        this.page = page;
    }

    public async visitHomePage() {
        await this.page.goto(process.env.PROD_URL);
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