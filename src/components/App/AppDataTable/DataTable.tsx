"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { PaginationInfo } from "@/lib/@types"
import { cn } from "@/lib/utils"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  tableTitle?: {
    title: string;
    subtitle?: string;
  };
  loading?: boolean
  pagination: PaginationInfo
  onRowClick?: (row: any) => void;
  tableHeader?: (table?: any) => JSX.Element,
  onUpdatePage?: (page: number) => void
  onUpdatePageSize?: (pageSize: number) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination,
  tableTitle,
  loading,
  onRowClick,
  tableHeader,
  onUpdatePage,
  onUpdatePageSize
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    pageCount: pagination.pageCount,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <div className='border border-muted shadow-sm rounded-xl'>
        <div className="sm:flex sm:gap-x-2 px-4 py-3 justify-between items-center dark:text-white">
          {
            tableTitle && <div className='flex flex-col gap-1 my-2'>
              <p className='font-bold'>{ tableTitle?.title }</p>
              <p className='text-sm text-gray-400'>{ tableTitle?.subtitle }</p>
            </div>
          }
          <div className="flex items-center gap-4">
            {
              tableHeader?.(table)
            }
          </div>
        </div>
        <div className={
          cn(
            "border-t transition-opacity duration-150",
            loading ? 'opacity-50 pointer-events-none' : '',
          )
        }>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="dark:text-white">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    className={onRowClick ? 'cursor-pointer' : ''}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => onRowClick?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className={
          cn(
            "py-3 px-4 flex items-center justify-between border-t border-muted w-full transition-opacity duration-150",
            loading ? 'opacity-50 pointer-events-none' : '',
          )
        }>
          <DataTablePagination
            className="w-full"
            table={table}
            pagination={pagination}
            onUpdatePage={onUpdatePage}
            onUpdatePageSize={onUpdatePageSize}
          />
        </div>
      </div>
    </div>
  )
}