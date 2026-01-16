import { test } from '../../fixtures/auth.fixture'
import { openModal } from '../../helpers/openModal';
import { TransactionsPage } from '../../pages/TransactionsPage/TransactionsPage';

test.describe('Modals', async () => {
    test.use({ isLoggedIn: true });

    test('Open Modal', async ({ page }) => {
        await openModal(page);
    })

    test('Close Modal via Cancel', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await openModal(page);
        await transactionsPage.modalClose()
        await transactionsPage.assertModalClosed();
    })


    test('Close Modal via ESC Key', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await openModal(page);
        await transactionsPage.keyboardEscapeClick();
        await transactionsPage.assertModalClosed();
    })

    test('Open Income Form', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await openModal(page);
        await transactionsPage.openIncomeModal();
        await transactionsPage.assertIncomeModalOpen();
    })

    test('Open Expense Form', async ({ page }) => {
        const transactionsPage = new TransactionsPage(page);

        await openModal(page);
        await transactionsPage.openExpenseModal();
        await transactionsPage.assertExpenseModalOpen();
    })
})