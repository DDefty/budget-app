import { useEffect, useState, useCallback } from "react";
import { transactionApi } from "@/lib/transaction";
import type { TransactionsResponse, AddIncomeRequest, AddExpenseRequest } from "@/lib/transaction";
import { handleApiError } from "@/lib/errorHandler";

export function useTransactions() {
  const [transactions, setTransactions] = useState<TransactionsResponse | []>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await transactionApi.getUserTransactions();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addIncome = useCallback(async (payload: AddIncomeRequest) => {
    try {
      const res = await transactionApi.postIncomeTransaction(payload);
      await fetchTransactions();
      return res;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  const addExpense = useCallback(async (payload: AddExpenseRequest) => {
    try {
      const res = await transactionApi.postExpenseTransaction(payload);
      await fetchTransactions();
      return res;
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      await transactionApi.deleteTransaction(id);
      await fetchTransactions();
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, fetchTransactions, addIncome, addExpense, deleteTransaction, setTransactions };
}