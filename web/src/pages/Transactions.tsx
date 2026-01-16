import { ExpenseFormModal } from "@/components/transactions/ExpenseFormModal";
import { IncomeFormModal } from "@/components/transactions/IncomeFormModal";
import { NewTransactionModal } from "@/components/transactions/NewTransactionModal";
import { TransactionsFilters } from "@/components/transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { useModal } from "@/hooks/useModal";
import { useTransactions } from "@/hooks/useTransactions";
import type { AddExpenseRequest, AddIncomeRequest, Transaction } from "@/lib/transaction";
import { useEffect, useState } from "react";
import { TransactionsPagination } from "@/components/transactions/TransactionsPagination";

export default function Dashboard() {
  const newModal = useModal();
  const incomeModal = useModal();
  const expenseModal = useModal();
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const [isEdit, setIsEdit] = useState(false);
  const { transactions, pagination, loading, addIncome, addExpense, deleteTransaction, editIncomeTransaction, editExpenseTransaction, page, setPage, } = useTransactions();
  const [sp] = useSearchParams();
  const pageFromUrl = Math.max(1, Number(sp.get("page") || 1));

  const [transactionsTable, setTransactionsTable] = useState<Transaction[]>(transactions);

  const [categories, setCategories] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [amountFilter, setAmountFilter] = useState({
    min: '',
    max: ''
  });
  const [dateFilter, setDateFilter] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const [editIncomeValues, setEditIncomeValues] = useState({
    id: '',
    amount: 0,
    description: '',
    account: '',
    date: ''
  });

  const [editExpenseValues, setEditExpenseValues] = useState({
    id: '',
    amount: 0,
    description: '',
    account: '',
    category: '',
    date: '',
    note: '',
  });

  useEffect(() => {
    if (page !== pageFromUrl) setPage(pageFromUrl);
  }, [pageFromUrl, page, setPage]);

  useEffect(() => {
    if (transactions) {
      setTransactionsTable(transactions);
      setCategories([
        ...new Set(
          transactions
            .map(t => t.category?.name)
            .filter((name): name is string => !!name && name.trim() !== "")
        )
      ]);
      setDates([...new Set(transactions.map(t => new Date(t.date).toLocaleString("en-US", { month: "long" })))]);
    }
  }, [transactions])


  useEffect(() => {
    let results = [...transactions];
    if (query && query.trim() !== '') {
      results = results.filter(t => t.description.toLowerCase().includes(query.toLowerCase()));
    }
    if (categoryFilter && categoryFilter.trim() !== '') {
      results = results.filter(t => t.category.name.toLowerCase().includes(categoryFilter.toLowerCase()));
    }
    if (amountFilter.min !== '' || amountFilter.max !== '') {
      results = results.filter(t => {
        const amount = Number(t.amount);
        const min = Number(amountFilter.min);
        const max = Number(amountFilter.max);

        return (
          (amountFilter.min === '' || amount >= min) &&
          (amountFilter.max === '' || amount <= max)
        );
      });
    }
    if (dateFilter && dateFilter.trim() !== '') {
      results = results.filter(t => new Date(t.date).toLocaleString("en-US", { month: "long" }) === dateFilter);
    }
    setTransactionsTable(results);
  }, [transactions, query, categoryFilter, amountFilter, dateFilter]);

  const handleAddIncomeSubmit = async (data: AddIncomeRequest) => {
    try {
      await addIncome(data);
      incomeModal.closeModal();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach(i => toast.error(i.message));
      }
    }
  };

  const handleAddExpenseSubmit = async (data: AddExpenseRequest) => {
    try {
      await addExpense(data);
      expenseModal.closeModal();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach(i => toast.error(i.message));
      }
    }
  };

  const handleClickEdit = (transaction: Transaction) => {
    if (transaction.category.kind === 'INCOME') {
      setEditIncomeValues({ id: transaction.id, amount: transaction.amount, description: transaction.description, account: transaction.account, date: transaction.date });
      setValue({ startDate: new Date(transaction.date), endDate: new Date(transaction.date) })
      setIsEdit(true);
      incomeModal.openModal()
    } else if (transaction.category.kind === 'EXPENSE') {
      setEditExpenseValues({ id: transaction.id, amount: transaction.amount, description: transaction.description, account: transaction.account, date: transaction.date, category: transaction.category.name, note: transaction.note });
      setValue({ startDate: new Date(transaction.date), endDate: new Date(transaction.date) })
      setIsEdit(true);
      expenseModal.openModal()
    }
  }

  const handleEditIncomeSubmit = async (data: AddIncomeRequest, id: string) => {
    try {
      await editIncomeTransaction(data, id);
      incomeModal.closeModal();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach(i => toast.error(i.message));
      }
    }
  };

  const handleEditExpenseSubmit = async (data: AddExpenseRequest, id: string) => {
    try {
      await editExpenseTransaction(data, id);
      expenseModal.closeModal();
    } catch (err) {
      if (err instanceof z.ZodError) {
        err.issues.forEach(i => toast.error(i.message));
      }
    }
  };

  const handleClickDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
    } catch (err) {
      toast.error((err instanceof Error ? err.message : String(err)))
    }
  };

  return (
    <div className="w-3/5 justify-self-center flex flex-col gap-y-4">
      <Toaster />
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={newModal.openModal} type="button" data-testid="new-transaction-button" className="w-50 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm ...">
          + New Transaction
        </Button>
      </div>

      <TransactionsFilters categories={categories} dates={dates} query={query} setQuery={setQuery} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} amountFilter={amountFilter ?? 0} setAmountFilter={setAmountFilter} dateFilter={dateFilter} setDateFilter={setDateFilter} />
      <TransactionsTable transactions={transactionsTable} handleClick={handleClickDelete} handleClickEdit={handleClickEdit} loading={loading} />

      <NewTransactionModal
        newModalOpen={newModal.open}
        handleCloseModals={() => { newModal.closeModal(); incomeModal.closeModal(); expenseModal.closeModal(); }}
        handleIncomeModalOpen={() => { newModal.closeModal(); incomeModal.openModal(); setEditIncomeValues({ id: '', amount: 0, description: '', account: '', date: '' }); setValue({ startDate: new Date(), endDate: new Date() }); setIsEdit(false) }}
        handleExpenseModalOpen={() => { newModal.closeModal(); expenseModal.openModal(); setEditExpenseValues({ id: '', amount: 0, description: '', account: '', date: '', category: '', note: '' }); setValue({ startDate: new Date(), endDate: new Date() }); setIsEdit(false) }}
      />

      <IncomeFormModal
        incomeModalOpen={incomeModal.open}
        handleCloseModals={() => incomeModal.closeModal()}
        handleAddIncomeSubmit={handleAddIncomeSubmit}
        handleEditIncomeSubmit={handleEditIncomeSubmit}
        value={value}
        setValue={setValue}
        editTransactionState={editIncomeValues}
        isEdit={isEdit}
      />

      <ExpenseFormModal
        expenseModalOpen={expenseModal.open}
        handleCloseModals={() => expenseModal.closeModal()}
        handleAddExpenseSubmit={handleAddExpenseSubmit}
        handleEditExpenseSubmit={handleEditExpenseSubmit}
        value={value}
        setValue={setValue}
        editTransactionState={editExpenseValues}
        isEdit={isEdit}
      />

      {!loading && <TransactionsPagination pagination={pagination} />}
    </div>
  );
}