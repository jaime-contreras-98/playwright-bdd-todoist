import { World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';

export interface CustomWorld extends World {
    config: {
        page: Page;
    };
}
