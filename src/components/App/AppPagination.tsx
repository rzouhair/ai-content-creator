import React, { useEffect, useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PaginationInfo } from "@/lib/@types"

const PaginationComponent = ({ table, pagination, pageSlot = 5 }: { table: any; pagination: PaginationInfo, pageSlot: number }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to hold current page
  const totalPages = pagination?.pageCount || 1; // Replace this with the actual total number of pages

  // Function to handle previous page click
  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if (currentPage > 1) {
      setCurrentPage(newPage);
    }
    table.previousPage()
  };

  // Function to handle next page click
  const handleNextPage = () => {
    const newPage = currentPage + 1
    if (currentPage < totalPages) {
      setCurrentPage(newPage);
    }
    table.nextPage()
  };

  // Logic to detect shown numbers and ellipsis
  const showEllipsis = totalPages > 3;
  const shownNumbers: any[] = [];

  if (showEllipsis) {

    if (currentPage <= 2) {
      for (let i = 1; i <= pageSlot - 2; i++) {
        shownNumbers.push(i);
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - 2; i <= totalPages; i++) {
        shownNumbers.push(i);
      }
    } else {
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        shownNumbers.push(i);
      }

    }
    if(currentPage + 2 < totalPages) {
      shownNumbers.push('...');
    }

    if (!shownNumbers.includes(totalPages)) {
      shownNumbers.push(totalPages);
    }
  } else {
    for (let i = 1; i <= totalPages; i++) {
      shownNumbers.push(i);
    }
  }

  useEffect(() => {
    table.setPageIndex(currentPage - 1)
  }, [currentPage, table])

  function setPage(number: number) {
    setCurrentPage(number as number)
    pagination.onUpdatePage?.(number)
  }

  return (
    <Pagination>
      <PaginationContent className='w-full flex justify-between'>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePreviousPage()}
            disabled={!table.getCanPreviousPage()}
            className='select-none'
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
        </PaginationItem>
        <div className='flex-1 flex justify-center items-center gap-2'>
          {shownNumbers.map((number) => (
            <React.Fragment key={number}>
              {number === '...' ? (
                currentPage + 2 < totalPages ? <PaginationEllipsis /> : null
              ) : (
                <PaginationItem key={number}>
                  <PaginationLink className='cursor-pointer select-none' onClick={() => setPage(number)} isActive={number === currentPage}>{number}</PaginationLink>
                </PaginationItem>
              )}
            </React.Fragment>
          ))}
        </div>
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNextPage()}
            disabled={!table.getCanNextPage()}
            className='select-none'
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
