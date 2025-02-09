import { Page } from '@playwright/test';
import { BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { BaseTest } from '../../../utils/base-test';
import { CustomWorld } from '../../../utils/custom-world';
import config from '../../../utils/config';

var page: Page;
var baseTest: BaseTest;

setDefaultTimeout(20000);

BeforeAll(async function(this: CustomWorld) {
    this.config = config;
  
    baseTest = new BaseTest();
    page = await baseTest.initPage();
    this.config.page = page;
  });