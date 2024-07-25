import { test, expect } from '@playwright/test';
import 'dotenv/config';
import * as baselocators from '../page-object/locators/base-page-loc.json';
import * as loginlocators from '../page-object/locators/login-page-loc.json';

test.only('Basic login todoist', async ({ page }) => {
  await page.goto('/');
  await page.locator(baselocators.loginLink).click();
  await page.locator(loginlocators.emailInput).fill(process.env.USER_EMAIL);
  await page.locator(loginlocators.passwordInput).fill(process.env.USER_PASSWORD);
  await page.locator(loginlocators.loginBtn).click();
});

