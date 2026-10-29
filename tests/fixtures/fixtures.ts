import { test as base } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/CheckoutStepTwoPage';
import { users } from '../test-data';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  userToLogin: {
    login: string;
    password: string;
  };
  autoLogin: void;
  autoLogout: void;
};

const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutStepOnePage: async ({ page }, use) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await use(checkoutStepOnePage);
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await use(checkoutStepTwoPage);
  },

  userToLogin: users.standard,

  autoLogin: [
    async ({ loginPage, userToLogin, page }, use) => {
      await page.goto('/');
      await loginPage.login(userToLogin);
      await use();
    },
    { auto: true },
  ],

  autoLogout: [
    async ({ page, autoLogin }, use) => {
      await use();
      const menuButton = page.getByRole('button', { name: 'Open Menu' });

      if (await menuButton.isVisible()) {
        await menuButton.click();
        await page.getByTestId('logout-sidebar-link').click();
      }
    },
    { auto: true },
  ],
});

export { test };
