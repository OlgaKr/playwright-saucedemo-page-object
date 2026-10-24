import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';

test('Add product to cart and verify name and price', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');

  const productTitle = 'Sauce Labs Backpack';
  const productPrice = await inventoryPage.getPriceByTitle(productTitle);
  await inventoryPage.addToCartByTitle(productTitle);
  await inventoryPage.openCart();

  const cartProductPrice = await cartPage.getPriceByTitle(productTitle);

  expect(cartProductPrice).toBe(productPrice);
  await expect(page.getByText(productTitle, { exact: true })).toBeVisible();
});

test('Remove product from cart via inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL('/inventory.html');

  const productTitle = 'Sauce Labs Backpack';
  const productCard = page.getByTestId('inventory-item').filter({
    has: page.getByText(productTitle, { exact: true }),
  });

  await inventoryPage.addToCartByTitle(productTitle);

  await expect(
    productCard.getByRole('button', { name: 'Remove', exact: true }),
  ).toBeVisible();

  await inventoryPage.removeFromCartByTitle(productTitle);

  await expect(
    productCard.getByRole('button', { name: 'Add to cart', exact: true }),
  ).toBeVisible();
});
