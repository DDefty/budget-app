import { useEffect, useState, useCallback } from "react";
import { transactionApi } from "@/lib/transaction";
import type { AddIncomeRequest, AddExpenseRequest, Transaction, TransactionsResponse } from "@/lib/transaction";
import { handleApiError } from "@/lib/errorHandler";
import toast from "react-hot-toast";
type Pagination = TransactionsResponse["pagination"];

export function useTransactions(initialPage = 1) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: initialPage,
    limit: 0,
    totalPages: 0,
  });

  const fetchTransactions = useCallback(async (p = page) => {
    setLoading(true);
    try {
      const data = await transactionApi.getUserTransactions(p);
      setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
      setPagination(data.pagination)
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

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

  const editIncomeTransaction = useCallback(async (payload: AddIncomeRequest, id: string) => {
    try {
      await transactionApi.editIncomeTransaction(payload, id);
      await fetchTransactions();
      toast.success("Income transaction edited successfully!");
    } catch (err) {
      handleApiError(err);
      throw err;
    }
  }, [fetchTransactions]);

  const editExpenseTransaction = useCallback(async (payload: AddExpenseRequest, id: string) => {
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
    void fetchTransactions(page);
  }, [fetchTransactions, page]);

  const nextPage = useCallback(() => {
    setPage((p) => Math.min(p + 1, Math.max(1, pagination.totalPages)));
  }, [pagination.totalPages]);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  const goToPage = useCallback((p: number) => {
    const clamped = Math.max(1, Math.min(p, Math.max(1, pagination.totalPages)));
    setPage(clamped);
  }, [pagination.totalPages]);

  return {
    transactions, pagination, page, loading, fetchTransactions, addIncome, addExpense, deleteTransaction, setPage, nextPage, prevPage, goToPage, setTransactions, editIncomeTransaction, editExpenseTransaction,
  };
}