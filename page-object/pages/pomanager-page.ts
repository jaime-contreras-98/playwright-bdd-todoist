import {Page,expect} from '@playwright/test';
import {BasePage} from '../pages/base-page';
import {LoginPage} from '../pages/login-page';
import {HomePage} from '../pages/home-page';

export class POManager {

    private page: Page;
    private basePage: BasePage;
    private loginPage: LoginPage;
    private homePage: HomePage;

    constructor(page: Page) {
        this.page = page;
        this.basePage = new BasePage(page);
        this.loginPage = new LoginPage(page);
        this.homePage = new HomePage(page);
    }

    public getBasePage() {
        return this.basePage;
    }

    public getLoginPage() {
        return this.loginPage;
    }

    public getHomePage() {
        return this.homePage;
    }
}