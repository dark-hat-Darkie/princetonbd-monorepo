import { cn } from '@/lib/cn';

export interface DataColumn<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  /** Applied to both the header and the body cell. */
  className?: string;
}

/**
 * The admin list view: a bordered table with the same header treatment as
 * the public batch schedule. Rows are whatever the page passes; the page
 * decides what a cell shows, so the table knows nothing about the domain.
 */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  empty,
  className,
}: {
  columns: readonly DataColumn<T>[];
  rows: readonly T[];
  rowKey: (row: T) => string;
  /** Rendered in place of the table when there are no rows. */
  empty: React.ReactNode;
  className?: string;
}) {
  if (rows.length === 0) {
    return <>{empty}</>;
  }

  return (
    <div className={cn('overflow-x-auto rounded-lg border border-line bg-surface', className)}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-subtle">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  'border-b border-b-line-strong px-5 py-3.5 text-[10.5px] font-bold tracking-[.14em] whitespace-nowrap text-muted-2 uppercase first:pl-6 last:pr-6',
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-b-line align-top last:border-b-0">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-5 py-4 text-[14.5px] leading-[1.5] text-ink-soft first:pl-6 last:pr-6',
                    column.className,
                  )}
                >
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
