import { Page } from "@playwright/test";
import { ROUTES } from "../../utils/constants";

export class SettingsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async openSettins() {
        await this.page.goto(ROUTES.settings)
    }

    async settingsIsOpen() {
        await this.page.waitForURL(ROUTES.settings)
    }
}