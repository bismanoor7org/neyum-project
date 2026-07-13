"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { AdminButton, SearchInput } from "@/components/admin/ui/AdminUi";
import { cn } from "@/lib/utils";

type CmsDataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, unknown>[];
  searchPlaceholder?: string;
  pageSize?: number;
  onRowSelect?: (rows: T[]) => void;
  className?: string;
};

export function CmsDataTable<T>({
  data,
  columns,
  searchPlaceholder = "Search…",
  pageSize = 20,
  className,
}: CmsDataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  // TanStack Table returns unstable function identities; React Compiler skips this intentionally.
  // eslint-disable-next-line react-hooks/incompatible-library -- table API
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, rowSelection },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className={cn("space-y-3", className)}>
      <SearchInput value={globalFilter} onChange={setGlobalFilter} placeholder={searchPlaceholder} />
      <div className="admin-card overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className="admin-table-head cursor-pointer px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em]"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted() as string] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td className="admin-table-cell px-4 py-8 text-center text-sm text-navy/50" colSpan={columns.length}>
                    No rows found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="admin-table-cell px-4 py-3.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="admin-text-muted">
          Page {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
        </span>
        <div className="flex gap-2">
          <AdminButton
            size="sm"
            variant="secondary"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            Prev
          </AdminButton>
          <AdminButton
            size="sm"
            variant="secondary"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            Next
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
