import { test } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { generateCredentials } from "../../helpers/generateCredentials";

test.describe('Login page', () => {
    test('Can login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const email = process.env.VALID_EMAIL!;
        const password = process.env.VALID_PASSSWORD!;

        await loginPage.loginPageOpen();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.clickLoginButton();
        await loginPage.assertDashboardOpen();
    })
    test('Can not login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const { email, password } = generateCredentials();

        await loginPage.loginPageOpen();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.clickLoginButton();
        await loginPage.assertErrorMessage();
    })
    test('Can not login without password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const { email } = generateCredentials();

        await loginPage.loginPageOpen();
        await loginPage.fillEmail(email);
        await loginPage.clickLoginButton();
        await loginPage.loginPageIsOpen();
    })
    test('Can not login without email/username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const { password } = generateCredentials();

        await loginPage.loginPageOpen();
        await loginPage.fillPassword(password);
        await loginPage.clickLoginButton();
        await loginPage.loginPageIsOpen();
    })
})