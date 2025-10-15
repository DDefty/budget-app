import { type Transaction } from "@/lib/transaction";
import { TransactionRow } from "./TransactionRow";
import Loader from "../common/Loader";

type TransactionsTableProps = {
    transactions: Transaction[];
    handleClick(id: string): void;
    handleClickEdit(transaction: Transaction): void;
    loading: boolean;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, handleClick, handleClickEdit, loading }) => {
    return (
        <div className="overflow-x-auto rounded-xl">
            {loading ? <Loader /> :
                    <table className="w-full text-left bg-white rounded-lg border border-gray-200">
                        <thead>
                            <tr className="border-b bg-background-light border-background-light dark:border-background-dark">
                                <th className="p-4 text-sm font-semibold text-muted-light">Date</th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Description</th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Category</th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Account</th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Amount</th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300"></th>
                                <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions !== undefined &&
                                transactions.map((t, idx) => (
                                    <TransactionRow key={idx} transaction={t} handleClick={handleClick} handleClickEdit={handleClickEdit} />
                                ))}
                        </tbody>
                    </table>
            }
        </div>
    );
}
