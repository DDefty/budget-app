import { expect, Locator, Page } from "@playwright/test";
import { ROUTES } from "../../utils/constants";

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Email or Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.getByText('Invalid email or password.');
        this.successMessage = page.getByText('Welcome back! Successfully');
    }

    async loginPageOpen() {
        await this.page.goto(ROUTES.login);
    }

    async loginPageIsOpen() {
        await this.page.waitForURL(ROUTES.login);
    }

    async fillEmail(email: string) {
        await this.username.fill(email);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async assertDashboardOpen() {
        await this.page.waitForURL(ROUTES.dashbaord);
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }

    async assertSuccesMessage() {
        await expect(this.successMessage).toBeVisible();
    }
}