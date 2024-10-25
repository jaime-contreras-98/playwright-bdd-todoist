import { Before, Given, When, Then } from '@cucumber/cucumber';
import { POManager } from '../../page-object/pages/pomanager';
import { CustomWorld } from '../../utils/custom-world';
import config from '../../utils/config';
import { LOGIN_CREDENTIALS } from '../../fixtures/data/constants';

var pomanager: POManager;

Before(async function(this: CustomWorld) {
  this.config = config;

  pomanager = new POManager(this.config.page);
});

Given('I login with {string} and {string} as my credentials', async (username: string, password: string) => {
  await pomanager.getLoginPage().login(username, password);
});

Given('I login with correct credentials', async() => {
  await pomanager.getLoginPage().login(LOGIN_CREDENTIALS.email, LOGIN_CREDENTIALS.password);
});

Then('I validate wrong user message', async () => {
  await pomanager.getLoginPage().assertIncorrectLoginMsg();
});
