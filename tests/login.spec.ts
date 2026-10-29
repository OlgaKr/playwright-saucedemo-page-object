import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from './test-data';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login(users.standard);

  await expect(page).toHaveURL('/inventory.html');
});
