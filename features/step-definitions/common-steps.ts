import { Before, Given, When, Then} from '@cucumber/cucumber';
import { POManager } from '../../page-object/pages/pomanager';
import { CustomWorld } from '../../utils/custom-world';
import config from '../../utils/config';

var pomanager: POManager;

Before(async function(this: CustomWorld) {
  this.config = config;

  pomanager = new POManager(this.config.page);
});

Given('I visit home website', async () => {
  await pomanager.getBasePage().visitHomePage();
});