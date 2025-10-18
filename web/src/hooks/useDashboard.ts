import { useEffect, useState, useCallback } from "react";
import { dashboardApi } from "@/lib/dashboard";
import type { DashboardTransaction, ExpenseOverview, ExpenseAnalysis } from "@/lib/dashboard";
import { handleApiError } from "@/lib/errorHandler";

export function useDashboard() {
    const [dashboardTransactions, setDashboardTransactions] = useState<DashboardTransaction[]>([]);
    const [dashobardOverview, setDashboardOverview] = useState<ExpenseOverview>();
    const [dashboardAnalysis, setDashboardsAnalysis] = useState<ExpenseAnalysis[]>();
    const [loading, setLoading] = useState(false);


    const fetchDashboard = useCallback(async () => {
        setLoading(true);
        try {
            const data = await dashboardApi.getDashboardTransactions();
            setDashboardTransactions(data.transactions);
            setDashboardOverview(data.overview);
            setDashboardsAnalysis(data.analysis);
        } catch (err) {
            handleApiError(err);
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        void fetchDashboard();
    }, [fetchDashboard]);


    return {
        dashboardTransactions, dashobardOverview, dashboardAnalysis, loading, fetchDashboard, setDashboardTransactions
    };
}