import {Page, expect, request} from '@playwright/test';
import {LOGIN_INFO} from '../../fixtures/data/constants';
import * as apiendpoint from '../../fixtures/data/endpoints.json';
import * as loginlocators from '../../page-object/locators/login-page-loc.json';
import * as logindata from '../../fixtures/login-data.json';
import 'dotenv/config';

export class LoginPage {

    private page: Page;

    constructor(page: any) {
        this.page = page;
    };

    public async visitLoginPage() {
        await this.page.goto(process.env.PROD_URL + "/auth/login");
    };

    public async login(username: string, password: string) {
        await this.page.locator(loginlocators.emailInput).fill(username);
        await this.page.locator(loginlocators.passwordInput).fill(password);
        await this.page.locator(loginlocators.loginBtn).click();
    };

    public async assertIncorrectLoginMsg() {
        await expect(this.page.locator(loginlocators.errorMsgLabel)).toHaveText(logindata.wrongCredentials);
        await expect(this.page.locator(loginlocators.errorMsgLabel)).toBeVisible();
    };

    public async getLoginInfoApi(username: string, password: string, param: string) {
        const context = await request.newContext();
        const response = await context.post(apiendpoint.login, {
            headers: {
                'Content-Type': 'application/json',
                'Doist-Platform': 'web'
            },
            data: {
                'email': username, 
                'password': password,
                'web_session': true
            }
        });

        await expect(response.status()).toBe(200);
        await expect(response.body()).not.toBe(null);

        const responseBody = await response.json();
        const bearerToken = 'Bearer ' + responseBody.token;
        const cookieSession = response.headers()['set-cookie'].split('todoistd')[1].split('Domain')[0].replace(/[":,;]/g,"").slice(1).trim();
        
        if(param === LOGIN_INFO.token) return bearerToken;
        else if(param === LOGIN_INFO.cookie) return cookieSession;

        return null;
    };

    public async insertTokenSession(cookieSession: string) {
        await this.page.context().addCookies([
            {
                "name": "todoistd",
                "value": '"' + cookieSession + '"',
                "domain": ".todoist.com",
                "path": "/",
                "expires": 1762013894.751695,
                "httpOnly": true,
                "secure": true,
                "sameSite": "None"
              }
        ]);
        await this.page.goto(apiendpoint.home);
    }
}