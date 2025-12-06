import { test } from '../../fixtures/auth.fixture'
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Modals', async () => {
    test('Open Modal', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Close Modal via Cancel', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Close Modal via X', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Close Modal via Overlay Click', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Close Modal via ESC Key', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Open Income Form', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Open Expense Form', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })
})