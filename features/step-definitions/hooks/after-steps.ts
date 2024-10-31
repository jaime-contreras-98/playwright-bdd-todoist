import { After, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../../../utils/custom-world';
import config from '../../../utils/config';

After(async function(scenario: any) {
    if(scenario.result.status === Status.FAILED) {
        const buffer = await this.config.page.screenshot();
        const decodedImage = Buffer.from(buffer, 'base64');
        this.attach(decodedImage, "image/png");
    }
});

AfterAll(async function(this: CustomWorld) {
    this.config = config;

    this.config.page.waitForTimeout(1500);
});
