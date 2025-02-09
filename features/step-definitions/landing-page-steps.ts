import { Before, Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { POManager } from '../../page-object/pages/pomanager';
import { CustomWorld } from '../../utils/custom-world';
import config from '../../utils/config';

var pomanager: POManager;

Before(async function(this: CustomWorld) {
  this.config = config;

  pomanager = new POManager(this.config.page);
});

Given('I click on {string} on header bar', async (linkName: string) => {
  await pomanager.getBasePage().clickLinkHeader(linkName);
});
