"use client"
import SearchBar from './components/SearchBar';
import ListOfUsers from './components/ListOfUsers';
import Link from 'next/link';
import { useState } from 'react';
import CreateButton from './components/CreateButton';


export default function UserManagementPage() {
  const [roleFilter, setRoleFilter] = useState('All Roles');
  return (
    <>
      <main className="px-2 sm:px-4 md:px-6 lg:px-8 mt-5">
        <div className="flex flex-col sm:flex-row items-center mb-4 gap-2 sm:gap-0">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold">User Management</h1>
          </div>
          <div className="flex-none w-full sm:w-auto flex justify-end">
            <CreateButton />
          </div>
        </div>
        <p className="text-gray-500 mb-6 text-xs sm:text-base">Administer and manage all users on the platform.</p>
        <SearchBar roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
        <ListOfUsers roleFilter={roleFilter} />
      </main>
    </>
  );
}
