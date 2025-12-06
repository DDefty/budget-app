import { test } from '../../fixtures/auth.fixture'
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Navigation & Basic UI', async () => {
    test.use({ isLoggedIn: true });

    test('Verify Transactions Tab Navigation', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.settingsPageOpen();
        await transactionsPage.dashboardPageOpen();
    })

    test('Verify Default Landing on Transactions Page', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })
})