import React from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-end p-2 bg-white rounded-lg shadow-md w-auto">
      <span className="text-sm text-gray-700 mx-2">
        {`${(currentPage - 1) * 8 + 1}-${Math.min(currentPage * 8, totalPages * 8)} de ${totalPages * 8}`}
      </span>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400' : 'text-green-600'}`}
      >
        <MdArrowBack size={24} />
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400' : 'text-green-600'}`}
      >
        <MdArrowForward size={24} />
      </button>
    </div>
  )
}

export default Pagination