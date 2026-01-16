import { faker } from '@faker-js/faker';


export function generateCredentials() {
    return {
        username: faker.string.alphanumeric({ length: { min: 8, max: 12 } }),
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
        invalidEmail: faker.person.firstName() + '@a',
    };
}
