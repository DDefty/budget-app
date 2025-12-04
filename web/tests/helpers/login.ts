import { LoginPage } from "../pages/LoginPage/LoginPage";
import { Page } from "@playwright/test";

export async function login(page: Page) {
    const loginPage = new LoginPage(page);

    const email = process.env.VALID_EMAIL!;
    const password = process.env.VALID_PASSSWORD!;

    await loginPage.loginPageOpen();
    await loginPage.fillEmail(email);
    await loginPage.fillPassword(password);
    await loginPage.clickLoginButton();
}