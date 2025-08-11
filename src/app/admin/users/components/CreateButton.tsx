"use client"
import React from 'react'

const CreateButton = () => {
  return (
    <div className="w-full">
      <button
        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs sm:text-sm"
        onClick={() => window.location.href = '/admin/users/create'}
      >
        Create user
      </button>
    </div>
  )
}

export default CreateButton
