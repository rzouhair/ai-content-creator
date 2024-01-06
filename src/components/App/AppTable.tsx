import React from 'react'
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce, useSortBy, usePagination, useExpanded } from 'react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import AppPagination from './AppPagination';

export interface PaginationInfo {
  page: number
  pageSize: number
  pageCount: number
  itemCount: number | undefined
}

function AppTable({
    columns,
    data,
    onRowClick,
    tableTitle,
    tableHeader,
    pagination
  }: {
    columns: ColumnDef<any>[];
    data: any;
    onRowClick?: (row: any) => void;
    tableTitle?: {
      title: string;
      subtitle?: string;
    };
    tableHeader?: () => JSX.Element,
    pagination?: PaginationInfo
  }
) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
 
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      
    },
    pageCount: pagination?.itemCount || 0,
  })

  React.useEffect(() => {
    table.setPageCount(pagination?.itemCount || 0)
  }, [data])

  // Render the UI for your table
  return (
    <div className='border border-gray-200 shadow-sm rounded-xl'>
      <div className="sm:flex sm:gap-x-2 px-6 py-3 justify-between items-center dark:text-white">
        {
          tableTitle && <div className='flex flex-col gap-1 my-2'>
            <p className='font-bold'>{ tableTitle?.title }</p>
            <p className='text-sm text-gray-400'>{ tableTitle?.subtitle }</p>
          </div>
        }
        {
          tableHeader?.()
        }
      </div>

      {/* table */}
      <div className="border-t border-gray-200 flex flex-col">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className='px-6' key={header.id}>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='px-6' key={cell.id}>
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
      {/* Pagination */}
      {
        pagination && <div className="py-3 px-6 flex items-center justify-between border-t border-gray-200">
          <AppPagination table={table} pagination={pagination} />
        </div>
      }
    </div>
  )
}

export default AppTable;