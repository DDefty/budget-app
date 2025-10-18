import { faker } from '@faker-js/faker'

export const genAuthData = {
    min: () => ({
        name: faker.string.alpha({ length: 8 }),
        email: 'a@b.com',
        password: faker.string.alphanumeric({ length: 8 }),
        diffPass: faker.string.alphanumeric({ length: 8 }),
    }),

    max: () => ({
        name: faker.string.alpha({ length: 20 }),
        email: `${faker.string.alpha({ length: 64 })}@mail.com`,
        password: faker.string.alphanumeric({ length: 72 }),
        diffPass: faker.string.alphanumeric({ length: 72 }),
    }),

    belowMin: () => ({
        name: faker.string.alpha({ length: 7 }),
        email: 'notanemail',
        password: faker.string.alphanumeric({ length: 7 }),
        diffPass: faker.string.alphanumeric({ length: 7 }),
    }),

    aboveMax: () => ({
        name: faker.string.alpha({ length: 21 }),
        email: `${faker.string.alpha({ length: 80 })}@mail.com`,
        password: faker.string.alphanumeric({ length: 73 }),
        diffPass: faker.string.alphanumeric({ length: 73 }),
    }),
    inRange: () => ({
        name: faker.string.alpha({ length: 12 }),
        email: `${faker.string.alphanumeric(8)}@example.com`,
        password: faker.internet.password({ length: 16 }),
        diffPass: faker.internet.password({ length: 16 }),

    }),
}