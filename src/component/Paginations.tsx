import React from 'react';

interface PaginationsProps {
  productsPerPage: number;
  totalProducts: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Paginations: React.FC<PaginationsProps> = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const visiblePageNumbers = 5; // Número de números de página visibles a la vez

  let startPage = Math.max(currentPage - Math.floor(visiblePageNumbers / 2), 1);
  let endPage = Math.min(startPage + visiblePageNumbers - 1, totalPages);

  if (totalPages > visiblePageNumbers) {
    if (endPage === totalPages) {
      startPage = Math.max(endPage - visiblePageNumbers + 1, 1);
    } else if (startPage === 1) {
      endPage = Math.min(startPage + visiblePageNumbers - 1, totalPages);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage > 1 && (
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(currentPage - 1)}>
              Anterior
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li className="page-item">
            <button className="page-link" onClick={() => paginate(currentPage + 1)}>
              Siguiente
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginations;
