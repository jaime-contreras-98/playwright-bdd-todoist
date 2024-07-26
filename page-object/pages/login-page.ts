import {Page, expect} from '@playwright/test';
import * as loginlocators from '../../page-object/locators/login-page-loc.json';
import * as logindata from '../../fixtures/login-data.json';

export class LoginPage {

    private page: Page;

    constructor(page: any) {
        this.page = page;
    }

    public async login(username: string, password: string) {
        await this.page.locator(loginlocators.emailInput).fill(username);
        await this.page.locator(loginlocators.passwordInput).fill(password);
        await this.page.locator(loginlocators.loginBtn).click();
    };

    public async assertIncorrectLoginMsg() {
        await expect(this.page.locator(loginlocators.errorMsgLabel)).toHaveText(logindata.wrongCredentials);
        await expect(this.page.locator(loginlocators.errorMsgLabel)).toBeVisible();
    }
}