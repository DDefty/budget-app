import { LightbulbSvg } from "@/assets/icons";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <Toaster />
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="mx-10">
        <div className="flex mt-16 justify-between mb-16 gap-x-6">
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l text-muted-light">Total Balance</h2>
            <p className="text-3xl font-bold">$12,450.00</p>
          </div>
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l  text-muted-light">Monthly Spending</h2>
            <p className="text-3xl font-bold">$2,340.50</p>
          </div>
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l text-muted-light">Upcoming Bills</h2>
            <p className="text-3xl font-bold">$850.00</p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-col w-1/2 h-80 rounded-lg bg-white py-6 px-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Expense Analysis</h3>
            <div className="flex items-end justify-between h-48 gap-4">
              <div className="flex flex-col items-center w-1/5 gap-2">
                <div className="w-full bg-sky-200 rounded-t-sm" style={{ height: '90px' }}></div>
                <span className="text-sm text-gray-600">Food</span>
              </div>
              <div className="flex flex-col items-center w-1/5 gap-2">
                <div className="w-full bg-sky-200 rounded-t-sm" style={{ height: '180px' }}></div>
                <span className="text-sm text-gray-600">Transport</span>
              </div>
              <div className="flex flex-col items-center w-1/5 gap-2">
                <div className="w-full bg-sky-200 rounded-t-sm" style={{ height: '20px' }}></div>
                <span className="text-sm text-gray-600">Shopping</span>
              </div>
              <div className="flex flex-col items-center w-1/5 gap-2">
                <div className="w-full bg-sky-200 rounded-t-sm" style={{ height: '50px' }}></div>
                <span className="text-sm text-gray-600">Utilities</span>
              </div>
              <div className="flex flex-col items-center w-1/5 gap-2">
                <div className="w-full bg-sky-200 rounded-t-sm" style={{ height: '140px' }}></div>
                <span className="text-sm text-gray-600">Other</span>
              </div>
            </div>
          </div>
          <div className="flex-row w-1/2 h-80 rounded-lg bg-white py-6 px-6 shadow-sm">
            <h3 className="text-xl font-bold">Recommendations</h3>
            <div className="flex flex-col gap-y-6 mt-4">
              <div className="flex items-center gap-x-3">
                <LightbulbSvg className=' size-6 fill-primary' />
                <p className="text-m font-normal">You've spent $350 on dining out. Consider cooking at home to save.</p>
              </div>
              <div className="flex items-center gap-x-3">
                <LightbulbSvg className=' size-6 fill-primary' />
                <p className="text-m font-normal">Your transport costs are 15% higher this month. Look for cheaper commute options.</p>
              </div>
              <div className="flex items-center gap-x-3">
                <LightbulbSvg className=' size-6 fill-primary' />
                <p className="text-m font-normal">You're close to your 'Shopping' budget limit. Track your spending carefully.</p>
              </div>
            </div>
          </div>

        </div>
        <div className="flex-col w-full h-96 rounded-lg bg-white py-6 px-6 shadow-sm mt-10">
          <div className="flex flex-row content-center justify-between">
            <h3 className="text-xl font-bold mb-6">Recent Transactions</h3>
            <NavLink to="/transactions" className='text-primary hover:text-primary/80 text-l font-medium'>View all</NavLink>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-background-light dark:border-background-dark">
                  <th className="p-4 text-sm font-semibold text-muted-light">Date</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Description</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Category</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Jul 12</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Grocery Store</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Food</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200 text-right">-$75.50</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Jul 11</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Monthly Subscription</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Entertainment</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200 text-right">-$15.00</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Jul 10</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Gas Station</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Transport</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200 text-right">-$45.20</td>
                </tr>
                <tr>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Jul 9</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Restaurant</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200">Food</td>
                  <td className="p-4 text-sm foreground-light dark:text-slate-200 text-right">-$120.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
