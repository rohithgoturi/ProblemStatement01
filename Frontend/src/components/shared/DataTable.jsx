/**
 * DataTable — Reusable sortable, paginated table
 * Clienter-inspired warm neutral table surfaces, subtle borders, orange sort indicators, and clean pagination.
 */
import { useState, useMemo } from 'react';
import {
  MdArrowUpward, MdArrowDownward,
  MdChevronLeft, MdChevronRight,
} from 'react-icons/md';
import { cn } from '../../utils/helpers';
import { EmptyState } from '../ui/States';

/**
 * @param {Array<{
 *   key: string,
 *   label: string,
 *   render?: (value, row) => ReactNode,
 *   sortable?: boolean,
 *   className?: string,
 *   headerClass?: string,
 *   width?: string,
 * }>} columns
 * @param {Array<object>} data
 * @param {string} [rowKey] - key for unique row ID
 * @param {boolean} [loading]
 * @param {number} [pageSize]
 * @param {boolean} [striped]
 * @param {function} [onRowClick]
 */
export function DataTable({
  columns = [],
  data = [],
  rowKey = 'id',
  loading = false,
  pageSize = 10,
  striped = false,
  onRowClick,
  emptyTitle = 'No records found',
  emptyDescription,
  className = '',
}) {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc'); // 'asc' | 'desc'
  const [page, setPage] = useState(1);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return [...data];
    return [...data].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      return sortDir === 'asc' ? av - bv : bv - av;
    });
  }, [data, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated  = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(1);
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white shadow-2xs">
        <div className="animate-pulse">
          <div className="bg-[#FAF8F5] h-11 border-b border-[#E8E1D5]" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 border-b border-stone-100 flex items-center px-4 gap-4">
              <div className="h-3 bg-stone-200 rounded w-1/4" />
              <div className="h-3 bg-stone-200 rounded w-1/3" />
              <div className="h-3 bg-stone-200 rounded w-1/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={cn('border border-[#E8E1D5] rounded-2xl bg-white p-8 shadow-2xs text-center', className)}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className={cn('border border-[#E8E1D5] rounded-2xl overflow-hidden bg-white shadow-2xs', className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E8E1D5] bg-[#FAF8F5]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={col.width ? { width: col.width } : undefined}
                  className={cn(
                    'px-4 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-500 whitespace-nowrap',
                    col.sortable && 'cursor-pointer select-none hover:text-[#0B1320]',
                    col.headerClass,
                  )}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === 'asc'
                        ? <MdArrowUpward size={13} className="text-[#FF5500]" />
                        : <MdArrowDownward size={13} className="text-[#FF5500]" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {paginated.map((row, idx) => (
              <tr
                key={row[rowKey] ?? idx}
                className={cn(
                  'transition-colors',
                  striped && idx % 2 === 1 && 'bg-[#FAF8F5]/40',
                  onRowClick && 'cursor-pointer hover:bg-[#FAF8F5]',
                  !onRowClick && 'hover:bg-[#FAF8F5]',
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn('px-4 py-3 text-stone-700 align-middle', col.className)}
                  >
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="px-5 py-3.5 border-t border-[#E8E1D5] flex items-center justify-between bg-white">
          <p className="text-xs text-stone-500">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length} records
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-600 hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdChevronLeft size={18} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const p = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors',
                    page === p
                      ? 'bg-[#0B1320] text-white shadow-2xs'
                      : 'text-stone-600 hover:bg-[#FAF8F5]',
                  )}
                >
                  {p}
                </button>
              );
            })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-stone-600 hover:bg-[#FAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <MdChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
