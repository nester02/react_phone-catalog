type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <>
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </button>
      {pageNumbers.map(number => (
        <button
          type="button"
          key={number}
          disabled={currentPage === number}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </>
  );
};
