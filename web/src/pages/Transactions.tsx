import { ChartLineDownSvg, ChartLineUpSvg, EditSvg } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export default function Dashboard() {
  const [newModalOpen, setModalOpen] = useState(false);
  const [incomeModalOpen, setIncomeModalOpen] = useState(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [value, setValue] = useState({
    startDate: null as Date | string | null,
    endDate: null as Date | string | null,
  });


  const handleOpenModal = () => {
    setModalOpen(!newModalOpen);
  }

  const handleIncomeModalOpen = () => {
    setModalOpen(false);
    setIncomeModalOpen(true);
  }

  const handleExpenseModalOpen = () => {
    setModalOpen(false);
    setExpenseModalOpen(true);
  }

  const handleCloseModals = () => {
    setExpenseModalOpen(false)
    setIncomeModalOpen(false);
    setModalOpen(false);
  }

  return (
    <div className="w-3/5 justify-self-center flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button onClick={handleOpenModal} type="button" className="w-50 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold ">
          + New Transaction
        </Button>
      </div>
      <form className="w-full mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none opacity-50">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Search transactions"
            className='w-full placeholder:px-10 bg-white rounded-lg dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
          />
        </div>
      </form>
      <div className="flex flex-row h-10 gap-x-4">
        <form className="max-w-sm">
          <select id="category" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <option defaultValue="">Category</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
        <form className="max-w-sm">
          <select id="Amount" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <option defaultValue="">Amount</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
        <form className="max-w-sm">
          <select id="Date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <option defaultValue="">Date</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </form>
      </div>
      <div className="overflow-x-auto rounded-xl">
        <table className="w-full text-left bg-white rounded-lg border border-gray-200">
          <thead>
            <tr className="border-b bg-background-light border-background-light dark:border-background-dark">
              <th className="p-4 text-sm font-semibold text-muted-light">Date</th>
              <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Description</th>
              <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Category</th>
              <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Account</th>
              <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">-$75.50</td>
              <td><EditSvg /></td>
            </tr>
            <tr>
              <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">2023-09-20</td>
              <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">Grocery Store</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> Groceries </span>
              </td>
              <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">Checking Account	</td>
              <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">+$2,075.50</td>
              <td><EditSvg /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Transition as={Fragment} show={newModalOpen} appear>
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
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                          New Transaction
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            What type of transaction would you like to add?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start gap-4">
                      <div className="w-1/2 h-36 bg-background-light rounded-lg ml-4 justify-items-center items-center">
                        <div className="h-36 w-36 text-center hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleIncomeModalOpen}>
                          <ChartLineUpSvg className="stroke-green-500 w-full h-3/4 mt-2" />
                          <p className="">Income</p>
                        </div>
                      </div>
                      <div className="w-1/2 h-36 bg-background-light rounded-lg mr-4 justify-items-center items-center">
                        <div className="h-36 w-36 text-center hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleExpenseModalOpen}>
                          <ChartLineDownSvg className="text-primary w-full h-3/4 mt-2" />
                          <p>Expense</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition as={Fragment} show={incomeModalOpen} appear>
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
                          Record Your Income
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Keep track of your earnings with ease.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                    <form className="space-y-3" >
                      <label htmlFor="amount" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                        Amount
                      </label>
                      <div className="space-y-2">
                        <Input
                          id="amount"
                          name="amount"
                          type="number"
                          placeholder="e.g., 1200"
                          required
                          className='w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark placeholder:font-semibold focus:border-primary'
                        />
                      </div>
                      <label htmlFor="source" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                        Source
                      </label>
                      <div className="space-y-2 ">
                        <select id="source" className="bg-background-light border px-3 text-muted-light py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-30 font-semibold text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:border-primary">
                          <option defaultValue="">Select a source</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                        </select>
                      </div>
                      <label htmlFor="Datepicker" className="block text-sm font-medium text-foreground-light dark:text-foreground-dark">
                        Date
                      </label>
                      <div className="space-y-2 focus:border-primary">
                        <Datepicker
                          inputClassName="w-full bg-background-light text-sm h-10 rounded-lg border-border-light border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:font-semibold"
                          asSingle={true}
                          value={value}
                          onChange={(nv) => setValue(nv ?? { startDate: null, endDate: null })}
                          displayFormat="mm/dd/yyyy"
                          popoverContainer="body"
                          popoverDirection="down"
                          containerClassName="relative"
                          popoverClassName="z-[9999]"
                        />
                      </div>
                      <div className='mt-6 mb-12'>
                        <Button type="submit" className="w-full rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold">
                          Add Income
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
                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                          New Transaction
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            What type of transaction would you like to add?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start gap-4">
                      <div className="w-1/2 h-36 bg-background-light rounded-lg mr-4 justify-items-center items-center">
                        <div className="h-36 w-36 text-center hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleExpenseModalOpen}>
                          <ChartLineDownSvg className="text-primary w-full h-3/4 mt-2" />
                          <p>Expense</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleCloseModals}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
