import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon as DoubleArrowLeftIcon,
  ChevronsRightIcon as DoubleArrowRightIcon,
} from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PaginationItem, PaginationLink } from "@/components/ui/pagination"
import React from "react"
import { PaginationInfo } from "@/lib/@types"

interface DataTablePaginationProps<TData> extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  table: Table<TData>
  pagination: PaginationInfo
  onUpdatePage?: (page: number) => void
  onUpdatePageSize?: (pageSize: number) => void
}

export function DataTablePagination<TData>({
  table,
  onUpdatePage,
  onUpdatePageSize,
  pagination,
  ...rest
}: DataTablePaginationProps<TData>) {
  const pageSize = table.getState().pagination.pageSize

  React.useEffect(() => {
    console.log('current Page changed ' + table.getState().pagination.pageIndex + 1)
    onUpdatePage?.(table.getState().pagination.pageIndex + 1)
  }, [table.getState().pagination.pageIndex])

  React.useEffect(() => {
    console.log("Something changed")
    console.log(pagination)
    if (pagination.page)
      table.setPageIndex(pagination.page - 1)

    if (pagination.pageSize)
      table.setPageSize(pagination.pageSize)

    if (pagination.pageCount)
      table.setPageCount(pagination.pageCount)
  }, [pagination, table])

  return (
    <div className="flex items-center justify-between px-2" {...rest}>
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8 justify-between w-full">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium dark:text-ghost_white">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
              onUpdatePageSize?.(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px] dark:text-white">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className='flex-1 flex justify-center items-center gap-2 list-none'>
            <p className="text-sm font-medium dark:text-white">Page {table.getState().pagination.pageIndex + 1} / {pagination.pageCount}</p>
            {/* {shownNumbers.map((number) => (
              <React.Fragment key={number}>
                {number === '...' ? (
                  table.getState().pagination.pageIndex + 3 < table.getFilteredRowModel().rows.length ? <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 list-none"
                  >
                    ...
                  </Button> : null
                ) : (
                  <PaginationLink key={number} className='list-none h-8 w-8 p-0 cursor-pointer select-none' onClick={() => table.setPageIndex(number - 1)} isActive={number === table.getState().pagination.pageIndex + 1}>{number}</PaginationLink>
                )}
              </React.Fragment>
            ))} */}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}