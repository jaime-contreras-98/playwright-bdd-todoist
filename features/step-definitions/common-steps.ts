import { Given, When, Then} from '@cucumber/cucumber';

var page;

Given('I visit {string} website', async (urlName: string) => {
  await page.goto(urlName);
});