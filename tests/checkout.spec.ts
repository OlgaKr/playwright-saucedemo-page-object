import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage';

test('Full checkout scenario', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

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
