export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface Category {
    id: string;
    name: string;
    kind: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Transaction {
    id: string;
    account: string;
    amount: string;
    currency: string;
    date: string;
    description: string;
    note: string;
    category: Category;
}

export interface TransactionsResponse {
    pagination: Pagination;
    transactions: Transaction[];
}