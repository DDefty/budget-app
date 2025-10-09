import { EditSvg } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Dashboard() {
  return (
    <div className="w-3/5 justify-self-center flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button type="button" className="w-50 h-10 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary py-2 px-4 text-sm font-semibold">
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

          </tbody>
        </table>
      </div>
    </div>
  );
}
