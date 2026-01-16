import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

type PageItem = number | '...';

type TransactionsPaginationProps = {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
};

export const TransactionsPagination: React.FC<TransactionsPaginationProps> = ({ pagination, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, total, totalPages, limit } = pagination;

  const clamp = (p: number) => Math.max(1, Math.min(p, Math.max(1, totalPages)));

  const goToPage = (p: number) => {
    const next = clamp(p);
    if (next === page) return;
    if (onPageChange) {
      onPageChange(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', String(next));
    setSearchParams(nextParams, { replace: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages: PageItem[] = useMemo(() => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  }, [page, totalPages]);

  const safeLimit = limit > 0 ? limit : 1;
  const start = total === 0 ? 0 : (page - 1) * safeLimit + 1;
  const end = total === 0 ? 0 : Math.min(page * safeLimit, total);

  const prevDisabled = page <= 1 || totalPages === 0;
  const nextDisabled = page >= totalPages || totalPages === 0;

  return (
    <div className="relative flex w-full items-center justify-center border-t border-gray-200 bg-gray-50 px-4 py-4">
      <div className="absolute left-0">
        <p className="text-sm text-gray-700">
          {total === 0 ? (
            <>No results</>
          ) : (
            <>
              Showing <span className="font-medium">{start}</span> to{' '}
              <span className="font-medium">{end}</span> of{' '}
              <span className="font-medium">{total}</span> results
            </>
          )}
        </p>
      </div>

      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={prevDisabled}
          aria-disabled={prevDisabled}
          data-testid="pagination-previous-button"
          className="relative inline-flex items-center bg-white rounded-l-md px-2 py-2 text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pages.map((p, i) =>
          p === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 text-gray-500 select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => goToPage(p)}
              aria-current={p === page ? 'page' : undefined}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${p === page ? 'z-10 bg-primary text-white' : 'text-gray-900 hover:bg-gray-100'
                }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={nextDisabled}
          aria-disabled={nextDisabled}
          data-testid="pagination-next-button"
          className="relative inline-flex items-center rounded-r-md px-2 py-2 bg-white text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-100 disabled:opacity-50"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};
