import { api } from './api';

export type ExpenseOverview = {
    totalBalance: number;
    totalExpense: number;
    upcomingBills: number;
}

export type ExpenseAnalysis = {
    category: string;
    total: number;
    percentage: number;
}

export type DashboardTransaction = {
    date: string;
    description: string;
    category: {
        name: string
    };
    amount: number;
}

export type DashboardTransactionResponse = {
    overview: ExpenseOverview;
    analysis: ExpenseAnalysis[];
    transactions: DashboardTransaction[];
}


// Dashboard API functions
export const dashboardApi = {
    // Get Recent Transactions
    getDashboardTransactions: async (): Promise<DashboardTransactionResponse> => {
        const response = await api.get(`/dashboard/overview`);
        return response.data;
    },

};

export default dashboardApi;