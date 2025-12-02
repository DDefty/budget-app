import { expect, Locator, type Page } from "@playwright/test";

export class RegisterPage  {
    readonly page: Page;
    readonly username: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly signUpButton: Locator;
    readonly passwordDontMatch: Locator;
    readonly usernameTooShort: Locator;
    readonly invalidEmail: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Full Name' });
        this.email = page.getByRole('textbox', { name: 'Email' });
        this.password = page.getByRole('textbox', { name: 'Password', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm Password' });
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' });
        this.passwordDontMatch = page.getByText('Passwords don\'t match');
        this.usernameTooShort = page.getByText('Full Name has to be at least');
        this.invalidEmail = page.getByText('Invalid email address')
    }

    async open() {
        await this.page.goto('/register')
    }

    async fillUsername(username: string){
        await this.username.fill(username);
    }

    async fillEmail(email: string){
        await this.email.fill(email);
    }

    async fillPassword(password: string){
        await this.password.fill(password);
    }

    async fillConfirmPassword(password: string){
        await this.confirmPassword.fill(password);
    }

    async registerIsOpen() {
        await this.page.waitForURL('/register')
    }

    async clickSignIn() {
        await this.signUpButton.click();
    }

    async confirmPasswordDontMatch() {
        await expect(this.passwordDontMatch).toBeVisible();
    }
    
    async assertUsernameTooShort() {
        await expect(this.usernameTooShort).toBeVisible();
    }

    async assertInvalidEmail() {
        await expect(this.invalidEmail).toBeVisible();
    }
}