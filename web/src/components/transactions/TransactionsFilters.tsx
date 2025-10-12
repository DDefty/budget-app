import Input from "../ui/input";
type AmountFilter = {
    min: string;
    max: string;
};

type TransactionsFiltersProps = {
    categories: string[];
    dates: string[];
    query: string;
    setQuery: (query: string) => void;
    categoryFilter: string;
    setCategoryFilter: (category: string) => void;
    amountFilter: AmountFilter;
    setAmountFilter: React.Dispatch<React.SetStateAction<AmountFilter>>;
    dateFilter: string;
    setDateFilter: (date: string) => void;
}

export const TransactionsFilters: React.FC<TransactionsFiltersProps> = ({ categories, dates, query, setQuery, categoryFilter, setCategoryFilter, amountFilter, setAmountFilter, dateFilter, setDateFilter }) => {
    return (
        <>
            <form className="w-full mx-auto">
                <div className="relative">
                    {query === '' && <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none opacity-50">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>}
                    <Input
                        id="query"
                        name="query"
                        type="string"
                        value={query}
                        onChange={e => { e.preventDefault(); setQuery(e.target.value); }}
                        placeholder="Search transactions"
                        className='w-full placeholder:px-10 bg-white rounded-lg dark:bg-background-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark focus:border-primary'
                    />
                </div>
            </form>
            <div className="flex flex-row h-10 gap-x-4">
                <form className="max-w-sm">
                    <select id="category" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={categoryFilter} onChange={e => {
                        setCategoryFilter(e.target.value);
                    }}>
                        <option value="">Category</option>
                        {categories.length > 0 ? categories.map((c, idx) => (
                            <option key={idx} value={c}>{c}</option>
                        )) : null}
                    </select>
                </form>
                <Input
                    id="MinAmount"
                    name="MinAmount"
                    type="number"
                    placeholder="Min amount"
                    value={amountFilter.min}
                    onChange={(e) =>
                        setAmountFilter({ ...amountFilter, min: e.target.value })
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block max-w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder:text-foreground-light" />
                <Input
                    id="MaxAmout"
                    name="MaxAmout"
                    type="number"
                    placeholder="Min amount"
                    value={amountFilter.max}
                    onChange={(e) =>
                        setAmountFilter({ ...amountFilter, max: e.target.value })
                    }
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block max-w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white placeholder:text-foreground-light" />
                <form className="max-w-sm">
                    <select id="Date" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={dateFilter} onChange={e => {
                        setDateFilter(e.target.value);
                    }}>
                        <option value="">Date</option>
                        {dates.length > 0 ? dates.map((d, idx) => (
                            <option key={idx} value={d}>{d}</option>
                        )) : null}
                    </select>
                </form>
            </div>
        </>
    );
}
