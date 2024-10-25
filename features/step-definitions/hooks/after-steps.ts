import { AfterAll } from '@cucumber/cucumber';
import { CustomWorld } from '../../../utils/custom-world';
import config from '../../../utils/config';

AfterAll(async function(this: CustomWorld) {
    this.config = config;

    this.config.page.waitForTimeout(2000);
});
