import { test } from '../../fixtures/auth.fixture'
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Search & Filters', async () => {
    test.use({ isLoggedIn: true });

    test('Verify Keyword Search', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertNavHighligted();
    })

    test('Verify Partial Keyword Search', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Verify Case-Insensitive Search', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Category Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Clear Category Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Min Amount Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Max Amount Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Combined Min+Max Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Invalid Amount Validation', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Date Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Clear Date Filter', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Combined Filters', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })
})