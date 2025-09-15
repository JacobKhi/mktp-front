import React from "react";
import { Button } from "../Button";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(0, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    for (let i = startPage; i < endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 mx-1 text-sm ${
            currentPage === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-full`}
        >
          {i + 1}
        </Button>
      );
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <Button
        onClick={handlePrevious}
        disabled={currentPage === 0}
        className="w-auto px-4 py-2 text-sm bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 rounded-full"
      >
        Anterior
      </Button>
      {renderPageNumbers()}
      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="w-auto px-4 py-2 text-sm bg-gray-200 text-gray-700 disabled:opacity-50 hover:bg-gray-300 rounded-full"
      >
        Próximo
      </Button>
    </div>
  );
};
