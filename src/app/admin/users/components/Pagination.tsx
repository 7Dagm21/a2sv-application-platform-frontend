"use client"
import React from 'react'

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const totalPages = Math.ceil(total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-xs sm:text-sm text-gray-600 gap-2 sm:gap-0">
      <p className="text-center sm:text-left">
        Showing {start} to {end} of {total} results
      </p>
      <div className="flex flex-wrap gap-1 justify-center">
        {pages.map((pageNum) => (
          <button
            key={pageNum}
            className={`px-2 sm:px-3 py-1 rounded-md border text-xs sm:text-sm ${
              pageNum === page ? 'bg-indigo-500 text-white' : 'bg-white text-gray-700'
            }`}
            onClick={() => onPageChange(pageNum)}
            disabled={pageNum === page}
          >
            {pageNum}
          </button>
        ))}
      </div>
    </div>
  );
}