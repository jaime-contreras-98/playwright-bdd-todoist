import { World } from '@cucumber/cucumber';
import { Page } from '@playwright/test';
import { POManager } from '../page-object/pages/pomanager';

export interface CustomWorld extends World {
    config: {
        page: Page;
    };
}
