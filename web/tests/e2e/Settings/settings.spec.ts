import {test} from '../../fixtures/auth.fixture'
import { DashboardPage } from '../../pages/DashboardPage/DashboardPage';
import { SettingsPage } from '../../pages/SettingsPage/SettingsPage';

test.describe('Settings page', () => {
    test.use({isLoggedIn: true});

    test('Settings page can be open from topbar', async ({page}) => {
        const dashboardPage = new DashboardPage(page);
        const settingsPage = new SettingsPage(page);

        await dashboardPage.openSettings();
        await settingsPage.settingsIsOpen();
    })
})