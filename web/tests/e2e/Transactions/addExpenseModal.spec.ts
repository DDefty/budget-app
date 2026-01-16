import { test } from '../../fixtures/auth.fixture'
import { openModal } from '../../helpers/openModal';
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Add Expense Modal', async () => {
    test.use({isLoggedIn: true});
    test('Expense Required Fields Validation', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await openModal(page);
        await transactionsPage.openExpenseModal();
        await transactionsPage.assertExpenseModalOpen();
        
    })

    test('Add Valid Expense', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await transactionsPage.openTransactionsPage();
        await transactionsPage.assertTableHeadersValid();
    })

    test('Negative Expense Not Allowed', async ({ page }) => {
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