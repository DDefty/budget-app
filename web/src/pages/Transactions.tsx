import { ExpenseFormModal } from "@/components/transactions/ExpenseFormModal";
import { IncomeFormModal } from "@/components/transactions/IncomeFormModal";
import { NewTransactionModal } from "@/components/transactions/NewTransactionModal";
import TransactionsFilters from "@/components/transactions/TransactionsFilters";
import { TransactionsTable } from "@/components/transactions/TransactionsTable";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

import { useModal } from "@/hooks/useModal";
import { useTransactions } from "@/hooks/useTransactions";
import type { AddExpenseRequest, AddIncomeRequest, Transaction } from "@/lib/transaction";
import { useState } from "react";

export default function Dashboard() {
  const newModal = useModal();
  const incomeModal = useModal();
  const expenseModal = useModal();
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const [isEdit, setIsEdit] = useState(false);
  const { transactions, loading, addIncome, addExpense, deleteTransaction, editIncomeTransaction, editExpenseTransaction } = useTransactions();

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
      setValue({startDate: new Date(transaction.date), endDate: new Date(transaction.date)})
      setIsEdit(true);
      incomeModal.openModal()
    } else if (transaction.category.kind === 'EXPENSE') {
      setEditExpenseValues({ id: transaction.id, amount: transaction.amount, description: transaction.description, account: transaction.account, date: transaction.date, category: transaction.category.name, note: transaction.note });
      setValue({startDate: new Date(transaction.date), endDate: new Date(transaction.date)})
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
        <Button onClick={newModal.openModal} type="button" className="w-50 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm ...">
          + New Transaction
        </Button>
      </div>

      <TransactionsFilters />
      <TransactionsTable transactions={Array.isArray(transactions) ? transactions : []} handleClick={handleClickDelete} handleClickEdit={handleClickEdit} loading={loading} />

      <NewTransactionModal
        newModalOpen={newModal.open}
        handleCloseModals={() => { newModal.closeModal(); incomeModal.closeModal(); expenseModal.closeModal(); }}
        handleIncomeModalOpen={() => { newModal.closeModal(); incomeModal.openModal(); setEditIncomeValues({ id: '', amount: 0, description: '', account: '', date: '' }); setValue({startDate: new Date(), endDate: new Date()}); setIsEdit(false)}}
        handleExpenseModalOpen={() => { newModal.closeModal(); expenseModal.openModal(); setEditExpenseValues({ id: '', amount: 0, description: '', account: '', date: '', category: '', note: '' }); setValue({startDate: new Date(), endDate: new Date()}); setIsEdit(false)}}
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
    </div>
  );
}