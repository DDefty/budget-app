import { TransactionsResponse } from "../types/transactionsResponse";

export const emptyTransactionsMock: TransactionsResponse = {
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  },
  transactions: []
};

export const TransactionsMock: TransactionsResponse = {
    pagination: {
        total: 200,
        page: 1,
        limit: 10,
        totalPages: 20
    },
    transactions: [
        {
            id: "cmin9zbps000bndnnxznedw2c",
            account: "Credit Card",
            date: "2025-03-07T14:59:38.880Z",
            description: "deposit transaction at Goodwin Inc using card ending with ****5631 for BSD 301.71 in account ***1845.",
            note: "Aegrus curriculum vespillo summopere voro.",
            amount: "-447.06",
            currency: "PLN",
            category: {
                id: "cmin9zav00001ndnnu2hz70g5",
                userId: "cmin9yzvb0000ndkjvge8nryi",
                name: "Rent",
                kind: "EXPENSE",
                createdAt: "2025-12-01T14:59:37.789Z",
                updatedAt: "2025-12-01T14:59:37.789Z"
            }
        },
    ]
}