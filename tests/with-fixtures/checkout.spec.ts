import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

test('Full checkout scenario', async ({
  page,
  inventoryPage,
  cartPage,
  checkoutStepOnePage,
  checkoutStepTwoPage,
}) => {
  await expect(page).toHaveURL('/inventory.html');

  const productTitle = 'Sauce Labs Backpack';
  await inventoryPage.addToCartByTitle(productTitle);
  await inventoryPage.openCart();

  await expect(page.getByText(productTitle, { exact: true })).toBeVisible();

  await cartPage.checkout();

  await expect(page).toHaveURL('/checkout-step-one.html');

  await checkoutStepOnePage.fillFirstName('Olga');
  await checkoutStepOnePage.fillLastName('QA');
  await checkoutStepOnePage.fillZipCode('12345');
  await checkoutStepOnePage.continue();

  await expect(page).toHaveURL('/checkout-step-two.html');

  const itemTotal = await checkoutStepTwoPage.getItemTotal();
  const tax = await checkoutStepTwoPage.getTax();
  const total = await checkoutStepTwoPage.getTotal();

  expect(total).toBeCloseTo(itemTotal + tax, 2);

  await checkoutStepTwoPage.finish();

  await expect(page).toHaveURL('/checkout-complete.html');
  await expect(
    page.getByText('Thank you for your order!', { exact: true }),
  ).toBeVisible();
});
