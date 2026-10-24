import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test('Remove product from cart and continue shopping', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');

  const productTitle = 'Sauce Labs Backpack';
  await inventoryPage.addToCartByTitle(productTitle);
  await inventoryPage.openCart();

  await expect(page.getByText(productTitle, { exact: true })).toBeVisible();

  await cartPage.removeFromCartByTitle(productTitle);

  await expect(page.getByText(productTitle, { exact: true })).not.toBeVisible();

  await cartPage.continueShopping();

  await expect(page).toHaveURL('/inventory.html');
});
