import { LightbulbSvg } from "@/assets/icons";
import { useDashboard } from "@/hooks/useDashboard";
import { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const { dashboardTransactions, dashboardAnalysis, dashobardOverview, loading } = useDashboard();
  return (
    <div>
      <Toaster />
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <div className="mx-10">
        <div className="flex mt-16 justify-between mb-16 gap-x-6">
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l text-muted-light">Total Balance</h2>
            <p className="text-3xl font-bold">${dashobardOverview?.totalBalance}</p>
          </div>
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l  text-muted-light">Monthly Spending</h2>
            <p className="text-3xl font-bold">${dashobardOverview?.totalExpense}</p>
          </div>
          <div className="flex-row gap-y-9 w-1/3 h-28 rounded-lg bg-white py-4 px-6 shadow-sm content-center">
            <h2 className="text-l text-muted-light">Upcoming Bills</h2>
            <p className="text-3xl font-bold">${dashobardOverview?.upcomingBills}</p>
          </div>
        </div>
        <div className="flex gap-x-6">
          <div className="flex-col w-1/2 h-80 rounded-lg bg-white py-6 px-6 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Expense Analysis</h3>
            <div className="flex items-end gap-6 h-48">
              {dashboardAnalysis?.map((it, idx) => {
                const pct = Math.min(100, Math.max(0, it.percentage));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div className="w-full h-48 flex items-end">
                      <div
                        className="w-full bg-sky-200 rounded-t-sm transition-all duration-500"
                        style={{ height: `${pct}%` }}
                      />
                    </div>
                    <span className="mt-2 text-sm text-gray-600 text-center">{it.category}</span>
                  </div>
                );
              })}
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
            {!loading ? <table className="w-full text-left">
              <thead>
                <tr className="border-b border-background-light dark:border-background-dark">
                  <th className="p-4 text-sm font-semibold text-muted-light">Date</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Description</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300">Category</th>
                  <th className="p-4 text-sm font-semibold text-muted-light dark:text-slate-300 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {dashboardTransactions.map((t, idx) => (
                  <tr key={idx}>
                    <td className="p-4 text-sm foreground-light dark:text-slate-200">{t.date.slice(0, 10)}</td>
                    <td className="p-4 text-sm foreground-light dark:text-slate-200">{t.description}</td>
                    <td className="p-4 text-sm foreground-light dark:text-slate-200">{t.category.name}</td>
                    <td className="p-4 text-sm foreground-light dark:text-slate-200 text-right">{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
