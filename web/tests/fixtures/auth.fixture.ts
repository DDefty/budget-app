import { test as base } from '@playwright/test'
import { login } from '../helpers/login'


type AuthFixtures = {
    isLoggedIn: boolean;
}

export const test = base.extend<AuthFixtures>({
    isLoggedIn: [false, { option: true }],

    page: async ({ page, isLoggedIn }, use) => {
        if (isLoggedIn) {
            await login(page);
        }
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await use(page);
    }

})
