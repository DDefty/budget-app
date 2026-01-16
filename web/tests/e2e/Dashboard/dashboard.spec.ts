import { test } from '../../fixtures/auth.fixture'
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';

test.describe('Dashboard page', async () => {
    test.use({ isLoggedIn: true });

    test('Dashboard is open after login', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.dashboardIsOpen();
        await dashboardPage.assertTableIsShown();
    })

    test('User can navigate to another page by top bar', async ({page}) => {
        const dashboardPage = new DashboardPage(page);

        await dashboardPage.dashboardIsOpen();
        await dashboardPage.assertTableIsShown();
        await dashboardPage.navToTransactions();
        await dashboardPage.navToSettings();
    })


}) 