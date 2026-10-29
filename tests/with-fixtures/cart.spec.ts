import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test('Remove product from cart and continue shopping', async ({
  inventoryPage,
  cartPage,
  page,
}) => {
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
