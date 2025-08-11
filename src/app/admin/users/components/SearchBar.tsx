'use client'


import React from 'react'

interface SearchBarProps {
  roleFilter: string;
  setRoleFilter: (role: string) => void;
}

function SearchBar({ roleFilter, setRoleFilter }: SearchBarProps) {
  const [search, setSearch] = React.useState('');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 my-4 sm:my-6 bg-white p-3 sm:p-4 rounded-lg w-full">
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
        <input
          type="text"
          placeholder="Search users by role"
          className="flex-grow px-3 sm:px-4 py-2 border border-gray-200 rounded-md shadow-sm text-xs sm:text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="relative w-full sm:w-48 min-w-[120px] sm:min-w-[160px]">
          <select
            className="w-full px-3 sm:px-4 py-2 pr-8 sm:pr-10 bg-blue-300 rounded-md shadow-sm appearance-none cursor-pointer text-xs sm:text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option>All Roles</option>
            <option>Applicant</option>
            <option>Reviewer</option>
            <option>Manager</option>
            <option>Admin</option>
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-2 sm:right-3 flex items-center text-gray-400">
            <svg className="h-4 w-4" fill="black" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
export default SearchBar