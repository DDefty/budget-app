import { Locator, type Page } from "@playwright/test"
import { ROUTES } from "../../utils/constants";

export class DashboardPage {
    readonly page: Page;
    readonly settings: Locator;

    constructor(page: Page){
        this.page = page
        this.settings = page.getByRole('link', { name: 'Settings' });
    }

    async dashboardIsOpen() {
        await this.page.waitForURL(ROUTES.dashbaord)
    }

    async openSettings() {
        await this.settings.click()
    }
}