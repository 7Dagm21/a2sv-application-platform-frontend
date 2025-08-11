import React from 'react'



const Header: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Create User</h1>
          
        </div>
        <p className="text-gray-500 mb-6">Administer and manage all users on the platform.</p>
    </div>
  )
}

export default Header


