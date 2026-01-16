import { ChartLineDownSvg, ChartLineUpSvg } from '@/assets/icons'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment } from 'react/jsx-runtime'

type NewTransactionModalProps = {
    newModalOpen: boolean;
    handleCloseModals: () => void;
    handleIncomeModalOpen: () => void;
    handleExpenseModalOpen: () => void;
}

export const NewTransactionModal: React.FC<NewTransactionModalProps> = ({newModalOpen, handleCloseModals, handleIncomeModalOpen, handleExpenseModalOpen}) => {
    return (
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
                                            <div className="h-36 w-36 text-center hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleIncomeModalOpen} data-testid="income-modal-option">
                                                <ChartLineUpSvg className="stroke-green-500 w-full h-3/4 mt-2" />
                                                <p className="">Income</p>
                                            </div>
                                        </div>
                                        <div className="w-1/2 h-36 bg-background-light rounded-lg mr-4 justify-items-center items-center">
                                            <div className="h-36 w-36 text-center hover:cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={handleExpenseModalOpen} data-testid="expense-modal-option">
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
                                        data-testid="modal-cancel-button"
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
    )
}