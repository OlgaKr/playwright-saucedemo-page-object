import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';
import { users } from '../test-data';

test('Successful login', async ({ page }) => {
  await expect(page).toHaveURL('/inventory.html');
});

test.describe('Locked user', () => {
  test.use({
    userToLogin: users.locked,
  });

  test('Unsuccessful login', async ({ page }) => {
    await expect(page.getByTestId('error')).toContainText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });
});
