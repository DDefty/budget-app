import { test } from '../../fixtures/auth.fixture'
import { emptyTransactionsMock } from '../../mocks/transactions.mock';
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Transactions', async () => {
    test.use({ isLoggedIn: true });

    test('Verify Table Headers', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Verify Row Data Formatting', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertRowFormatting();
    })

    test('Verify Amount Color Coding', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertColorCoding();
    })

    test('Verify empty state', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.mockTransactionsApi(emptyTransactionsMock);
        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertEmptyTransactions()
    })

})