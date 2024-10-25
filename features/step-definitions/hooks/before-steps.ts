import { Page } from '@playwright/test';
import { BeforeAll } from '@cucumber/cucumber';
import { BaseTest } from '../../../utils/base-test';
import { CustomWorld } from '../../../utils/custom-world';
import config from '../../../utils/config';

var page: Page;
var baseTest: BaseTest;

BeforeAll(async function(this: CustomWorld) {
    this.config = config;
  
    baseTest = new BaseTest();
    page = await baseTest.initPage();
    this.config.page = page;
  });