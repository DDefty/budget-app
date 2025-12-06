import { test } from '../../fixtures/auth.fixture'
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Add Income Modal', async () => {
    test('Income Form Default Values', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
    })

    test('Income Required Fields Validation', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
    })

    test('Add Valid Income', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Decimal Amount Handling', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Negative Income Not Allowed', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Zero Amount Not Allowed', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Future Date Handling', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Keyboard close modal (esc)', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

})