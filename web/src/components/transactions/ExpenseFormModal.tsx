import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'
import Input from '../ui/input'
import { useState } from 'react'
import Datepicker from "react-tailwindcss-datepicker";
import { Button } from '../ui/button';
import type { AddExpenseRequest } from '@/lib/transaction';
import { z } from "zod";
import toast from 'react-hot-toast';

const addExpenseSchema = z.object({
    amount: z.number().min(0.01, "Amount must be greater than 0"),
    description: z.string().min(1, "Description is required"),
    date: z.string().min(1, "Date is required"),
    category: z.string().min(1, "Category is required"),
    account: z.string().min(1, "Account is required"),
    note: z.string().optional(),
});


type ExpenseFormModalProps = {
    expenseModalOpen: boolean;
    handleCloseModals: () => void;
    handleAddExpenseSubmit: (data: AddExpenseRequest) => void;
    value: { startDate: Date; endDate: Date };
    setValue: React.Dispatch<React.SetStateAction<{ startDate: Date; endDate: Date }>>;
}

export const ExpenseFormModal: React.FC<ExpenseFormModalProps> = ({ expenseModalOpen, handleCloseModals, handleAddExpenseSubmit, value, setValue }) => {
    const [addExpenseFormData, setAddExpenseFormData] = useState({
        amount: 0,
        description: '',
        date: '',
        category: '',
        account: '',
        note: ''
    })

    return (
        <Transition as={Fragment} show={expenseModalOpen} appear>
            <Dialog as="div" className="relative z-10" onClose={handleCloseModals}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-500"
                            enterFrom="opacity-0 scale-95 translate-y-4"
                            enterTo="opacity-100 scale-100 translate-y-0"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100 translate-y-0"
                            leaveTo="opacity-0 scale-95 translate-y-4"
                        >
                            <DialogPanel className="relative transform overflow-visible rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center w-full sm:mt-0 mx-14 justify-items-center">
                                            <DialogTitle as="h3" className="text-2xl font-bold text-center text-gray-900">
                                                Add a New Expense
                                            </DialogTitle>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Enter the details of your expense below.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                                    <form className="space-y-3" onSubmit={(e) => {
                                        e.preventDefault();
                                        const result = addExpenseSchema.safeParse(addExpenseFormData);
                                        if (!result.success) {
                                            result.error.issues.forEach(i => toast.error(i.message));
                                            return;
                                        }
                                        handleAddExpenseSubmit(addExpenseFormData)
                                    }}>
                                        <label htmlFor="Datepicker" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Date
                                        </label>
                                        <div className="space-y-2 focus:border-primary">
                                            <Datepicker
                                                inputClassName="w-full bg-background-light text-sm h-10 rounded-lg border-border-light border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
                                                asSingle={true}
                                                value={value}
                                                onChange={(val) => {
                                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                                    // @ts-ignore
                                                    setValue(val);
                                                    setAddExpenseFormData(prev => ({
                                                        ...prev,
                                                        date: val?.startDate ? new Date(val.startDate).toISOString() : ""
                                                    }));
                                                }}
                                                displayFormat="YYYY/MM/DD"
                                                popoverDirection="down"
                                                containerClassName="relative"
                                            />
                                        </div>
                                        <label htmlFor="amount" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Amount
                                        </label>
                                        <div className="space-y-2">
                                            <Input
                                                id="amount"
                                                name="amount"
                                                type="number"
                                                placeholder="e.g., 1200"
                                                value={addExpenseFormData.amount}
                                                onChange={e => setAddExpenseFormData(prev => ({ ...prev, amount: Number(e.target.value) }))}
                                                required
                                                className='w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light placeholder:font-medium dark:placeholder-muted-dark focus:border-primary'
                                            />
                                        </div>
                                        <label htmlFor="description" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Description
                                        </label>
                                        <div className="space-y-2 ">
                                            <Input
                                                id="description"
                                                name="description"
                                                type="string"
                                                value={addExpenseFormData.description}
                                                onChange={e => setAddExpenseFormData(prev => ({ ...prev, description: e.target.value }))}
                                                placeholder="Enter expense description..."
                                                required
                                                className='w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark placeholder:font-semibold focus:border-primary'
                                            />
                                        </div>
                                        <label htmlFor="Category" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Category
                                        </label>
                                        <div className="space-y-2 ">
                                            <select id="Category" value={addExpenseFormData.category ?? ""} onChange={e => {
                                                setAddExpenseFormData(prev => ({ ...prev, category: e.target.value }));
                                            }} className="bg-background-light border px-3 text-muted-light py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-30 font-semibold text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-primary">
                                                <option value="" disabled>Select a category</option>
                                                <option value="Category 1">Category 1</option>
                                                <option value="Category 2">Category 2</option>
                                                <option value="Category 3">Category 3</option>
                                            </select>
                                        </div>
                                        <label htmlFor="Account" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Account
                                        </label>
                                        <div className="space-y-2 ">
                                            <select id="Account" value={addExpenseFormData.account ?? ""} onChange={e => {
                                                setAddExpenseFormData(prev => ({ ...prev, account: e.target.value }));
                                            }} className="bg-background-light border px-3 text-muted-light py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-30 font-semibold text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-primary">
                                                <option value="" disabled>Select an account</option>
                                                <option value="Account 1">Account 1</option>
                                                <option value="Account 2">Account 2</option>
                                                <option value="Account 3">Account 3</option>
                                            </select>
                                        </div>
                                        <label htmlFor="note" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                                            Notes (Optional)
                                        </label>
                                        <div className="space-y-2 h-36">
                                            <textarea
                                                id="note"
                                                name="note"
                                                placeholder="e.g., Lunch with a client"
                                                value={addExpenseFormData.note}
                                                onChange={e => setAddExpenseFormData(prev => ({ ...prev, note: e.target.value }))}
                                                required
                                                className="w-full h-32 rounded-lg border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light placeholder:font-medium placeholder:text-sm dark:placeholder-muted-dark focus:border-primary align-top p-3"
                                            />
                                        </div>
                                        <div className='mt-6 mb-12'>
                                            <Button type="submit" className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold">
                                                Add Expense
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}