import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';

type TransactionsPaginationProps = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({ pagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, total, totalPages, limit } = pagination;

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    searchParams.set('page', String(p));
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // UX – przewiń do góry
  };

  const getPages = () => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  const pages = getPages();

  return (
    <div className="relative flex w-full items-center justify-center border-t border-gray-200 bg-gray-50 px-4 py-4">
      <div className="absolute left-0">
        <p className="text-sm text-gray-700">
          Showing{' '}
          <span className="font-medium">{(page - 1) * limit + 1}</span>{' '}
          to{' '}
          <span className="font-medium">{Math.min(page * limit, total)}</span>{' '}
          of <span className="font-medium">{total}</span> results
        </p>
      </div>

      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="relative inline-flex items-center bg-white rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(Number(p))}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${
                p === page
                  ? 'z-10 bg-primary text-white'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};
