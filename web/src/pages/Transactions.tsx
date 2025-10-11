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
import type { AddExpenseRequest, AddIncomeRequest } from "@/lib/transaction";
import { useState } from "react";

export default function Dashboard() {
  const newModal = useModal();
  const incomeModal = useModal();
  const expenseModal = useModal();
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date()
  });
  const { transactions, loading, addIncome, addExpense, deleteTransaction } = useTransactions();

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
      <TransactionsTable transactions={Array.isArray(transactions) ? transactions : []} handleClick={handleClickDelete} loading={loading}/>

      <NewTransactionModal
        newModalOpen={newModal.open}
        handleCloseModals={() => { newModal.closeModal(); incomeModal.closeModal(); expenseModal.closeModal(); }}
        handleIncomeModalOpen={() => { newModal.closeModal(); incomeModal.openModal(); }}
        handleExpenseModalOpen={() => { newModal.closeModal(); expenseModal.openModal(); }}
      />

      <IncomeFormModal
        incomeModalOpen={incomeModal.open}
        handleCloseModals={() => incomeModal.closeModal()}
        handleAddIncomeSubmit={handleAddIncomeSubmit}
        value={value}
        setValue={setValue}
      />

      <ExpenseFormModal
        expenseModalOpen={expenseModal.open}
        handleCloseModals={() => expenseModal.closeModal()}
        handleAddExpenseSubmit={handleAddExpenseSubmit}
        value={value}
        setValue={setValue}
      />
    </div>
  );
}