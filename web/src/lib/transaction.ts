import { api } from './api';

export type AddIncomeRequest = {
    amount: number;
    description: string;
    account: string;
    date: string;
}

export type AddExpenseRequest = {
    amount: number;
    description: string;
    date: string;
    category: string;
    account: string;
    note: string;
}

export type Transaction = {
    id: string;
    account: string;
    date: string;
    description: string;
    note: string;
    amount: number;
    currency: string;
    category: Category;
}

export type Category = {
    id: string;
    userId: string;
    name: string;
    kind: string;
}

export type TransactionsResponse = {
    transactions: Transaction[]
}

// Transaction API functions
export const transactionApi = {
  // Get User Transactions
  getUserTransactions: async (): Promise<TransactionsResponse> => {
    const response = await api.get('/transactions');
    return response.data;
  },

  // Add Income Transaction
  postIncomeTransaction: async (transactionData: AddIncomeRequest): Promise<Transaction> => {
    const response = await api.post('/transaction/addIncome', transactionData);
    return response.data;
  },

  // Add Expense Transaction
  postExpenseTransaction: async (transactionData: AddExpenseRequest): Promise<Transaction> => {
    const response = await api.post('/transaction/addExpense', transactionData);
    return response.data;
  },

  // Delete Transaction
  deleteTransaction: async (id: string) => {
    const response = await api.delete(`/transaction/${id}`);
    return response.data;
  },

  // Edit Income Transaction
  editIncomeTransaction: async (transactionData: AddIncomeRequest, id: string): Promise<Transaction> => {
    const response = await api.put(`/transaction/editIncome/${id}`, transactionData);
    return response.data;
  },

  // Edit Income Transaction
  editExpenseTransaction: async (transactionData: AddExpenseRequest, id: string): Promise<Transaction> => {
    const response = await api.put(`/transaction/editExpense/${id}`, transactionData);
    return response.data;
  },
};

export default transactionApi;