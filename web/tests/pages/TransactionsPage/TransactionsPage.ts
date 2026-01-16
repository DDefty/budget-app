import { expect, Locator, Page } from "@playwright/test";
import { NAVIGATION_INFO, ROUTES } from "../../utils/constants";
import { TransactionsResponse } from "../../types/transactionsResponse";

export class TransactionsPage {
    readonly page: Page;
    readonly tableDate: Locator;
    readonly tableDescription: Locator;
    readonly tableCategory: Locator;
    readonly tableAccount: Locator;
    readonly tableAmount: Locator;
    readonly secondPage: Locator;
    readonly firstPage: Locator;
    readonly thirdPage: Locator;
    readonly navLinkTransactions: Locator;
    readonly thirdRow: Locator;
    readonly thirdRowDate: Locator;
    readonly thirdRowAmount: Locator;
    readonly emptyTableMessage: Locator;
    readonly navLinkDashboard: Locator;
    readonly navLinkSettings: Locator;
    readonly navInfo: Locator;
    readonly nextPage: Locator;
    readonly prevPage: Locator;
    readonly openModals: Locator;
    readonly firstModal: Locator;
    readonly cancelModalButton: Locator;
    readonly incomeModal: Locator;
    readonly expenseModal: Locator;
    readonly incomeModalContainer: Locator;
    readonly expenseModalContainer: Locator;
    readonly expenseModalDate: Locator;
    readonly expenseModalAmount: Locator;
    readonly expenseModalDescription: Locator;
    readonly expenseModalCategory: Locator;
    readonly expenseModalAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.tableDate = page.getByRole('cell', { name: 'Date' });
        this.tableDescription = page.getByRole('cell', { name: 'Description' });
        this.tableCategory = page.getByRole('cell', { name: 'Category' });
        this.tableAmount = page.getByRole('cell', { name: 'Amount', exact: true })
        this.tableAccount = page.getByRole('cell', { name: 'Account', exact: true });
        this.firstPage = page.getByRole('button', { name: '1', exact: true });
        this.secondPage = page.getByRole('button', { name: '2', exact: true });
        this.thirdPage = page.getByRole('button', { name: '3', exact: true });
        this.navLinkTransactions = page.getByRole('link', { name: 'Transactions' });
        this.navLinkDashboard = page.getByRole('link', { name: 'Dashboard' });
        this.navLinkSettings = page.getByRole('link', { name: 'Settings' });
        this.thirdRow = page.locator('table tbody tr').nth(2);
        this.thirdRowDate = this.thirdRow.locator('td').nth(0);
        this.thirdRowAmount = this.thirdRow.locator('td').nth(4);
        this.emptyTableMessage = page.getByText('No results');
        this.navInfo = page.getByText(NAVIGATION_INFO);
        this.nextPage = page.getByRole('button', { name: 'Next' });
        this.prevPage = page.getByRole('button', { name: 'Previous' });
        this.openModals = page.getByRole('button', { name: '+ New Transaction' });
        this.firstModal = page.locator('#headlessui-dialog-panel-_r_6_');
        this.cancelModalButton = page.getByRole('button', { name: 'Cancel' });
        this.incomeModal = page.getByText('Income', { exact: true });
        this.expenseModal = page.getByText('Expense', { exact: true });
        this.incomeModalContainer = page.locator('#headlessui-dialog-panel-_r_e_');
        this.expenseModalContainer = page.locator('#headlessui-dialog-panel-_r_e_');
        this.expenseModalDate = page.getByRole('textbox', { name: 'YYYY/MM/DD' });
        this.expenseModalAmount = page.getByRole('spinbutton', { name: 'Amount' });
        this.expenseModalDescription = page.getByRole('textbox', { name: 'Description' });
        this.expenseModalCategory = page.getByLabel('Category');
        this.expenseModalAccount = page.getByLabel('Account');

    }

    async mockTransactionsApi(data: TransactionsResponse) {
        await this.page.route('**/transactions?page=1', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(data)
            });
        });
    }

    async openTransactionsPage() {
        await this.page.goto(ROUTES.transactions)
    }

    async assertTableHeadersValid() {
        await expect(this.tableDate).toBeVisible();
        await expect(this.tableDescription).toBeVisible();
        await expect(this.tableCategory).toBeVisible();
        await expect(this.tableAmount).toBeVisible();
        await expect(this.tableAccount).toBeVisible();
    }

    async assertNavHighligted() {
        await expect(this.navLinkTransactions).toHaveAttribute('aria-current', 'page');
    }

    async assertRowFormatting() {
        const dateText = await this.thirdRowDate.innerText();

        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        expect(dateText).toMatch(dateFormat);
    }

    async assertColorCoding() {
        const amountText = await this.thirdRowAmount.innerText();

        const amount = Number(amountText);

        if (amount < 0) {
            expect(this.thirdRowAmount).toHaveCSS('color', 'rgb(239, 68, 68)');
        }
    }

    async assertEmptyTransactions() {
        await expect(this.emptyTableMessage).toContainText('No results')
    }

    async settingsPageOpen() {
        await this.navLinkSettings.click();
        await this.page.waitForURL('/settings');
    }

    async dashboardPageOpen() {
        await this.navLinkDashboard.click();
        await this.page.waitForURL('/dashboard');
    }

    async assertPaginationInfo() {
        await expect(this.navInfo).toBeVisible();
    }

    async goToNextPage() {
        await this.nextPage.click()
    }

    async goToPrevPage() {
        await this.prevPage.click();
    }

    async assertSecPageIsEnabled() {
        await expect(this.secondPage).toBeEnabled();
    }

    async assertPrevDisabled() {
        await expect(this.prevPage).toBeDisabled();
    }

    async modalsOpen() {
        await this.openModals.click();
    }

    async assertModalOpen() {
        await expect(this.firstModal).toBeVisible();
    }

    async modalClose() {
        await this.cancelModalButton.click();
    }

    async assertModalClosed() {
        await expect(this.firstModal).toBeHidden();
    }

    async keyboardEscapeClick() {
        await this.page.keyboard.press('Escape');
    }

    async openIncomeModal() {
        await this.incomeModal.click();
    }

    async openExpenseModal() {
        await this.expenseModal.click();
    }

    async assertIncomeModalOpen() {
        await expect(this.incomeModalContainer).toBeVisible();
    }

    async assertExpenseModalOpen() {
        await expect(this.expenseModalContainer).toBeVisible();
    }

    async fillExpenseModalDate() {

    }

    async fillExpenseModalDescription() {
        
    }

    async fillExpenseModalAmount() {
        
    }

    async fillExpenseModalAccount() {
        
    }

    async fillExpenseModalCategory() {
        
    }
} 