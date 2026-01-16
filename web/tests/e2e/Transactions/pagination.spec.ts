import { test } from '../../fixtures/auth.fixture'
import { TransactionsMock } from '../../mocks/transactions.mock';
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Pagination', async () => {
    test.use({ isLoggedIn: true });
    test('Pagination Info', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.mockTransactionsApi(TransactionsMock);
        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertPaginationInfo();
    })

    test('Go to Next Page', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertSecPageIsEnabled();
        await transactionsPage.goToNextPage();
    })

    test('Go to Previous Page', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertSecPageIsEnabled();
        await transactionsPage.goToNextPage();
        await transactionsPage.goToPrevPage();
        await transactionsPage.assertPrevDisabled();
    })
})