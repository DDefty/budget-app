import { faker } from '@faker-js/faker';


export function generateCredentials() {
    return {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.password(),
        invalidEmail: faker.person.firstName() + '@a',
    };
}
