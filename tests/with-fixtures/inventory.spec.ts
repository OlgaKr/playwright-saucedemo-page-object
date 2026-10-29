import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test('Add product to cart and verify name and price', async ({
  page,
  cartPage,
  inventoryPage,
}) => {
  await expect(page).toHaveURL('/inventory.html');

  const productTitle = 'Sauce Labs Backpack';
  const productPrice = await inventoryPage.getPriceByTitle(productTitle);
  await inventoryPage.addToCartByTitle(productTitle);
  await inventoryPage.openCart();

  const cartProductPrice = await cartPage.getPriceByTitle(productTitle);

  expect(cartProductPrice).toBe(productPrice);
  await expect(page.getByText(productTitle, { exact: true })).toBeVisible();
});

test('Remove product from cart via inventory', async ({
  page,
  inventoryPage,
}) => {
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
