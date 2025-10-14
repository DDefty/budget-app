import { useEffect, useState, useCallback } from "react";
import { transactionApi } from "@/lib/transaction";
import type { AddIncomeRequest, AddExpenseRequest, Transaction } from "@/lib/transaction";
import { handleApiError } from "@/lib/errorHandler";
import toast from "react-hot-toast";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await transactionApi.getUserTransactions();
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
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
      toast.success("Income transaction added successfully!");
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
      toast.success("Expense transaction added successfully!");
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
      toast.success("Transaction deleted successfully!");
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  const editIncomeTransaction = useCallback(async (payload:AddIncomeRequest, id: string) => {
    try {
      await transactionApi.editIncomeTransaction(payload, id);
      await fetchTransactions();
      toast.success("Income transaction edited successfully!");
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  const editExpenseTransaction = useCallback(async (payload:AddExpenseRequest, id: string) => {
    try {
      await transactionApi.editExpenseTransaction(payload, id);
      await fetchTransactions();
      toast.success("Expense transaction edited successfully!");
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, fetchTransactions, addIncome, addExpense, deleteTransaction, setTransactions, editIncomeTransaction, editExpenseTransaction };
}