import { Page } from '@playwright/test';
const playwright = require('@playwright/test');

export class BaseTest {

    page: Page;

    async initPage() {
        const browser = await playwright.chromium.launch({headless: false, args: ['--start-maximized']});
        const context = await browser.newContext({viewport: null});
        this.page = await context.newPage();

        return this.page;
    }
}
