import { expect, Locator, type Page } from "@playwright/test"
import { ROUTES } from "../../utils/constants";

export class DashboardPage {
    readonly page: Page;
    readonly settings: Locator;
    readonly tableDate: Locator;
    readonly tableDescription: Locator;
    readonly tableCategory: Locator;
    readonly tableAmount: Locator;
    readonly transactionsPageNav: Locator;
    readonly settingsPageNav: Locator;

    constructor(page: Page){
        this.page = page
        this.settings = page.getByRole('link', { name: 'Settings' });
        this.tableDate = page.getByRole('cell', { name: 'Date' });
        this.tableDescription = page.getByRole('cell', { name: 'Description' });
        this.tableCategory = page.getByRole('cell', { name: 'Category' });
        this.tableAmount = page.getByRole('cell', { name: 'Amount' });
        this.transactionsPageNav = page.getByRole('link', { name: 'Transactions' });
        this.settingsPageNav = page.getByRole('link', { name: 'Settings' });

    }

    async dashboardIsOpen() {
        await this.page.waitForURL(ROUTES.dashbaord)
    }

    async openSettings() {
        await this.settings.click()
    }

    async assertTableIsShown() {
        await expect(this.tableDate).toBeVisible();
        await expect(this.tableDescription).toBeVisible();
        await expect(this.tableCategory).toBeVisible();
        await expect(this.tableAmount).toBeVisible();
    }

    async navToTransactions() {
        await this.transactionsPageNav.click();
        await this.page.waitForURL(ROUTES.transactions);
    }
    
    async navToSettings() {
        await this.settingsPageNav.click();
        await this.page.waitForURL(ROUTES.settings);
    }

    async openDashboardPage() {
        await this.page.goto(ROUTES.dashbaord)
    }
}