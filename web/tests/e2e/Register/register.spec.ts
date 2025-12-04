import { test } from '@playwright/test'
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage'
import { generateCredentials } from '../../helpers/generateCredentials';
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';



test.describe('Register page', async () => {
    test('Can not register without username', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { email, password } = generateCredentials();


        await registerPage.open();
        await registerPage.fillEmail(email);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(password);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();

    });
    test('Can not register without email', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, password } = generateCredentials();


        await registerPage.open();
        await registerPage.fillUsername(username);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(password);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();

    })
    test('Can not register without password', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, email } = generateCredentials();


        await registerPage.open();
        await registerPage.fillUsername(username);
        await registerPage.fillEmail(email);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();

    })
    test('Can not register without confirming password', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, email, password } = generateCredentials();


        await registerPage.open();
        await registerPage.fillUsername(username);
        await registerPage.fillEmail(email);
        await registerPage.fillPassword(password);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();

    })
    test('Can not register with different password', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, email, password, confirmPassword } = generateCredentials();


        await registerPage.open();
        await registerPage.fillUsername(username);
        await registerPage.fillEmail(email);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(confirmPassword);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();
        await registerPage.confirmPasswordDontMatch();

    })
    test('Can not register with username length < 8', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, email, password } = generateCredentials();

        const shortUsername = username.slice(0, 7);

        await registerPage.open();
        await registerPage.fillUsername(shortUsername);
        await registerPage.fillEmail(email);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(password);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();
        await registerPage.assertUsernameTooShort();

    })
    test('Can not register with invalid email address', async ({ page }) => {
        const registerPage = new RegisterPage(page);

        const { username, invalidEmail, password } = generateCredentials();

        await registerPage.open();
        await registerPage.fillUsername(username);
        await registerPage.fillEmail(invalidEmail);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(password);
        await registerPage.clickSignIn();
        await registerPage.registerIsOpen();
        await registerPage.assertInvalidEmail();

    })
    test('Can register with valid credentials', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const dashboardPage = new DashboardPage(page);

        const { email, password, username } = generateCredentials();


        const validUsername = username.slice(0, 9);

        await registerPage.open();
        await registerPage.fillUsername(validUsername);
        await registerPage.fillEmail(email);
        await registerPage.fillPassword(password);
        await registerPage.fillConfirmPassword(password);
        await registerPage.clickSignIn();
        await dashboardPage.dashboardIsOpen();

    })
})

