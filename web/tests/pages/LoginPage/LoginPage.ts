import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Email or Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.getByText('Invalid email or password.');
    }

    async loginPageOpen() {
        await this.page.goto('/login');
    }

    async loginPageIsOpen() {
        await this.page.waitForURL('/login');
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
        await this.page.waitForURL('/dashboard');
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toBeVisible();
    }
}