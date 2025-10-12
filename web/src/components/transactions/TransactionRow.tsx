import { DeleteSvg, EditSvg } from "@/assets/icons";
import { type Transaction } from "@/lib/transaction";
import { Button } from "../ui/button";

type TransactionRowProps = {
    transaction: Transaction;
    handleClick(id: string): void;
    handleClickEdit(transaction: Transaction): void;
}

export const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, handleClick, handleClickEdit }) => {
    return (
        <tr key={transaction.id}>
            <td className="p-4 text-sm text-muted-light foreground-light dark:text-slate-200">{transaction.date.toString().split("T")[0]}</td>
            <td className="p-4 text-sm font-semibold foreground-light text-foreground-light dark:text-slate-200">{transaction.description}</td>
            <td className="p-4 text-sm foreground-light dark:text-slate-200">
                {transaction.category !== null ? (transaction.category.kind === 'INCOME' ? <span className="inline-flex items-center rounded-full bg-green-400/10 px-2.5 py-0.5 text-xs font-medium text-green-600"> {transaction.category.name} </span> : <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"> {transaction.category.name} </span>) : null}
            </td>
            <td className="p-4 text-sm foreground-light text-muted-light dark:text-slate-200">{transaction.account}	</td>
            {(transaction.amount > 0 ? <td className="p-4 text-sm foreground-light dark:text-slate-200 text-green-500">{transaction.amount} {transaction.currency}</td> : <td className="p-4 text-sm foreground-light dark:text-slate-200 text-red-500">{transaction.amount} {transaction.currency}</td>)}
            <td className="p-4"><Button onClick={() => handleClickEdit(transaction)} className="bg-white hover:bg-background-light transition-none disabled:opacity-100"><EditSvg /></Button></td>
            <td className="p-4"><Button onClick={() => handleClick(transaction.id)} className="bg-white hover:bg-background-light transition-none disabled:opacity-100"><DeleteSvg className="size-6 bg-white hover:bg-background-light transition-none disabled:opacity-100" /> </Button> </td>
        </tr>
    );
}